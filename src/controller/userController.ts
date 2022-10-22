import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/userService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const person = req.query.person as string;
    const response = await this.userService.getUsers(person);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public getUsersByRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.userService.getUsersByRole(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.userService.getUser(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.userService.updateUser(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const response = await this.userService.deleteUser(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.userService.updatePassword(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
}
