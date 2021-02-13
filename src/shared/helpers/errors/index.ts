import { validate } from "class-validator";
import { UserInputError } from "apollo-server-express";

export const FormatSchemaErrors = async (
  name: string,
  models?: any
): Promise<void> => {
  await validate(name, models).then(errors => {
    if (errors.length > 0) {
      throw new UserInputError(`${errors}`);
    }
  });
};
