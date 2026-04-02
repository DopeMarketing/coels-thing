import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

interface PaymentIntentData {
  amount: number;
  currency: string;
  customer_email?: string;
}

interface CustomerData {
  email: string;
  name?: string;
  phone?: string;
}

export async function createPaymentIntent(data: PaymentIntentData): Promise<Stripe.PaymentIntent | null> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: data.currency,
      receipt_email: data.customer_email,
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    return null;
  }
}

export async function createCustomer(customerData: CustomerData): Promise<Stripe.Customer | null> {
  try {
    const customer = await stripe.customers.create(customerData);
    return customer;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    return null;
  }
}