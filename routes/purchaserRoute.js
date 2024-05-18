const purchaserController = require('../controllers/purchaserController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', purchaserController.createPurchaser, authorization.verifyToken);
router.get('/nic', purchaserController.getPurchaserIdByNIC, authorization.verifyToken);
router.get('/names', purchaserController.getPurchaserByName, authorization.verifyToken);
router.get('/:id', purchaserController.getPurchaserById, authorization.verifyToken);
router.get('/', purchaserController.getAllPurchasers, authorization.verifyToken);
router.patch('/:id', purchaserController.updatePurchaserById, authorization.verifyToken);
router.delete('/:id', purchaserController.deletePurchaserById, authorization.verifyToken);

module.exports = router;
