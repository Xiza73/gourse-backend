import { NextFunction, Request, Response } from "express";
import { UserService } from '../service/userService';
import { StripeService } from '../service/stripeService';

export class StripeController {

  private stripeService: StripeService;
  private userService: UserService;

  constructor() {
    this.stripeService = new StripeService();
    this.userService = new UserService();
  }

  public generatePaymentMethod = async (req: Request, res: Response) => {
    const token = req.body.token;
    const paymentMethod = await this.stripeService.generatePaymentMethod(token);

    const paymentIntent = await this.stripeService.generatePaymentIntent({
      payment_method: paymentMethod.id,
      user: req.body.user,
    });

    return res.status(200).json({
      data: paymentIntent,
      status: 'success',
    });
  };

  public confirmPremium = async (req: Request, res: Response) => {
    const response = await this.userService.updatePremium(req.body);

    return res.status(200).json({
      message: 'User updated Premium'
    });
  };




}
