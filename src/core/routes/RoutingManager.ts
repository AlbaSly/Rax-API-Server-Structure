import { Application, NextFunction, Request, Response } from "express";

import { ApiLog } from "@core/utils";
import { WEB_SERVER_ENDPOINTS } from "./index";

export class RoutingManager {

  private appServer: Application;

  constructor(appServer: Application) {
    this.appServer = appServer;

    this.enableCors();
    this.buildRoutes();
    this.set404Route();
  }
  
  private enableCors(): void {
    this.appServer.use("*", (req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header(
          "Access-Control-Allow-Headers",
          "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
        );
        res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

        next();
      }
    );
    ApiLog.verbose('RoutingManager', 'CORS enabled for each request.');
  }

  private buildRoutes(): void {
    WEB_SERVER_ENDPOINTS.forEach(routeDeclarations => {
      const { prefix, nestedRoutes } = routeDeclarations;

      nestedRoutes.forEach(router => {
        this.appServer.use(prefix, router);
      });

      ApiLog.verbose('RoutingManager', `Routes for ${prefix} declaration stablished.`);
    });
  }

  private set404Route(): void {
    this.appServer.use('*', (req: Request, res: Response) => res.status(404).json({
      msg: 'Resource not found',
      data: {
        resourceRequested: req.url,
        method: req.method,
      }
    }));
    
    ApiLog.verbose('RoutingManager', '404 route stablished');
  }
}