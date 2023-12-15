import { NextFunction, Request, Response } from "express";

import { JWTService } from "@core/services";

/**
 * Namespace containing middleware functions for handling Auth validations to allow access to the following endpoints/controllers within an HTTP request.
 * @namespace GuardMiddlewares
 */
export namespace GuardMiddlewares {

  /**
   * Middleware function to validate JWT present in the request header.
   * @param {Request} req - Express Request object.
   * @param {Response} res - Express Response object.
   * @param {NextFunction} next - Express Next Function.
   * @returns {void}
   */
  export const ValidateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const jwtService = new JWTService();

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(404)
        .json({ status: 404, msg: "Token not found or invalid" });
    }

    /**
     * Extracting the token from the authorization header.
     * Example: If the auth header is "Bearer mytokenforexample",
     * we will get only "mytokenforexample".
     */
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(404)
        .json({ status: 404, msg: "There isn't a token to validate" });
    }

    jwtService
      .verifyJWT(token)
      .then((value) => {
        /* req.user for the next middleware function */
        (req as any).user = value;
        next();
      })
      .catch((error) => {
        res.status(403).json({ status: 403, msg: "Access denied", error });
      });
  };
}