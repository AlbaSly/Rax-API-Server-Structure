import joi from "joi";

export class CoreValidators {
  private _input: any;

  constructor(input: any) {
    this._input = input;
  }

  isSomeStructure(): joi.ValidationResult<ISomeStructure> {
    const schema = joi.object<ISomeStructure>({
      name: joi.string().min(5).max(100).required(),
      lastName: joi.string().min(5).max(100).required(),
      age: joi.number().min(0).max(150).required(),
      items: joi.array().items(
        joi.string())
        .required(),
      isMarried: joi.boolean().required(),
      more: joi.string().optional(),  
    });

    return schema.validate(this._input);
  }
}

export interface ISomeStructure {
  name: string;
  lastName: string;
  age: number;
  items: Array<string>;
  isMarried: boolean;
  more?: string;
}

// const exampleOfUsage = (data: any) => {
//   const { error, value } = new CoreValidators(data).isSomeStructure();

//   if (error) {
//     //Do something
//   }
//   //Do another if value is correct
// }