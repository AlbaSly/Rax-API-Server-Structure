import jwt, { JwtPayload } from "jsonwebtoken";

import { JWTEnvs } from "@environments/index";

import { ApiLog } from "@core/utils";
import { JWTConfig } from "@core/config";
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
  constructor() {
    if (this.verifyConfiguration()) {
      this.setConfiguration();
    }
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
      jwt.verify(token.trim(), this._config.secret!, (error, user) => {
        if (error) return reject(error);
        resolve(user as jwt.JwtPayload);
      });
    });
  }

  /** 
   * Verifies that the required JWT configuration is present.
   * @private
   * @returns {boolean} - True if the configuration is valid, otherwise throws a ServerException.
   */
  private verifyConfiguration(): boolean {
    if (!JWTConfig) {
      throw new ServerException('JWTService', 'JWT configuration not specified. Verify JWT Configuration vars in your ServerEnvironment class file first!');
    }
    if (!JWTConfig.secret) {
      throw new ServerException('JWTService', 'JWT SECRET not specified. Verify JWT configuration vars in your ServerEnvironment class file first!');
    }

    return true;
  }

  /** 
   * Sets the JWT configuration based on the provided configuration object.
   * @private
   * @returns {void}
   */
  private setConfiguration(): void {
    this._config = {...JWTConfig}

    ApiLog.info('JWTService', 'Configuration established. Ready to execute JWT operations.');
  }
}
