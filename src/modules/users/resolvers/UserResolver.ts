import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";

import UserService from "@modules/users/services/UserService";
import User from "../entities/User";
import { CreateUserInput } from "./types/create-user.input";
import { UpdateUserInput } from "./types/update-user.input";
import { IUpload } from "@shared/util/dtos";

@Resolver(User)
export default class UserResolver {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.list();
  }

  @Query(() => User)
  async userById(@Arg("id") id: string): Promise<User | undefined> {
    return await this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data") data: CreateUserInput
  ): Promise<User | undefined> {
    return await this.userService.create(data);
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("data") data: UpdateUserInput
  ): Promise<User | undefined> {
    return this.userService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string): Promise<true> {
    await this.userService.deleteUser(id);
    return true;
  }

  @Mutation(() => Boolean)
  async avatarUser(
    @Arg("id") id: string,
    @Arg("avatar", () => GraphQLUpload) avatar: IUpload
  ): Promise<boolean> {
    return await this.userService.avatarUser(id, avatar);
  }
}
