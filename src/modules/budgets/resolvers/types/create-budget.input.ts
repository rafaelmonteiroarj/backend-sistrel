import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateBudgetInput {
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
  @MaxLength(60)
  m2: string;

  @Field()
  @MaxLength(60)
  typeOfWork: string;

  @Field()
  @MaxLength(60)
  productOfInterest: string;

  @Field()
  @MaxLength(60)
  vao: string;

  @Field({ nullable: false })
  message: string;
}
