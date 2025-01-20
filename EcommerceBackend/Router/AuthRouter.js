const express=require('express');
const router=express.Router();
const {signup,login,sendotp}=require('../Controller/AuthController')
router.route('/Signup').post(signup)
router.route('/login').post(login)
router.route('/ForgetPassword').post(sendotp);

module.exports=router