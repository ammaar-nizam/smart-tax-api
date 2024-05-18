const paymentController = require('../controllers/paymentController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/payment-intent', paymentController.createPaymentIntent);
router.post('/webhook', paymentController.handleWebhook);

module.exports = router;
