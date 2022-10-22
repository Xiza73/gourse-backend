import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../helpers/ErrorHandler";
import { AuthService } from "../service/authService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.authService.signIn(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.authService.signUp(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("jwt");
      const response = await this.authService.logout();

      if (response.statusCode === 200) return res.status(200).json(response);
      next(response);
      return;
    } catch (err) {
      next(new ErrorHandler(400, "Error al cerrar la sesión"));
      return;
    }
  }

  public sendRecoverEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.authService.sendRecoverEmail(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public isUser = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.authService.isUser(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.authService.changePassword(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
}
