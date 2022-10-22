import { Router } from "express";
import { ClientController } from "../controller/clientController";

export class ClientRouter {
  private readonly _router: Router;
  private readonly _controller: ClientController;

  constructor() {
    this._router = Router();
    this._controller = new ClientController();
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.get("/", this._controller.readClients);
    this._router.get("/profile", this._controller.getUserProfile);
    this._router.get("/profile/id/", this._controller.getUserProfileId);
    this._router.put("/profile/:id", this._controller.updateUserProfile);
    this._router.post("/profile/id/", this._controller.updateUserProfileId);
    this._router.get("/:id", this._controller.readClient);
    this._router.get("/favorites/:id", this._controller.readFavorites);
    this._router.post("/favorites/add", this._controller.addFavorite);
    this._router.post("/favorites/remove", this._controller.removeFavorite);
  }
}
