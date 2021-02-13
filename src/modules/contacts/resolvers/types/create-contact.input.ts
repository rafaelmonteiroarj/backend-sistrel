import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateContactInput {
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

  @Field({ nullable: false })
  message: string;
}
