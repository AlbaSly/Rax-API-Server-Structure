import os from "os";
import express, { Application } from "express";

import { WebServiceConfigurations } from "@configs/definitions";

import { API_DATETIME_FORMAT } from "@core/constants";
import { ApiLog, FormatUtils } from "@core/utils";
import { RoutingManager } from "@core/routes/RoutingManager";

import { SERVER_MIDDLEWARES } from "@server/middlewares";


/**
 * Main Class for running the Web Server.
 */
export class Server {

  /** Express App */
  private app: Application;

  /** Records the timestamp when the Web Service starts to run. */
  private timeStart: number;

  /** Records the timestamp when all procedures/configurations to run the Web Services are finished. */
  private timeEnd: number;

  /**
   * Constructor for the Server class.
   * Initializes the start time and creates the express app.
   */
  constructor() {
    this.timeStart = Date.now();
    this.createWebService();
  }

  /**
   * Creates the express app (Web Server), connects to the database, and executes all configurations.
   */
  private createWebService(): void {
    this.app = express();
    ApiLog.verbose(SERVICE_NAME, 'Express app created.');

    (async () => {
      try {
        await this.connectDB();

        this.setMiddlewares();
        this.loadRoutes();

        this.run();
      } catch (error) {
        ApiLog.error(SERVICE_NAME, 'The web service could not be initialized.');
        process.exit(1);
      }
    })();
  }

  /**
   * Establishes a connection to the database(s).
   * @returns A Promise that resolves when the connection is successfully established and rejects on failure.
   */
  private connectDB(): Promise<void> {
    ApiLog.verbose(SERVICE_NAME, 'Establishing the connection to the database(s)...');
    return new Promise(async (resolve, reject) => {
      try {
        //Dynamic import, from here you will load all your databases.
        const databases = await import('@databases/index');
        // Uncomment the line below for connecting to the Main database (check in databases/main at the core folder)
        // await databases.MainDB.connect(); 

        ApiLog.info(SERVICE_NAME, 'Databases are ready for use.');
        resolve();        
      } catch (e) {
        ApiLog.error(SERVICE_NAME, 'Error during databases connection', e);
        reject(e);
      }
    });
  }

  /**
   * Sets all middlewares for the Web Server's express app.
   */
  private setMiddlewares(): void {
    this.app.use(SERVER_MIDDLEWARES);
    ApiLog.info(SERVICE_NAME, 'Server middlewares are set.')
  }

  /**
   * Sets all the routes (endpoints) for the Web Server.
   */
  private loadRoutes(): void {
    const routing = new RoutingManager(this.app);
    ApiLog.info(SERVICE_NAME, 'Routes are set.');
  }

  /**
   * Runs the Web Service.
   * @returns A Promise that resolves when the server is successfully running and rejects on failure.
   */
  private run() {
    const WebServiceConfig = WebServiceConfigurations.getInstance();

    const name = WebServiceConfig.name;
    const port = WebServiceConfig.port;
    const host = WebServiceConfig.host;

    return new Promise<void>((resolve, reject) => {
      try {
        this.app.listen(port, host, () => {
          this.timeEnd = Date.now();
          
          let info = {
            'Web Service': new ServerInfo(
              name, 
              host, 
              port, 
              WebServiceConfig.environment, 
              FormatUtils.FormatDateTime(new Date(), API_DATETIME_FORMAT),
              os.hostname(),
            ),
          }

          console.log('\n');
          ApiLog.info(SERVICE_NAME, `Server is running in ${host}:${port}`);
          ApiLog.verbose(SERVICE_NAME, 'Info:');
          console.table(info);
          console.log('\n');

          ApiLog.verbose(SERVICE_NAME, `Initialization completed in ${(this.timeEnd - this.timeStart)} ms.`);

          resolve();
        });
      } catch (error) {
        ApiLog.error(SERVICE_NAME, 'There\'s an error running Web Service', error);
        reject(error);
      }
    });
  }
}

// Service name constant
const SERVICE_NAME: string = "My Web Service";

/**
 * ServerInfo class to represent server information for logging purposes.
 */
class ServerInfo {

  /** Name of the web service */
  'Name': string;

  /** Host on which the web service is running */
  'Host': string;

  /** Port on which the web service is running */
  'Port': number;

  /** Environment in which the web service is running */
  'Environment': string;

  /** Start-up date and time of the web service */
  'Start-up Date': string;

  /** Host device */
  'Host Device Name': string;

  /**
   * Constructor for the ServerInfo class.
   * @param name Name of the web service.
   * @param host Host on which the web service is running.
   * @param port Port on which the web service is running.
   * @param environment Environment in which the web service is running.
   * @param startupDate Start-up date and time of the web service.
   */
  constructor(
    name: string,
    host: string,
    port: number,
    environment: string,
    startupDate: string,
    hostDeviceName: string,
  ) {
    this.Name = name;
    this.Host = host;
    this.Port = port;
    this.Environment = environment;
    this["Start-up Date"] = startupDate;
    this["Host Device Name"] = hostDeviceName;
  }
}