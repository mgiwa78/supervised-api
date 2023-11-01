import { Router } from "express";
import { Fetch__FILE__GET } from "../controllers/Files-Controller";

const fileRouter: Router = Router();

fileRouter.get("/:fileID", Fetch__FILE__GET);

export default fileRouter;
