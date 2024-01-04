# Databases Folder

## Important
*As for other services and potential databases, you should first set up your environment variables in the ```configs``` directory of the project, as from there, all configurations will be distributed to the various existing and yet-to-be-created services and databases.*

## Overview

In this folder, you can manage all your databases connections you want.

For example, as I said in previouses ```README.md``` files, I created a TypeORM based Postgres database connection, located in the ```main``` folder, following the structure below:

```ts
import { DatabasesConfigurations } from "@configs/definitions";

import { PostgresDBConnection } from "../engines";

/**You can get the configuration from DatabasesConfiguration */
const config = DatabasesConfigurations.getInstance().mainDB;

/**
 * Your main database connection (postgres).
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
```
So, if you want create another connection, you can follow this structure.

In the case you want use another databse engine, you can follow the next article about TypeORM connections with ```DataSource```)
[https://orkhan.gitbook.io/typeorm/docs/data-source]

I created a little Engine class for handling Postgres connections with TypeORM using its DataSource class _(engines/```PostgresDBConnection.ts```)_.


## How to connect them

In the ```Server.ts``` _(src/server/```Server.ts```)_, you only need to call it from the ```databases``` constant:

```ts
//Server.ts

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

      await databases.MainDB.connect(); //Connect to your Databases from this way.

      ApiLog.info(SERVICE_NAME, 'Databases are ready for use.');
      resolve();        
    } catch (e) {
      ApiLog.error(SERVICE_NAME, 'Error during databases connection', e);
      reject(e);
    }
  });
}
```

## Notes
Don't forget to import/export your databases in the ```index.ts``` file to leverage the use of barrel files:

```ts
export * from "./main/main-db";

// This way
export * from "./another/another-db";
```