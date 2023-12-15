import joi from "joi";
import { SendMessage } from "./example.interfaces";

export class ExampleValidator {

  private input: any;

  constructor(input: any) {
    this.input = input;
  }

  sendMessage(): joi.ValidationResult<SendMessage> {
    const schema = joi.object<SendMessage>({
      title: joi.string().min(1).max(50).required(),
      msg: joi.string().min(1).required(),
      signature: joi.string().optional(),
    });

    return schema.validate(this.input);
  }
}