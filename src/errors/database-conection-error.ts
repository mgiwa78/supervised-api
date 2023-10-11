import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error Connecting to database";
  constructor() {
    super("Error Connecting to database");
    //Only to extend a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
