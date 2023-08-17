// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/userMulter');
const userValidationMiddleware = require('../middlewares/userValidationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

 
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.processLogin);

router.get('/register', userValidationMiddleware, usersController.register);
router.post('/register', upload.single('image'), userValidationMiddleware, usersController.processRegister);

router.get('/account', authMiddleware, usersController.account);
router.get('/account/logout', usersController.logout);


module.exports = router;
