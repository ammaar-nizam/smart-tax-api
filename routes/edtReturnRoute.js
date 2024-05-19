const edtReturnController = require('../controllers/edtReturnController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', edtReturnController.createEDTReturn);
router.get('/filed', edtReturnController.getEDTReturnsFiled);
router.get('/paid', edtReturnController.getEDTReturnsPaid);
router.get('/:id', edtReturnController.getEDTReturnById);
router.get('/', edtReturnController.getAllEDTReturns);
router.patch('/:id', edtReturnController.updateEDTReturnById);
router.delete('/:id', edtReturnController.deleteEDTReturnById);

module.exports = router;
