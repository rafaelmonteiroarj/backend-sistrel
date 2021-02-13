import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique
} from "typeorm";

import * as bcrypt from "bcryptjs";

import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@Entity("users")
@Unique(["email"])
@ObjectType()
class User {
  @PrimaryGeneratedColumn("uuid")
  @Field() /** type-graphql */
  id: string;

  @Column({ length: 250 })
  @MaxLength(40, { message: "Name must have a maximum of 120 characters" })
  @MinLength(5, { message: "Name needs at least 5 characters" })
  @Field()
  name: string;

  @Column()
  @IsEmail()
  @Field()
  email: string;

  @Column({
    transformer: {
      to(password: string): string {
        return bcrypt.hashSync(password, 8);
      },
      from(hash: string): string {
        return hash;
      }
    }
  })
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  avatar: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp"
  })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp"
  })
  @Field()
  updatedAt: Date;

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

export default User;
