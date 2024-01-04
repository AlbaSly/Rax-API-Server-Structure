import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { ApiLog } from "@core/utils";

/**
 * Class for managing PostgreSQL database connections using TypeORM.
 */
export class PostgresDBConnection {

  /** The name of the database connection. */
  private readonly _connectionName: string;

  /** Configuration variables for the PostgreSQL connection. */
  private readonly _config: PostgresConnectionOptions;

  /** TypeORM DataSource with the database connection. */
  private _dataSource: DataSource;

  /** Flag to determine if the database connection is established. */
  private _connected: boolean = false;

  /**
   * Constructs a new instance of the PostgresDBConnection class.
   * @param connectionName The name of the database connection (excluding the database name).
   * @param config Configuration variables for the PostgreSQL connection.
   */
  constructor(
    connectionName: string,
    config: PostgresConnectionOptions,
  ) {
    this._connectionName = connectionName;
    this._config = config;
  }

  /**
   * Establishes the PostgreSQL database connection.
   * @returns {Promise<void>} A promise that resolves when the database connection is successfully established.
   * If an error occurs during the connection, the promise is rejected with detailed error information.
   */
  connect(): Promise<void> {
    this._dataSource = new DataSource({
      ...this._config,
    });
    ApiLog.verbose(`DB [Postgres] "${this._connectionName}"`, 'Configuration set. Attempting to establish a connection...');

    return new Promise<void>((resolve, reject) => {
      if (this._connected) {
        return reject({
          source: `DB [Postgres] "${this._connectionName}"`,
          msg: 'Database connection is already open.',
          details: null
        });
      }

      this._dataSource
        .initialize()
        .then(() => {
          this._connected = true;
          ApiLog.info(`DB [Postgres] "${this._connectionName}"`, 'Connection established. DataSource is ready for use.');
          resolve();
        })
        .catch(e => {
          reject({
            source: `DB [Postgres] "${this._connectionName}"`,
            msg: 'Error during database connection.',
            details: e,
          });
        });
    });
  }

  /**
  * Closes the PostgreSQL database connection.
  * @returns {Promise<void>} A promise that resolves when the database connection is successfully closed.
  * If an error occurs during the disconnection, the promise is rejected with detailed error information.
  */
  disconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this._connected) {
        ApiLog.warning(`DB [Postgres] "${this._connectionName}"`, 'Database connection is already disconnected.');

        return reject({
          source: `DB [Postgres] "${this._connectionName}"`,
          msg: 'Database connection is already closed.',
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
            msg: 'Error during database disconnection.',
            details: e,
          });
        });
    });
  }

  /**
   * Gets the current status of the database connection.
   * @returns {boolean} True if the database connection is open; otherwise, false.
   */
  get isConnected(): boolean {
    return this._connected;
  }

  /**
   * Gets the TypeORM DataSource associated with the database connection.
   * @returns {DataSource} The TypeORM DataSource.
   */
  get DataSource(): DataSource {
    return this._dataSource;
  }
}
