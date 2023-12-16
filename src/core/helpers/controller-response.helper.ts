import { NextFunction, Response } from "express";

import { IResolve, IReject } from "@core/interfaces";
import { HttpStatus } from "@core/enums";

/**
 * Namespace containing helper functions for handling responses in controllers.
 * @namespace ControllerResponseHelpers
 */
export namespace ControllerResponseHelpers {

  /**
   * Handles the successful response sent from services to the controller.
   * @param {IResolve<T>} responseData - The response data.
   * @param {Response} res - Express Response object.
   * @param {NextFunction} [next] - Express Next Function (optional).
   * @returns {Response} Express Response with the status code and structured data.
   */
  export const handleResponse = <T>(
    responseData: IResolve<T>,
    res: Response
  ) => {
    const _response = responseData as IResolve<T>;
    return res.status(_response.status).json(_response);
  };

  /**
   * Handles errors returned from services to the controller.
   * @param {any} error - The error object.
   * @param {Response} res - Express Response object.
   * @returns {Response} Express Response with details of the error in a structured manner.
   */
  export const handleError = (error: any, res: Response) => {
    const _error = error as IReject;
    return res.status(_error.status).json(_error);
  };

  /**
   * Handles errors returned from validation within the controller.
   * @param {any} error - The error object.
   * @param {Response} res - Express Response object.
   * @param {string} [customMessage] - A custom error message (optional).
   * @returns {Response} Express Response with details about the controller's validation error.
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
