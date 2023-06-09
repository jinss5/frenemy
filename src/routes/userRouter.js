const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');

router.post('/kakaologin', userController.kakaologin);
router.get('', validateToken, userController.getUserById);
router.patch('', validateToken, userController.updateUserInfo);

module.exports = {
  router,
};
