const express=require('express');
const router=express.Router();
const {usersignup,login,AdminSignup}=require('../Controller/AuthController')
router.route('/User/Signup').post(usersignup)
router.route('/login').post(login)
router.route('/Admin/Signup').post(AdminSignup)


module.exports=router