const paymentController = require('../controllers/paymentController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create-checkout-session', paymentController.createCheckoutSession);
// router.post('/webhook', paymentController.handleWebhook);

module.exports = router;
