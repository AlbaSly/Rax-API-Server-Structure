import dotenv from "dotenv";
import { ApiLog } from "@core/utils";
import { ConfigurationsLoader } from "@configs/classes";

/**
 * DatabasesConfigurations class extends ConfigurationsLoader and is responsible for loading environment variables
 * related to database configurations. It follows the Singleton pattern to ensure a single instance throughout the application.
 */
export class DatabasesConfigurations extends ConfigurationsLoader {
  private static _instance: DatabasesConfigurations | null = null;

  /**
   * Configuration properties for the main database.
   */
  mainDB: {
    host: string | undefined,
    port: number | undefined,
    username: string | undefined,
    password: string | undefined,
    database: string | undefined,
    poolSize: number | undefined,
  };

  /**
   * Configuration properties for another database (example 1).
   */
  anotherDB: {
    host: string | undefined,
    port: number | undefined,
    username: string | undefined,
    password: string | undefined,
    database: string | undefined,
    poolSize: number | undefined,
  };

  /**
   * Configuration properties for another database (example 2, mongo approach).
   */
  anotherDB2: {
    mongoUri: string | undefined;
  };

  // ... And more, and more database environment variables

  /**
   * Private constructor to enforce the Singleton pattern.
   */
  private constructor() {
    super();
  }

  /**
   * Overrides the abstract method in ConfigurationsLoader to load environment variables.
   */
  override loadEnvironmentVars(): void {
    if (super.areEnvironmentVarsLoaded) {
      ApiLog.warning(
        "Databases Configurations",
        "Environment Vars are already loaded."
      );
      return;
    }

    // Load environment variables from the .env file using dotenv
    dotenv.config();

    /**
     * Set Environment Vars for all desired databases.
     */
    this.mainDB = {
      host: process.env.MAIN_DB_HOST,
      port: Number(process.env.MAIN_DB_PORT),
      username: process.env.MAIN_DB_USER,
      password: process.env.MAIN_DB_PASSWORD,
      database: process.env.MAIN_DB_NAME,
      poolSize: process.env.MAIN_DB_POOL_SIZE
        ? Number(process.env.MAIN_DB_POOL_SIZE)
        : 5,
    };

    // this.anotherDB = {
    //   host: process.env.ANOTHER_DB_HOST,
    //   port: Number(process.env.ANOTHER_DB_PORT),
    //   username: process.env.ANOTHER_DB_USER,
    //   password: process.env.ANOTHER_DB_PASSWORD,
    //   database: process.env.ANOTHER_DB_NAME,
    //   poolSize: process.env.ANOTHER_DB_POOL_SIZE
    //     ? Number(process.env.ANOTHER_DB_POOL_SIZE)
    //     : 5,
    // }

    // this.anotherDB2 = {
    //   mongoUri: process.env.MONGO_URI
    // }

    // Mark environment variables as loaded
    super.setEnvironmentsVarsLoaded = true;
    ApiLog.info(
      'Databases Configurations',
      'Environment vars are loaded correctly: Configurations are set.'
    );
  }

  /**
   * Gets or creates the Singleton instance of DatabasesConfigurations.
   * @returns The singleton instance of DatabasesConfigurations.
   */
  static getInstance(): DatabasesConfigurations {
    if (!this._instance) {
      this._instance = new DatabasesConfigurations();
    }

    return this._instance;
  }
}
