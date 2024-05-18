const giftTransactionController = require('../controllers/giftTransactionController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', giftTransactionController.createGiftTransaction);
router.get('/transaction', giftTransactionController.getGiftTransactionId);
router.get('/', giftTransactionController.getAllGiftTransactions);

module.exports = router;
