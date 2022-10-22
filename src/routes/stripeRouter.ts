import { Router } from "express";
import { StripeController } from "../controller/stripeController";
import { UserController } from '../controller/userController';

export class StripeRouter {
  private readonly _router: Router;
  private readonly _controller: StripeController;

  constructor() {
    this._router = Router();
    this._controller = new StripeController()
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void{
    // this._router.post('/generatePaymentIntent', this._controller.generatePaymentIntent);
    this._router.post('/confirmPremium', this._controller.confirmPremium);
    this._router.post('/generatePaymentMethod', this._controller.generatePaymentMethod);
    // this._router.get('/getPaymentDetail', this._controller.getPaymentDetail);
  
  }
}
