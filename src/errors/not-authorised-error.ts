import { CustomError } from "./custom-error";

export class NotAuthorisedError extends CustomError {
  statusCode = 401;
  constructor() {
    super("You are not authorised");
    //Only to extend a built in class
    Object.setPrototypeOf(this, NotAuthorisedError.prototype);
  }

  serializeErrors() {
    return [{ message: "You are not authorised" }];
  }
}
