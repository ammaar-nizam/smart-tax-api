const giftReturnController = require('../controllers/giftReturnController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', giftReturnController.createGiftReturn);
router.get('/filed', giftReturnController.getGiftTaxReturnsFiled);
router.get('/paid', giftReturnController.getGiftTaxReturnsPaid);
router.get('/:id', giftReturnController.getGiftReturnById);
router.get('/', giftReturnController.getAllGiftReturns);
router.patch('/:id', giftReturnController.updateGiftReturnById);
router.delete('/:id', giftReturnController.deleteGiftReturnById);

module.exports = router;
