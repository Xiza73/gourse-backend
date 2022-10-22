import { Router } from "express";
import { UserController } from '../controller/userController';

export class UserRouter {
  private readonly _router: Router;
  private readonly _controller: UserController;

  constructor() {
    this._router = Router();
    this._controller = new UserController()
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.get('/', this._controller.getUsers);
    this._router.get('/role', this._controller.getUsersByRole);
    this._router.get('/id', this._controller.getUser);
    this._router.put('/', this._controller.updateUser);
    this._router.delete('/:id', this._controller.deleteUser);
    this._router.put('/password', this._controller.updatePassword);
  }
}
