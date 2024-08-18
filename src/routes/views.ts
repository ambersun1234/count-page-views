import { Router } from "express";
import { Request, Response } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, world!" });
});

export default routes;
