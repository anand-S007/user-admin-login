const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/',adminController.adminLoginPage)
router.post('/',adminController.adminLogin)

router.get('/adminhome',adminController.adminHome)
router.post('/adminhome',adminController.searchUser)

router.get('/adminhome/createuser',adminController.createUserPage)
router.post('/adminhome/createuser',adminController.createUser)

router.get('/adminhome/edituser',adminController.editUserPage)
router.post('/adminhome/edituser',adminController.editUserSave)


router.get('/adminhome/deleteuser',adminController.deleteUser)

router.get('/logout',adminController.adminlogout)


module.exports = router