import { Request, Response } from "express";
import { ExampleService } from "./example.service";
import { ControllerResponseHelpers } from "@core/helpers";
import { ExampleValidator } from "./example.validator";

export class ExampleController {

  constructor() { }

  static async getMessage(req: Request, res: Response) {
    try {
      const service = new ExampleService();
      const response = await service.getMessage();

      ControllerResponseHelpers.handleResponse(response, res);
    } catch (error) {
      ControllerResponseHelpers.handleError(error, res);
    }
  }

  static async sendMessage(req: Request, res: Response) {
    const data = req.body;

    const { error, value } = new ExampleValidator(data).sendMessage();
    
    if (error) return ControllerResponseHelpers.handleValidationError(error, res);

    try {
      const service = new ExampleService();
      const response = await service.sendMessage(value);

      ControllerResponseHelpers.handleResponse(response, res);
    } catch (error) {
      ControllerResponseHelpers.handleError(error, res);
    }
  }
}