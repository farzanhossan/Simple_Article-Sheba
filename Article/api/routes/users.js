const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
let checkAuth = require('../middleware/checkAuth');


router.get('/',userController.userGet);
router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin);
router.delete('/delete/:user_id', checkAuth, userController.userDelete);


module.exports = router;