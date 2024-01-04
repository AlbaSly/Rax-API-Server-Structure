# Configs Folder

This folder serves as a dedicated space for files related to the configuration and loading of environment variables. Its purpose is to consolidate all elements concerning the setup of variables for configuring databases and other services within our application. 

```shell
.
└── configs/
    ├── classes/
    │   └── index.ts
    ├── definitions/
    │   ├── databases.config.ts
    │   ├── web-service.config.ts
    │   └── index.ts
    └── interfaces/
        └── index.ts
```

## Overview

The configs folder is organized into three main subdirectories: ```classes```, ```definitions```, and ```interfaces```. Each serves a specific purpose in managing configuration-related aspects of the application.

### Subdirectories

**classes**

In this folder, you will find a file (index.ts) which serves as a template for creating classes related to the configuration and loading of environment variables (that you will manage within ```definitions``` folder).

**definitions**

In this folder, you will organize all classes responsible for configuring and loading environment variables. Currently, there are two primary implementations for managing environment variables:

- **DatabasesConfigurations _(definitions/databases.config.ts)_**: To manage all environment variables for multiples databases.

- **WebServiceConfigurations _(definitions/web-service.config.ts)_**: To manage all environment variables for the Web Service, as its services (like email provider, JWT, etc...).

**interfaces**: 

In this folder, it will simply serve to maintain type safety for the kind of variables to be used in the configurations.

## Implementation

If you want to create another definition class for handle more logic related to your Web Service or similar, you must follow the next steps.

1. **Create a class that extends from the abstract ```ConfigurationsLoader``` class**

```ts
// my-implementation.config.ts

import dotenv from "dotenv"; //import dotenv

import { ConfigurationsLoader } from "@configs/classes"; //import the abstract class

export class MyConfigurations extends ConfigurationsLoader {
  //Make it singleton
  private static _instace: MyConfiguration | null = null;

  yourConfig1: {
    someValue1: string;
    someValue2: boolean;
  }
  yourConfig2: {
    someValue3: number;
  }

  /** Private constructor **/
  private constructor() {
    /**Calling the parent constructor**/
    super();
  }

  /**Override parent class method (loadEnvironmentVars) **/
  override loadEnvironmentVars(): void {
    /**Verify if the environments from this class are already loaded. **/
    if (super.areEnvironmentVarsLoaded) {
      // Do some stuff
      return;
    }

    /**Always load dotenv configurations to get the .env data **/
    dotenv.config();

    /** Now, set all your desired environments. **/
    yourConfig1 = {
      someValue1: process.env.SOME_VALUE_1!;
      someValue2: Boolean(process.env.SOME_VALUE_2!);
    }

    yourConfig2 =  {
      someValue3: Number(process.env.SOME_VALUE_3!);
    }

    /** Always mark environment variables as loaded **/
    super.areEnvironmentsVarsLoaded = true;
  }

  /**Get the singleton instance **/
  static getInstance(): MyConfigurations {
    if (!this._instance) {
      this._instance = new MyConfigurations();
    }
    
    return this._instance;
  }
}
```

2. **Call the _```loadEnvironmentVars()```_ method in the ```Server``` class _(src/Server.ts)_**

Search for the _```loadConfigurations()```_ method:

```ts
//Server.ts

/**
 * Loads all configurations, including web service and database configurations.
 */
private loadConfigurations(): void {
  ApiLog.verbose(SERVICE_NAME, 'Resolving configurations...');

  WebServiceConfigurations.getInstance().loadEnvironmentVars();
  DatabasesConfigurations.getInstance().loadEnvironmentVars();

  //Your own configuration class
  MyConfigurations.getInstance().loadEnvironmentVars();

  ApiLog.info(SERVICE_NAME, 'Configurations are set.');
}
```
With this, you will be able to use your environment variables anywhere in your application.

```ts
import { MyConfigurations } from "@configs/definitions";

function fetchUsers(): Promise<Users[]> {
  return new Promise((resolve, reject) => {
    // Don take this axios fetch operation seriosuly, is simply a visual example :).
    axios.get('http://some-backend/get-users', {
      configs: MyConfigurations.getInstance().yourConfig1
    }).then((response) => resolve(response as Users[]));
  });
}
```

## Notes

Don't forget import/export your new implementations inside the ```index.ts``` folder within the ```definitions``` folder:

```ts
export * from "./web-service.config";
export * from "./databases.config";

export * from "./my-implementation.config.ts";
```

Also, make sure your environments variables exist inside the ```.env``` file.