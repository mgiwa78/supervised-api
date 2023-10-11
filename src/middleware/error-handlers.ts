import { Request, Response, NextFunction } from "express-serve-static-core";
// import { RequestValidationError } from "../errors/request-validation-errors";
// import { DatabaseConnectionError } from "../errors/database-conection-error";

import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: "Somthing went wrong" }]
  });
};
