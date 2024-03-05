const express = require('express');
const userController = require("../controllers/userController")
const router = express.Router();


router.get('/',userController.loginPage)
router.post('/',userController.login)


router.get('/userHome',userController.loadUserHome)

router.get('/register',userController.registerPage)
router.post('/register',userController.insertUser)

router.get("/logout",userController.logout)


module.exports = router