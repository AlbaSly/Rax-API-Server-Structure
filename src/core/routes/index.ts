import { Router } from "express";

/**
 * In this variable, put all your routers, according your preferences.
 */
export const WEB_SERVER_ENDPOINTS: IRouteDeclaration[] = [
  /**For example, in this object you can put your API routes */
  {
    prefix: "/api",
    nestedRoutes: [
      
    ],
  },
];

interface IRouteDeclaration {
  prefix: string;
  nestedRoutes: Array<Router>;
}
