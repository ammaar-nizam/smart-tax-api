const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const prisma = require("../config/prismaConfig");

// Take to Checkout Page
async function createCheckoutSession(req, res) {
  try {
    const edtReturn = await prisma.eDTReturn.findUnique({
      where: { id: parseInt(req.body.returnId) },
    });

    if (!edtReturn) {
      return res.status(404).json({
        message: "EDT Return not found",
      });
    }
    const taxDueCents = parseInt(edtReturn.taxDue * 100);
    if (isNaN(taxDueCents)) {
      throw new Error("Invalid tax due amount");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: "EDT Return Payment",
              // add more details about the product if needed
            },
            unit_amount: taxDueCents, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: req.body.agentEmail,
      billing_address_collection: 'auto',
      success_url: `${process.env.WEBSITE_DOMAIN}?success=true`,
      cancel_url: `${process.env.WEBSITE_DOMAIN}?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createCheckoutSession,
};
