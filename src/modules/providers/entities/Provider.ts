import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@Entity("providers")
@ObjectType()
class Provider {
  @PrimaryGeneratedColumn("uuid")
  @Field() /** type-graphql */
  id: string;

  @Column({ length: 250 })
  @MaxLength(40, { message: "Name must have a maximum of 120 characters" })
  @MinLength(3, { message: "Name needs at least 3 characters" })
  @Field()
  name: string;

  @Column({ length: 10, name: "phone_number" })
  @MaxLength(10, {
    message: "phoneNumber must have a maximum of 10 characters"
  })
  @MinLength(10, { message: "phoneNumber needs at least 10 characters" })
  @Field()
  phoneNumber: string;

  @Column({ length: 11, name: "mobile_number" })
  @MaxLength(11, {
    message: "mobileNumber must have a maximum of 11 characters"
  })
  @MinLength(11, { message: "mobileNumber needs at least 11 characters" })
  @Field()
  mobileNumber: string;

  @Column()
  @IsEmail()
  @Field()
  email: string;

  @Column({ name: "company_name", nullable: false })
  @Field()
  companyName: string;

  @Column({ length: 10, name: "company_phone_number" })
  @MaxLength(10, {
    message: "companyPhoneNumber must have a maximum of 10 characters"
  })
  @MinLength(10, { message: "companyPhoneNumber needs at least 10 characters" })
  @Field()
  companyPhoneNumber: string;

  @Column({ length: 14, name: "company_cnpj" })
  @MaxLength(14, {
    message: "companyCnpj must have a maximum of 14 characters"
  })
  @MinLength(14, { message: "companyCnpj needs at least 14 characters" })
  @Field()
  companyCnpj: string;

  @Column({ name: "type_of_service", nullable: false })
  @Field()
  typeOfService: string;

  @Column({ type: "text", nullable: false })
  @Field()
  message: string;

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
}

export default Provider;
