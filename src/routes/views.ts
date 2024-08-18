import { Router } from "express";

import { viewController } from "../controller/controller";

const routes = Router();

/* GET /views
 */
routes.get("/", viewController.GetViews.bind(viewController));

/* POST /views
 */
routes.post("/", viewController.CreateViews.bind(viewController));

export default routes;
