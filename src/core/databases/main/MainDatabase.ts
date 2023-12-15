import { PostgresDBConnection } from "../engines/PostgresDBConnection";

import { DatabasesConfig } from "@core/config";

/**PostgreSQL instance for the Main Database */
export const MainDatabase = new PostgresDBConnection(
  DatabasesConfig.main.name,
  {
    ...DatabasesConfig.main,
    /**Your entities if were the case (TypeORM Postgres)*/
    entities: []
  }
);