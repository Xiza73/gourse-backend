import { Router } from "express";
import { AdminController } from "../controller/adminController";

export class AdminRouter {
  private readonly _router: Router;
  private readonly _controller: AdminController;

  constructor() {
    this._router = Router();
    this._controller = new AdminController();
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.get("/profile/id/", this._controller.getUserProfileId);
    this._router.post("/", this._controller.createUser);
    this._router.delete("/:id", this._controller.deleteUser);
    this._router.put("/", this._controller.updateUser);
  }
}
