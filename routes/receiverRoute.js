const receiverController = require('../controllers/receiverController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', receiverController.createReceiver);
router.get('/names', receiverController.getReceiverByName);
router.get('/:id', receiverController.getReceiverById);
router.get('/', receiverController.getAllReceivers);
router.patch('/:id', receiverController.updateReceiverById);
router.delete('/:id', receiverController.deleteReceiverById);

module.exports = router;
