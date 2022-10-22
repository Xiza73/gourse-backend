import { UserDAO } from "../dao/userDAO";
import Stripe from "stripe";

export class StripeService {
  private stripe: Stripe;
  private readonly price = "50";

  constructor() {
    this.stripe = new Stripe(
      "sk_test_51Lr9lSIYCYVqXiULGRee2aGxiPE5d4qbN2LCILSdl1KocWiMNCx52XlkNsX8idutrewIbM0yNPWZJ4lUnUEQqS6b00kL13LbJV",
      {
        apiVersion: "2022-08-01",
      }
    );
  }

  /**
   * Generar intencion de PAGO
   */

  public generatePaymentIntent = async ({
    user,
    payment_method,
  }: {
    user: any;
    payment_method: any;
  }) => {
    const resPaymentIntent = await this.stripe.paymentIntents.create({
      amount: parseFloat(process.env.SUBSCRIPTION_PRICE!) * 100,
      currency: process.env.STRIPE_CURRENCY!,
      payment_method_types: ["card"],
      payment_method,
      description: `Pago por suscripción-> ${user}: Pago`,
    });

    return resPaymentIntent;
  };

  /**
   * Confirmar pago
   */

  public confirmPaymentIntent = async (id: any, token: any) => {
    const paymentIntent = await this.stripe.paymentIntents.confirm(id, {
      payment_method: token,
    });

    console.log(paymentIntent);

    return paymentIntent;
  };

  /**
   * Crear fuente
   */

  public generatePaymentMethod = async (token: any) => {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: "card",
      card: { token },
    });

    return paymentMethod;
  };

  /**
   * Consultar detalle de orden
   */

  public getPaymentDetail = async (id: any) => {
    const detailOrder = await this.stripe.paymentIntents.retrieve(id);
    return detailOrder;
  };
}
