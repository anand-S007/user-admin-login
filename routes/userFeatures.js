const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/',userController.loadUserHome)

router.get("/viewprofile",userController.viewProfile)

router.get('/editprofile',userController.editprofilePageLoad)
router.post('/editprofile',userController.editprofile)

module.exports = router