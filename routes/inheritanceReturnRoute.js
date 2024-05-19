const inheritanceReturnController = require('../controllers/inheritanceReturnController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/create', inheritanceReturnController.createInheritanceReturn);
router.get('/filed', inheritanceReturnController.getInheritanceTaxReturnsFiled);
router.get('/paid', inheritanceReturnController.getInheritanceTaxReturnsPaid);
router.get('/:id', inheritanceReturnController.getInheritanceReturnById);
router.get('/', inheritanceReturnController.getAllInheritanceReturns);
router.patch('/:id', inheritanceReturnController.updateInheritanceReturnById);
router.delete('/:id', inheritanceReturnController.deleteInheritanceReturnById);

module.exports = router;
