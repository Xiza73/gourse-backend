import { Router } from "express";
import { InstitutionController } from "../controller/institutionController";

export class InstitutionRouter {
  private readonly _router: Router = Router();
  private readonly _controller: InstitutionController =
    new InstitutionController();

  constructor() {
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.post("/", this._controller.addInstitution);
    this._router.put("/", this._controller.updateInstitution);
    this._router.get("/", this._controller.readInstitutions);
    this._router.get("/all", this._controller.readAllInstitutions);
    this._router.get("/:id", this._controller.readInstitution);
    this._router.delete("/all", this._controller.removeAllInstitutions);
    this._router.delete("/:id", this._controller.deleteInstitution);
    this._router.post("/score", this._controller.scoreInstitution);
    this._router.get("/score/:id", this._controller.readInstitutionRating);
  }
}
