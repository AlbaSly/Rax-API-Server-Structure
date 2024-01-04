# Core Folder

This folder is intended for the server core structure to handle a REST API application.

```shell
.
└── core/
    ├── classes/
    │   ├── index.ts
    │   └── ServerError.ts
    ├── constants/
    │   └── index.ts
    ├── controllers/
    │   └── index.ts
    ├── databases/
    │   ├── engines/
    │   │   ├── index.ts
    │   │   └── PostgresDBConnection.ts
    │   ├── main/
    │   │   └── main-db.ts
    │   └── index.ts
    ├── enums/
    │   ├── index.ts
    │   └── http-status.enum.ts
    ├── helpers/
    │   ├── controller-response.helper.ts
    │   └── index.ts
    ├── interfaces/
    │   ├── index.ts
    │   └── res-req.interface.ts
    ├── middlewares/
    │   ├── index.ts
    │   └── guard.mw.ts
    ├── routes/
    │   ├── index.ts
    │   └── RoutingManager.ts
    ├── services/
    │   ├── index.ts
    │   ├── email.service.ts
    │   ├── encryptation.service.ts
    │   ├── jwt.service.ts
    │   └── keys-generator.service.ts
    ├── utils/
    │   ├── index.ts
    │   ├── api-log.util.ts
    │   └── format.util.ts
    └── validations/
        └── index.ts
```

## classes
For classes related to something in specific, like Socket structures, Error Hanlers, etc.

## constants
A folder whose function is to store constants that are used globally within the entire logic of the application.

## controllers
As its name implies, it is meant to organize all the general controllers of the application, as well as those related to business logic.

## databases
In this particular section, we can handle multiple databases with different database engines, having a folder called engines. Here, you can have specific classes or functions for instantiating databases.

For this template, I've provided a PostgreSQL class for creating connections (```PostgresDBConnection.ts```), and an object instance as the main database, where you only need to modify the environment variables according to the ```README.md``` file _(src/configs/```README.md```)_ to have a connection to your PostgreSQL database. Additionally, it will serve as an example to create more instances with different connections.

## enums
All related to enums, like HTTP Status Codes, o enums related to business logic.

## helpers
Here you can organize all the functions that serve to handle specific business logic that can be reused in other modules, as well as functions for managing certain outputs. 
In the case where I handle service responses to controllers, I implemented a package of handler functions for that purpose (```controller-response.helper.ts```).

## interfaces
As its name implies, it is meant to organize all your core interfaces, and those related to business logic.
I provided interfaces to handle controller responses with certain readable structure.

## middlewares
As ist name implies, it is meant to organize all your core middlewares, and those related to business logic.

## routes
This folder's purpose is to organize all the routes (endpoints) you will develop for your REST API.
Also, I provided a class for manage all your routes with specific paths (```RoutingManager.ts```).

More info about its usage in the ```README.md``` file inside that folder.

## services
In this folder, all the services that will be used/shared between different modules and/or business logic functions are organized.

I provided services for JWT Auth, Email (Nodemailer), Encryptation and Password generators.

## utils
All functions that can be reused (agnostic of business logic) and can therefore be utilized in any project are placed here.

## validations
This is where all the validators are organized to handle client requests and ensure they follow a certain structure. Inside the folder, there is an example of usage using the ```Joi``` library.