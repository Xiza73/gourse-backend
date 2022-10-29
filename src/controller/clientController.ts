import { NextFunction, Request, Response } from "express";
import { ClientService } from "../service/clientService";

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  public getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = req.query;
    const response = await this.clientService.getUserProfile(username);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public getUserProfileId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.query;
    const response = await this.clientService.getUserProfileId(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const response = await this.clientService.updateUserProfile(id, req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public updateUserProfileId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.clientService.updateUserProfileId(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const response = await this.clientService.readClient(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readClients = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.clientService.readClients();

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public addFavorite = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.clientService.addFavorite(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public removeFavorite = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.clientService.removeFavorite(req.body);
    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readFavorites = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const response = await this.clientService.readFavorites(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public addCompleted = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.clientService.addCompleted(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public removeCompleted = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await this.clientService.removeCompleted(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readCompleted = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const response = await this.clientService.readCompleted(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
}
