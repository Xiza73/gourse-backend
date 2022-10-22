import { NextFunction, Request, Response } from "express";
import { AdminService } from "../service/adminService";

export class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  public getUserProfileId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    const response = await this.adminService.getUserProfileId(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.adminService.createUser(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.adminService.updateUser(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const response = await this.adminService.deleteUser(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
}
