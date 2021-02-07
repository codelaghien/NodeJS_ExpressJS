const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.get);
router.post('/', userController.post);
router.post('/login', userController.login);
router.get('/promise', userController.promise);

// router.put('/put', userController.put);

module.exports = router;
