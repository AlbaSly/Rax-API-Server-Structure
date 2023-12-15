import dotenv from "dotenv";


/**
 * Class to manage environment variables
 */
class Environment {

  /**
   * Singleton
   */
  private static _instance: Environment | null = null;
 
  /**Express port */
  port: number;
  /**Express host */
  host: string;

  /**You can store all DB Configurations for multiple databases here */
  dbConfigs;

  emailConfig: EmailEnvs;
  jwtConfig: JWTEnvs;
  
  private constructor() {
    dotenv.config();

    this.port = parseInt(process.env.PORT!) || 3000;
    this.host = process.env.HOST || "0.0.0.0";

    /**Handle Database Configurations */
    this.dbConfigs = {
      /**Postgres */
      main: {
        host: process.env.DB_HOST!,
        port: +!process.env.DB_PORT,
        username: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        name: process.env.DB_NAME!,
        synchronize: false,
        poolSize: +!process.env.DB_POOL_SIZE,
      },
      anotherDB: {},
      anotherBD2: {},
    }

    this.emailConfig = {
      provider: process.env.EMAIL_PROVIDER_ADDRESS ?? undefined,
      service: process.env.EMAIL_SERVICE_NAME ?? undefined,
      user: process.env.EMAIL_SERVICE_USERNAME ?? undefined,
      pass: process.env.EMAIL_SERVICE_PASSWORD ?? undefined,
    }

    this.jwtConfig = {
      secret: process.env.JWT_SECRET ?? undefined,
      expiration: process.env.JWT_EXPIRATION ?? undefined,
    }
  }

  /**Get or create the Singleton instance */
  static instance(): Environment {
    if (!this._instance) {
      this._instance = new Environment();
    }

    return this._instance;
  }
}

/**
 * Nodemailer envionment variables
 */
export interface EmailEnvs {
  provider: string | undefined;
  service: string | undefined;
  user: string | undefined;
  pass: string | undefined;
}

/**
 * JWT environment variables
 */
export interface JWTEnvs {
  secret: string | undefined;
  expiration: string | undefined;
}

// Export Singleton Instance
export const ServerEnvironments = Environment.instance();