# Raxel's Node Backend Template

This is a scalable Node.js + Express.js backend structure for REST APIs, with the essential stuff for basic and medium projects.

## Stack

This project has been built with the following technologies:

- NodeJS
- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- Docker

## Setup

I will explain all the steps you need to setup up the web server.

### 1. Environment Variables

In the ``.env.template`` file there are some values that you must put in the ```.env``` file.

- **WEB_SERVICE_NAME**: Desired name for your Web Service.
- **PORT**: The server port to up the Web Service.
- **HOST**: The server address to up the Web Service.

#### Database Configuration

In this case, I'm using PostgreSQL as main database engine. So if you need to use another configurations or add more than one database, update the ```.env``` file and/or modify the ```DatabasesConfiguration``` class _(configs/definitions/```databases.config.ts```)_ file based in your needs.

For a single PostgreSQL database connection, you can use the following environment vars:

- **MAIN_DB_HOST**: Database address.
- **MAIN_DB_PORT**: Database port.
- **MAIN_DB_USER**: Database connection username.
- **MAIN_DB_PASSWORD**: Database connection password.
- **MAIN_DB_NAME**: Name of the desired database.
- **MAIN_DB_POOL_SIZE**: Max pool size for the database connection.

To more information about their usages, check the ```README.md``` in the configs folder at the ```src``` folder of the project.

#### Nodemailer Provider Configuration (optional)

If you need to use an email engine for sending emails to the users, or related actions, you can use Nodemailer with the ```EmailService``` _(src/core/services/```email.service.ts```)_ for these tasks.
For this, you must modify the following values in the ```.env``` file:

- **EMAIL_SERVICE_NAME**: Name of the email engine that you will use. (gmail, yahoo, hotmail, etc.).
- **EMAIL_SERVICE_USERNAME**: Email account address.
- **EMAIL_SERVICE_PASSWORD**: Password generated for the account.
- **EMAIL_PROVIDER_ADDRESS**: Usually is the same as the email account address.

To more information about their usages, check the ```README.md``` in the configs folder at the ```src``` folder of the project.

#### JWT Settings (optional)

Related to the authentication process, you may handle the user data by JSON Web Tokens. In this backend structure, you can handle JWTs with the ```JWTService``` _(src/core/services/```jwt.service.ts```)_

- **JWT_SECRET**: JWT secret password.
- **JWT_EXPIRATION**: JWT expiration time.

To more information about their usages, check the ```README.md``` in the configs folder at the ```src``` folder of the project.

### 2. Docker Compose File For Database (Optional)

If you want to use Docker to create and run a container for Postgres or any other database, you can setup your ```docker-compose.yaml``` (root/```docker-compose.yaml```) file.

For this project, I created a Docker Compose file to setup a PostgreSQL container.

### 3. NPM commands
Once you have configured everything, you can start in the development environment with the following command:

```shell
npm run dev
```

If you want to build for production, run this command:
```shell
npm run build
```

Start in production:
```shell
npm run start
```