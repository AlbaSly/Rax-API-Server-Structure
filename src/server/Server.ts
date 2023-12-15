import express, { Application } from "express";

import { ServerEnvironments } from "@environments/index";

import { DatabasesModule } from "@core/databases";
import { ApiLog, FormatUtils } from "@core/utils";
import { RoutingManager } from "@core/routes/RoutingManager";

import { SERVER_MIDDLEWARES } from "@server/middlewares";
import { API_DATETIME_FORMAT } from "@core/constants";

/**
 * Main Class for running the Web Server
 */
export class Server {
  
  /**Singleton*/
  private static _instance: Server | null = null;

  /**Express App */
  private app: Application;

  private timeStart: number;
  private timeEnd: number;

  private constructor() {
    this.timeStart = Date.now();

    this.createApp();
  }

  static instance(): Server {
    if (!this._instance) {
      this._instance = new Server();
    }

    return this._instance;
  }

  /**
   * Creates the express app (Web Server), Connects to the database and executes all configs.
   */
  private createApp(): void {
    this.app = express();
    ApiLog.verbose(SERVICE_NAME, 'Express app created');
    (async () => {
      try {
        await this.connectDB();

        this.loadMiddlewares();
        this.loadRoutes();

        this.run();
      } catch (error) {
        ApiLog.error(SERVICE_NAME, 'The web service could not be initialized.');
        process.exit(1);
      }
    })();
  }

  /**
   * Establish a connection to the desired databases. 
   */
  private connectDB(): Promise<void> {
    ApiLog.verbose(SERVICE_NAME, 'Establishing the connection to the database(s)...');
    return new Promise(async (resolve, reject) => {
      try {
        // await DatabasesModule.Main.connect();

        ApiLog.verbose(SERVICE_NAME, 'Databases are ready for use.');
        resolve();        
      } catch (e) {
        ApiLog.error(SERVICE_NAME, 'Error during databases connection', e);
        reject(e);
      }
    });
  }

  /**
   * Set all npm middlewares for the Web Server.
   */
  private loadMiddlewares(): void {
    this.app.use(SERVER_MIDDLEWARES);
    ApiLog.verbose(SERVICE_NAME, 'Server middlewares set')
  }

  /**
   * Set all the routes (endpoints) for the Web Server.
   */
  private loadRoutes(): void {
    const routing = new RoutingManager(this.app);
    ApiLog.verbose(SERVICE_NAME, 'Routes set');
  }

  /**
   * Run the server
   */
  private run() {
    const name = ServerEnvironments.name;
    const port = ServerEnvironments.port;
    const host = ServerEnvironments.host;

    return new Promise<void>((resolve, reject) => {
      try {
        this.app.listen(port, host, () => {
          this.timeEnd = Date.now();
          
          let info = {
            'Web Service': new ServerInfo(
              name, 
              host, 
              port, 
              ServerEnvironments.environment, 
              FormatUtils.FormatDateTime(new Date(), API_DATETIME_FORMAT)
            ),
          }

          ApiLog.info(SERVICE_NAME, 'Server running in ' + host + ":" + port);
          console.log('\n');
          ApiLog.info(SERVICE_NAME, 'Info:');
          console.table(info);
          console.log('\n');

          ApiLog.verbose(SERVICE_NAME, (this.timeEnd - this.timeStart) + 'ms');

          resolve();
        });
      } catch (error) {
        ApiLog.error(SERVICE_NAME, 'There\'s an error running Web Service', error);
        reject(error);
      }
    });
  }
}

const SERVICE_NAME: string = "WebService";

class ServerInfo {

  'Name': string;
  'Host': string;
  'Port': number;
  'Environment': string;
  'Start-up Date': string;

  constructor(
    name: string,
    host: string,
    port: number,
    environment: string,
    startupDate: string,
  ) {
    this.Name = name;
    this.Host = host;
    this.Port = port;
    this.Environment = environment;
    this["Start-up Date"] = startupDate;
  }
}