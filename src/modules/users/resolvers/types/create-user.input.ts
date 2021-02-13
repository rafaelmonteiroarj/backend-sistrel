import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(40)
  name: string;

  @Field()
  @MaxLength(60)
  email: string;

  @Field()
  @MaxLength(45)
  password: string;
}
