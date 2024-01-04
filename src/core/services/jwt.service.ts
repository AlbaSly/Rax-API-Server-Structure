import jwt, { JwtPayload } from "jsonwebtoken";

import { WebServiceConfigurations } from "@configs/definitions";
import { JWTEnvs } from "@configs/interfaces";

import { ServerException } from "@core/classes";

/**
 * Service class for handling JSON Web Token (JWT) operations, including token generation and verification.
 * @class JWTService
 */
export class JWTService {

  /** Configuration settings for JWT. */
  private _config: JWTEnvs;

  /**
   * Constructor for the JWTService class.
   * Initializes the JWT configuration and checks for required configuration parameters.
   * @constructor
   */
  constructor(config: JWTEnvs = WebServiceConfigurations.getInstance().jwtConfig) {
    this._config = config;
    this.verifyConfiguration();
  }

  /**
   * Generates a JWT based on the provided payload.
   * @param {any} payload - The payload to be encoded into the JWT.
   * @returns {string} - The generated JWT.
   */
  genJWT(payload: any): string {
    return jwt.sign(
      payload,
      this._config.secret!,
      this._config.expiration != null
        ? { expiresIn: this._config.expiration }
        : undefined
    );
  }

  /**
   * Verifies the validity of a JWT.
   * @param {string} token - The JWT to be verified.
   * @returns {Promise<JwtPayload | null>} - A promise resolving to the decoded payload if the JWT is valid.
   */
  verifyJWT(token: string): Promise<JwtPayload | null> {
    return new Promise((resolve, reject) => {
      jwt.verify(token.trim(), this._config.secret!, (error: unknown, user: any) => {
        if (error) return reject(error);
        resolve(user as jwt.JwtPayload);
      });
    });
  }

  /** 
   * Verifies that the required JWT configuration is present.
   * @private
   */
  private verifyConfiguration(): void {
    if (!this._config) {
      throw new ServerException('JWTService', 'JWT configuration not specified. Verify JWT Configuration vars in your WebServiceConfigurations class file first!');
    }
    if (!this._config.secret) {
      throw new ServerException('JWTService', 'JWT SECRET not specified. Verify JWT configuration vars in your WebServiceConfigurations class file first!');
    }
  }
}
