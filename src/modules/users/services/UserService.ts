import { injectable } from "tsyringe";
import { UserInputError } from "apollo-server-express";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import fs from "fs";
import { resolve } from "path";
import crypto from "crypto";

import User from "@modules/users/entities/User";
import { UpdateUserInput } from "../resolvers/types/update-user.input";
import { FormatSchemaErrors } from "@shared/helpers/errors";
import { IUserDTO } from "../dtos";
import { IUpload } from "@shared/util/dtos";
import { deleteFile } from "@shared/util/upload";

@injectable()
class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    this.userRepository = userRepository;
  }

  public async list(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ id });

    if (!user)
      throw new UserInputError(`No users found, related to id: ${id}"`);

    return user;
  }

  public async create({
    name,
    email,
    password
  }: IUserDTO): Promise<User | undefined> {
    const checkUserExist = await this.userRepository.findOne({ email });

    if (checkUserExist) {
      throw new UserInputError("Email adress already used.");
    }

    const user = this.userRepository.create({
      name,
      email,
      password
    });

    await FormatSchemaErrors("userSchema", user);

    return this.userRepository.save(user);
  }

  public async updateUser(
    id: string,
    data: UpdateUserInput
  ): Promise<User | undefined> {
    const user = await this.findById(id);

    /** Checks if email already exists. */
    if (data.email) {
      const checkEmailExist = await this.userRepository.findOne({
        where: { email: data.email }
      });

      if (checkEmailExist)
        throw new UserInputError("Email adress already used.");
    }

    return this.userRepository.save({ ...user, ...data });
  }

  public deleteUser = async (id: string): Promise<void> => {
    const user = await this.findById(id);

    if (!user)
      throw new UserInputError(`No users found, related to id: ${id}"`);

    const userDeleted = await this.userRepository.remove(user);

    if (!userDeleted) {
      throw new Error(
        "It was not possible to delete the user, contact the Administrator!"
      );
    }
  };

  public async avatarUser(
    id: string,
    { filename, createReadStream }: IUpload
  ): Promise<boolean> {
    const user = await this.findById(id);
    let userAvatar: string;

    if (user?.avatar) userAvatar = resolve(__dirname, "../images", user.avatar);

    const fileHash = crypto.randomBytes(10).toString("hex");
    const avatar = `${fileHash}-${filename}`;
    const makeUser = { avatar };

    const path = resolve(__dirname, "../images", avatar);
    const stream = createReadStream();

    return new Promise((resolve, reject) => {
      stream
        .pipe(fs.createWriteStream(path))
        .on("finish", () => {
          this.userRepository.save({ ...user, ...makeUser });

          /** checks if the avatar already exists and deletes ...  */
          if (userAvatar) deleteFile(userAvatar);

          resolve(true);
        })
        .on("error", () => reject(false));
    });
  }
}

export default UserService;
