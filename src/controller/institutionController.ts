import { NextFunction, Request, Response } from "express";
import { InstitutionService } from "../service/institutionService";

export class InstitutionController {
  private institutionService: InstitutionService;

  constructor() {
    this.institutionService = new InstitutionService();
  }

  public addInstitution = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.institutionService.addInstitution(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public updateInstitution = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.institutionService.updateInstitution(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readInstitutions = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name as string;
    const response = await this.institutionService.readInstitutions(name);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readAllInstitutions = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name as string;
    const response = await this.institutionService.readAllInstitutions(name);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readInstitution = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const response = await this.institutionService.readInstitution(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public deleteInstitution = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const response = await this.institutionService.deleteInstitution(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

}
