import { Router } from "express";
import { CommentController } from "../controller/commentController";

export class CommentRouter {
  private readonly _router: Router = Router();
  private readonly _controller: CommentController = new CommentController();

  constructor() {
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.post("/", this._controller.addComment);
    this._router.get("/:id", this._controller.getComments);
  }
}
