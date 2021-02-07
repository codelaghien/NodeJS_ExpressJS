const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.get);
router.post('/', userController.post);
router.post('/login', userController.login);
router.get('/promise', userController.promise);
router.get('/promises', userController.promises);
router.get('/async_await', userController.async_await);

// router.put('/put', userController.put);

module.exports = router;
