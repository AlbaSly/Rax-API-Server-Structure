import { Router } from "express";
import { ExampleController } from "./example.controller";

const routes = Router({mergeParams: true});

routes.get('/get-message', ExampleController.getMessage);
routes.post('/send-message', ExampleController.sendMessage);

export const ExampleRouter = Router().use('/example', routes);