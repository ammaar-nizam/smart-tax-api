const edtReturnController = require('../controllers/edtReturnController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', edtReturnController.createEDTReturn, authorization.verifyToken);
router.get('/:id', edtReturnController.getEDTReturnById, authorization.verifyToken);
router.get('/', edtReturnController.getAllEDTReturns, authorization.verifyToken);
router.patch('/:id', edtReturnController.updateEDTReturnById, authorization.verifyToken);
router.delete('/:id', edtReturnController.deleteEDTReturnById, authorization.verifyToken);

module.exports = router;
