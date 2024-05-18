const agentController = require('../controllers/agentController');
const emailController = require('../controllers/emailController');
const authorization = require('../middleware/authorization');

const router = require("express").Router();

router.post('/request', emailController.sendRegistrationRequestEmail);
router.post('/register', agentController.registerAgent);
router.post('/login', agentController.loginAsAgent);
router.post('/logout', agentController.logoutAsAgent);
router.get('/names', agentController.getAgentByName);
router.get('/:id', agentController.getAgentById);
router.get('/', agentController.getAllAgents);
router.patch('/:id', agentController.updateAgentById);
router.delete('/:id', agentController.deleteAgentById);

module.exports = router;
