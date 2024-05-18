const purchaseTransactionController = require('../controllers/purchaseTransactionController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', purchaseTransactionController.createPurchaseTransaction, authorization.verifyToken);
router.get('/transaction', purchaseTransactionController.getPurchaseTransactionId, authorization.verifyToken)
router.get('/', purchaseTransactionController.getAllPurchaseTransactions, authorization.verifyToken)

module.exports = router;
