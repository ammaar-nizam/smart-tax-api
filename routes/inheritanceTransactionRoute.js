const inheritanceTransactionController = require('../controllers/inheritanceTransactionController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', inheritanceTransactionController.createInheritanceTransaction);
router.get('/:id', inheritanceTransactionController.getInheritanceTransactionById);
router.get('/', inheritanceTransactionController.getAllInheritanceTransactions);
router.patch('/:id', inheritanceTransactionController.updateInheritanceTransactionById);
router.delete('/:id', inheritanceTransactionController.deleteInheritanceTransactionById);

module.exports = router;
