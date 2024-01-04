# Databases Folder

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