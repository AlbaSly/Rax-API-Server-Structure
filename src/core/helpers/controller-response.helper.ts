import { NextFunction, Response } from "express";

import { IResolve, IReject } from "@core/interfaces";
import { HttpStatus } from "@core/enums";

export namespace ControllerResponseHelpers {
  /**
   * Maneja la respuesta correcta enviada por los Servicios hacia el controlador
   * @param responseData Respuesta
   * @param res Express Response
   * @param next Express Next Functions
   * @returns Express Response con el status code y data estructurada
   */
  export const handleResponse = <T>(
    responseData: IResolve<T>,
    res: Response,
    next?: NextFunction
  ) => {
    const _response = responseData as IResolve<T>;

    return res.status(_response.status).json(_response);
  };

  /**
   * Maneja los errores devueltos por los Servicios hacia el Controlador
   * @param error Error
   * @param res Express Response
   * @returns Express Response con los detalles del error de una manera estructurada
   */
  export const handleError = (error: any, res: Response) => {
    const _error = error as IReject;

    return res.status(_error.status).json(_error);
  };

  /**
   * Maneja los errores devueltos por la validación dentro del controlador
   * @param error Error
   * @param res Express Response
   * @returns Express Response con los detalles sobre el error de validación del controlador
   */
  export const handleValidationError = (
    error: any,
    res: Response,
    customMessage?: string
  ) => {
    return res.status(HttpStatus.Client.BAD_REQUEST).json({
      status: HttpStatus.Client.BAD_REQUEST,
      msg: customMessage ?? "Check data structure again.",
      error,
    });
  };
}