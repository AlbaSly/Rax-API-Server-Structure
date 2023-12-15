import { Request } from "express";

export class ExampleController {

  constructor() { }

  static getMessage(req: Request, res: Response) {
    
  }

  static sendMessage(req: Request, res: Response) {
    const data = req.body;
  }
}