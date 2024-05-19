const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const prisma = require("./config/prismaConfig");
const prisma = new PrismaClient();
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const agentRoute = require("./routes/agentRoute");
const feedbackRoute = require("./routes/feedbackRoute");
const beneficiaryRoute = require("./routes/beneficiaryRoute");
const purchaserRoute = require("./routes/purchaserRoute");
const receiverRoute = require("./routes/receiverRoute");
const purchaseTransactionRoute = require("./routes/purchaseTransactionRoute");
const giftTransactionRoute = require("./routes/giftTransactionRoute");
const inheritanceTransactionRoute = require("./routes/inheritanceTransactionRoute");
const edtReturnRoute = require("./routes/edtReturnRoute");
const giftReturnRoute = require("./routes/giftReturnRoute");
const inheritanceReturnRoute = require("./routes/inheritanceReturnRoute");
const paymentRoute = require("./routes/paymentRoute");
const penaltyRoute = require("./routes/penaltyRoute");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = request.body;
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        try {
          console.log(session.metadata.edtReturnId);
          prisma.eDTReturn
            .update({
              where: { id: parseInt(session.metadata.edtReturnId) },
              data: { status: "PAID" },
            })
            .then((updatedReturn) => {
              if (updatedReturn) {
                res.status(200).json({
                  message: "Return updated successfully.",
                  return: updatedReturn,
                });
              } else {
                res.status(404).json({
                  message: "Return not found",
                });
              }
            })
            .catch((err) => {
              res.status(500).json({
                message: "Error updating the return.",
                error: err,
              });
            });

          response.status(200).json({ received: true });
        } catch (err) {
          console.log(err);
          response.status(500).json({
            message: "Error updating EDT Return status",
            error: err,
          });
        }
        break;
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});

app.use("/api/agents", agentRoute);
app.use("/api/feedbacks", feedbackRoute);
app.use("/api/beneficiaries", beneficiaryRoute);
app.use("/api/purchasers", purchaserRoute);
app.use("/api/receivers", receiverRoute);
app.use("/api/purchase-transactions", purchaseTransactionRoute);
app.use("/api/gift-transactions", giftTransactionRoute);
app.use("/api/inheritance-transactions", inheritanceTransactionRoute);
app.use("/api/edt-returns", edtReturnRoute);
app.use("/api/gift-returns", giftReturnRoute);
app.use("/api/inheritance-returns", inheritanceReturnRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/penalties", penaltyRoute);
