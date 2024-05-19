const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Buffer } = require("buffer");

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

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const prisma = require("./config/prismaConfig");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Middleware to capture raw body
app.use((req, res, next) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    req.rawBody = data;
    next();
  });
});

// Using bodyParser.json() or bodyParser.urlencoded() as usual
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Webhook handler
app.post("/api/payments/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];
  const rawBody = Buffer.from(req.rawBody, "utf-8");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Extract the metadata
      const edtReturnId = session.metadata.edtReturnId;
      console.log(`Updating EDT Return ID: ${edtReturnId} to PAID`);

      // Update the eDTReturn status
      prisma.eDTReturn.update({
        where: { id: parseInt(edtReturnId) },
        data: { status: "PAID" },
      });

      res.status(200).json({ received: true });
    } catch (err) {
      console.error("Error updating EDT Return status", err);
      res.status(500).json({
        message: "Error updating EDT Return status",
        error: err,
      });
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
    res.status(400).json({ message: "Unhandled event type" });
  }
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
