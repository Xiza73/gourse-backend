import { NextFunction, Request, Response } from "express";
import { RoleService } from "../service/roleService";

export class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  public addRole = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.roleService.addRole(req.body.description);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public getRole = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const response = await this.roleService.getRole(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readRoles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.roleService.readRoles();

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public updateRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.roleService.updateRole(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public deleteRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.roleService.deleteRole(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
}
