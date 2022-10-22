import { NextFunction, Request, Response } from "express";

export class PrivateController {
  constructor() {}

  public special = (req: Request, res: Response, next: NextFunction) => {
    res.send("logged");
  };

  public noSpecial = (req: Request, res: Response, next: NextFunction) => {
    res.send("no logged");
  };
}
