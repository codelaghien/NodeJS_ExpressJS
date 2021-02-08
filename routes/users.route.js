const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', userController.get);
router.post('/', userController.post);
router.post('/login', userController.login);
router.get('/promise', userController.promise);
router.get('/promises', userController.promises);
router.get('/async_await', authenticateToken, userController.async_await);
router.get('/fakeLogin', userController.fakeLogin);

// router.put('/put', userController.put);

module.exports = router;
