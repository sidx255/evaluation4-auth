const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/user',authController.addUser);
router.post('/login',authController.login);
router.get('/verify',authController.verifyToken);

module.exports = router;