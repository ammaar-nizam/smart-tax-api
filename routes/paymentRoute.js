const paymentController = require('../controllers/paymentController');
const authorization = require('../middleware/authorization');
const express = require('express');

const router = express.Router();

router.post('/create-checkout-session', paymentController.createCheckoutSession);
router.post('/webhook', express.raw({type: 'application/json'}), paymentController.handleWebhook);

module.exports = router;
