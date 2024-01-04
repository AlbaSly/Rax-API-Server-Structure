import { DatabasesConfigurations } from "@configs/definitions";

import { PostgresDBConnection } from "../engines";

/**You can get the configuration from DatabasesConfiguration */
const config = DatabasesConfigurations.getInstance().mainDB;

/**
 * Your main database connection.
 */
export const MainDB = new PostgresDBConnection(
  config.database!,
  {
    type: 'postgres', //Always you will need to set the database type; For PostgresDBConnection, is 'postgres'
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    poolSize: config.poolSize,
    synchronize: false,
    entities: [
      // Your entities for this DB connection goes here.
    ],
  }
)