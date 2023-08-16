// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const userValidationMiddleware = require('../middlewares/userValidationMiddleware');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

 
router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);

router.get('/register', usersController.register);
router.post('/register', upload.single('image'), userValidationMiddleware, usersController.processRegister);


module.exports = router;
