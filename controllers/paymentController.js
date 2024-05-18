const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require("../config/prismaConfig");

// Create a Payment Intent
async function createPaymentIntent(req, res) {
  const { edtReturnId } = req.params.id;

  try {
    const edtReturn = await prisma.eDTReturn.findUnique({
      where: { id: parseInt(edtReturnId) },
    });

    if (!edtReturn) {
      return res.status(404).json({
        message: "EDT Return not found",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: edtReturn.taxDue * 100, // Stripe amount is in cents
      currency: 'usd',
      metadata: { edtReturnId: edtReturn.id.toString() },
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error creating payment intent",
      error: err,
    });
  }
}

// Handle webhook event
async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    try {
      await prisma.eDTReturn.update({
        where: { id: parseInt(paymentIntent.metadata.edtReturnId) },
        data: { status: 'Paid' },
      });

      res.status(200).json({ received: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error updating EDT Return status",
        error: err,
      });
    }
  } else {
    res.status(400).json({ message: "Unhandled event type" });
  }
}

module.exports = {
  createPaymentIntent,
  handleWebhook,
};
