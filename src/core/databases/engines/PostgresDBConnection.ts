import { DataSource } from "typeorm";

import { ApiLog } from "@core/utils";

/**
 * Class to create PostgreSQL connections.
 */
export class PostgresDBConnection {

  /**The name of the connection. */
  private readonly _connectionName: string;

  /**Configuration vars. */
  private readonly _config: DataSourceConfig;

  /**Flag to determine if the connection is established. */
  private _connected: boolean = false;

  /**TypeORM DataSource with the connection */
  private _dataSource: DataSource;

  /**
   * 
   * @param connectionName Name of the connection (no database name)
   * @param config Configuration vars
   */
  constructor(
    connectionName: string,
    config: DataSourceConfig,
  ) {
    this._connectionName = connectionName;
    this._config = config;
  }

  /**
   * Make the connection.
   * @returns {Promise<void>} A promise that resolves when the database connection is successfully established.
   * If there is any error during the connection, the promise is rejected with detailed error information.
   */
  connect(): Promise<void> {

    this._dataSource = new DataSource({
      type: 'postgres',
      ...this._config
    });
    ApiLog.verbose(`DB [Postgres] "${this._connectionName}"`, 'Configuration set. Trying to connect...');

    return new Promise<void>((resolve, reject) => {
      if (this._connected) {
        return reject({
          source: `DB [Postgres] "${this._connectionName}"`,
          msg: 'DB connection is already opened.',
          details: null
        });
      }

      this._dataSource
        .initialize()
        .then(() => {
          this._connected = true;
          ApiLog.info(`DB [Postgres] "${this._connectionName}"`, 'Connection established. DataSource ready for use.');
          resolve();
        })
        .catch(e => {
          reject({
            source: `DB [Postgres] "${this._connectionName}"`,
            msg: 'There\'s an error during database connection.',
            details: e,
          });
        })
    });
  }

  /**
  * Close the database connection.
  * @returns {Promise<void>} A promise that resolves when the database connection is successfully closed.
  * If there is any error during the disconnection, the promise is rejected with detailed error information.
  */
  disconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this._connected) {
        ApiLog.warning(`DB [Postgres] "${this._connectionName}"`, 'DB connection is already disconnected.');

        return reject({
          source: `DB [Postgres] "${this._connectionName}"`,
          msg: 'DB connection is already closed.',
          details: null
        });
      }
      this._dataSource.destroy()
        .then(() => {
          this._connected = false;
          ApiLog.info(`DB [Postgres] "${this._connectionName}"`, 'Connection closed.');
          resolve();
        })
        .catch(e => {
          reject({
            source: `DB [Postgres] "${this._connectionName}"`,
            msg: 'There\'s an error during database connection.',
            details: e,
          });
        });
    });
  }

  get DataSource(): DataSource {
    return this._dataSource;
  }
}

interface DataSourceConfig {
  host: string;
  port: number;
  username: string;
  password?: string;
  database?: string;
  entities: Array<any>;
  poolSize: number;
}