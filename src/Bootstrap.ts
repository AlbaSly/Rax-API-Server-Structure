import { ApiLog } from "@core/utils";

/**
 * The Bootstrap class is responsible for initializing and launching the application until the configurations are loaded correctly.
 */
export default class Bootstrap {
  private static _instance: Bootstrap | null = null;

  private constructor() {
    console.log(
      `
        ,-----.              ,------.                         ,--.
        |  |) /_,--. ,--.    |  .--. ' ,--,--.,--.  ,--.,---. |  |
        |  .-.  \\  '  /     |  '--'.'' ,-.  | \\  \`  /| .-. :|  |
        |  '--' / \\   '      |  |\\  \\ \\ '-'  | /  /.  \\|   --.|  |.--.
        \`------'.-'  /       \`--' '--' \`--\`--''--'  '--'\`----'\`--''--'  (2024)
                \`---'
        Visit my GitHub profile: https://github.com/AlbaSly

      `
    );

    this.initialize();
  }

  /**
   * Initializes the application.
   */
  private async initialize() {
    this.getConfigurations().then(() => this.buildApplication());
  }

  /**
   * Loads configurations from the definitions module.
   */
  private getConfigurations() {
    return new Promise<void>(async (resolve, reject) => {
      ApiLog.verbose('Bootstrap', 'Loading configurations...');
      try {
        /**Dynamic import to the definitions folder. From here, you will load your own implementations. */
        const configurations = await import("@configs/definitions");

        configurations.WebServiceConfigurations.getInstance().loadEnvironmentVars();
        configurations.DatabasesConfigurations.getInstance().loadEnvironmentVars();

        ApiLog.info('Bootstrap', 'Configurations are set.\n');
        resolve();
      } catch (error) {
        ApiLog.error('Bootstrap', 'There\'s an error loading the configurations.', error);
      }
    });
  }

  /**
   * Builds and starts the application (Web Service).
   */
  private buildApplication() {
    return new Promise<void>(async (resolve, reject) => {
      ApiLog.verbose('Bootstrap', 'Starting the application (Web Service).');
      try {
        const { Server } = await import('@server/Server');

        const app = new Server();
      } catch (error) {
        ApiLog.error('Bootstrap', 'There\'s an error building the application.', error);
      }
    });
  }

  /**
   * Gets the singleton instance of the Bootstrap class.
   * @returns The Bootstrap instance.
   */
  static getInstance() {
    if (!this._instance) {
      this._instance = new Bootstrap();
    }

    return this._instance;
  }
}
