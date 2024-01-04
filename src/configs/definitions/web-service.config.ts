import dotenv from "dotenv";
import { ApiLog } from "@core/utils";
import { EmailEnvs, JWTEnvs } from "../interfaces";
import { ConfigurationsLoader } from "@configs/classes";

/**
 * WebServiceConfigurations class extends ConfigurationsLoader and is designed to manage environment variables
 * related to the configuration of a web service. It follows the Singleton pattern to ensure a single instance
 * throughout the application.
 */
export class WebServiceConfigurations extends ConfigurationsLoader {
  private static _instance: WebServiceConfigurations | null = null;

  /**
   * The environment in which the web service is running (e.g., "DEVELOPMENT", "PRODUCTION").
   */
  environment: string;

  /**
   * The name of the web service.
   */
  name: string;

  /**
   * The port on which the Express server is configured to run.
   */
  port: number;

  /**
   * The host on which the Express server is configured to listen.
   */
  host: string;

  /**
   * Nodemailer environment variables configuration.
   */
  emailConfig: EmailEnvs;

  /**
   * JWT (JSON Web Token) environment variables configuration.
   */
  jwtConfig: JWTEnvs;

  /**
   * Private constructor to enforce the Singleton pattern.
   */
  private constructor() {
    super();
  }

  /**
   * Overrides the abstract method in ConfigurationsLoader to load environment variables.
   */
  loadEnvironmentVars(): void {
    if (super.areEnvironmentVarsLoaded) {
      ApiLog.warning(
        "Web Service Environments",
        "Environment vars are already loaded."
      );
      return;
    }

    // Load environment variables from the .env file using dotenv
    dotenv.config();

    // Set values for web service configurations from environment variables
    this.name = process.env.WEB_SERVICE_NAME || "Raxel's Backend Structure";
    this.environment = process.env.ENVIRONMENT || "DEVELOPMENT";

    this.port = Number(process.env.PORT!) || 3000;
    this.host = process.env.HOST || "0.0.0.0";

    this.emailConfig = {
      provider: process.env.EMAIL_PROVIDER_ADDRESS ?? undefined,
      service: process.env.EMAIL_SERVICE_NAME ?? undefined,
      user: process.env.EMAIL_SERVICE_USERNAME ?? undefined,
      pass: process.env.EMAIL_SERVICE_PASSWORD ?? undefined,
    };

    this.jwtConfig = {
      secret: process.env.JWT_SECRET ?? undefined,
      expiration: process.env.JWT_EXPIRATION ?? undefined,
    };

    // Mark environment variables as loaded
    super.setEnvironmentsVarsLoaded = true;
    ApiLog.info(
      'Web Service Configurations',
      'Environment vars are loaded correctly: Configurations are set.'
    );
  }

  /**
   * Gets or creates the Singleton instance of WebServiceConfigurations.
   * @returns The singleton instance of WebServiceConfigurations.
   */
  static getInstance(): WebServiceConfigurations {
    if (!this._instance) {
      this._instance = new WebServiceConfigurations();
    }

    return this._instance;
  }
}
