import { Router } from "express";

import { ExampleRouter } from "@modules/example/example.routes";
import { CoreControllers } from "@core/controllers";

/**
 * In this variable, put all your routers, according your preferences.
 */
export const WEB_SERVER_ENDPOINTS: IRouteDeclaration[] = [
  /**For example, in this object you can put your API routes */
  {
    prefix: "/api",
    nestedRoutes: [
      Router().get('/', CoreControllers.Hello),
      
      ExampleRouter
    ],
  },
];

interface IRouteDeclaration {
  prefix: string;
  nestedRoutes: Array<Router>;
}
