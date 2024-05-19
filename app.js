const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");

const agentRoute = require('./routes/agentRoute');
const feedbackRoute = require('./routes/feedbackRoute');
const beneficiaryRoute = require('./routes/beneficiaryRoute');
const purchaserRoute = require('./routes/purchaserRoute');
const receiverRoute = require('./routes/receiverRoute');
const purchaseTransactionRoute = require('./routes/purchaseTransactionRoute');
const giftTransactionRoute = require('./routes/giftTransactionRoute');
const inheritanceTransactionRoute = require('./routes/inheritanceTransactionRoute');
const edtReturnRoute = require('./routes/edtReturnRoute');
const giftReturnRoute = require('./routes/giftReturnRoute');
const inheritanceReturnRoute = require('./routes/inheritanceReturnRoute');
const paymentRoute = require('./routes/paymentRoute');
const penaltyRoute = require('./routes/penaltyRoute');

dotenv.config()

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Server is working!")
})

// Middleware to parse raw request body for webhook
app.use('/api/payments/webhook', bodyParser.raw({ type: 'application/json' }));
const paymentController = require('./controllers/paymentController')
app.post('/api/payments/webhook', paymentController.handleWebhook); // Mount webhook endpoint

app.listen(PORT, ()=> {
    console.log(`Backend server is running on port ${PORT}!`);
});

app.use('/api/agents', agentRoute);
app.use('/api/feedbacks', feedbackRoute);
app.use('/api/beneficiaries', beneficiaryRoute);
app.use('/api/purchasers', purchaserRoute);
app.use('/api/receivers', receiverRoute);
app.use('/api/purchase-transactions', purchaseTransactionRoute);
app.use('/api/gift-transactions', giftTransactionRoute);
app.use('/api/inheritance-transactions', inheritanceTransactionRoute);
app.use('/api/edt-returns', edtReturnRoute);
app.use('/api/gift-returns', giftReturnRoute);
app.use('/api/inheritance-returns', inheritanceReturnRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/penalties', penaltyRoute);