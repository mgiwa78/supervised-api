import { Router } from "express";
import { Fetch__DEPARTMENTS__GET } from "../controllers/Department-Controller";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { uploadProducts } from "../middleware/multer";
import { AuthenticateUser } from "../middleware/require-auth";

const departmentRouter: Router = Router();

departmentRouter.get("/", Fetch__DEPARTMENTS__GET);

export default departmentRouter;
