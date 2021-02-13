import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProviderInput {
  @Field()
  @MaxLength(40)
  name: string;

  @Field()
  @MaxLength(14)
  phoneNumber: string;

  @Field()
  @MaxLength(14)
  mobileNumber: string;

  @Field()
  @MaxLength(60)
  email: string;

  @Field()
  @MaxLength(255)
  companyName: string;

  @Field()
  @MaxLength(14)
  companyPhoneNumber: string;

  @Field()
  @MaxLength(14)
  companyCnpj: string;

  @Field()
  @MaxLength(255)
  typeOfService: string;

  @Field({ nullable: false })
  message: string;
}
