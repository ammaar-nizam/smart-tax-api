const beneficiaryController = require('../controllers/beneficiaryController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', beneficiaryController.createBeneficiary);
router.get('/names', beneficiaryController.getBeneficiaryByName);
router.get('/:id', beneficiaryController.getBeneficiaryById);
router.get('/', beneficiaryController.getAllBeneficiaries);
router.patch('/:id', beneficiaryController.updateBeneficiaryById);
router.delete('/:id', beneficiaryController.deleteBeneficiaryById);

module.exports = router;
