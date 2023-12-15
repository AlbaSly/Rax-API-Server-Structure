import { Request, Response } from "express";

import { HttpStatus } from "@core/enums";

export namespace CoreControllers {

  export const Hello = (req: Request, res: Response) => {
    return res.status(HttpStatus.Success.OK).json({
      status: HttpStatus.Success.OK,
      msg: 'Hello, World!',
      data: {
        info: 'Raxel Arias, v0.1',
      }
    });
  }
}