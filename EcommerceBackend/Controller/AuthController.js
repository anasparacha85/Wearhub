const jwt=require('jsonwebtoken')
const user=require('../Model/SignupModel')
const nodemailer=require('nodemailer')
require('dotenv').config()
const signup=async (req,res)=>{
    try{
    const {name,email,password,ConfirmPassword}=req.body;
    const finduser=await user.findOne({email});
    if(finduser){
        return res.status(401).json({msg:'User Already Exists'})
    }
    if(password!=ConfirmPassword){
        return res.status(401).json({msg:'Please ReWrite the Confrim password'})
    }
    const data=await user.create({name,email,password,ConfirmPassword})
    res.status(200).json({msg:'User Registered Syccessfully',token:await data.generateToken()})  
    }
    catch(error){
        console.log('internal server error',error);
        
res.status(500).json({msg:'Internal server error'})
    }
}
const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const finduser=await user.findOne({email});
        if(!finduser){
            return res.status(400).json({msg:'User Not Exists'});

        }
        const comparepassword=await finduser.comparepassword(password);
        if(comparepassword){
            res.status(200).json({msg:'Login Successful',token:await finduser.generateToken()})
        }

       
    } catch (error) {
        res.status(500).json({msg:'internal server error'})
        
    }
}
const transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'amiranas761@gmail.com',
        pass:'qjuuuxffwofxyzdd'

    }
})
const sendotp=async(req,res)=>{
    try {
        const otp=10000+Math.floor(Math.random()*50000)
        const {email}=req.body; 
        const findemail=await user.findOne({email});
        if(!findemail){
            return res.status(401).json({msg:"Can't Send Email"});
        }
        const token=jwt.sign({id:findemail._id,email:findemail.email,otp:otp},process.env.OTP_SECRET_KEY,{expiresIn:'15m'});
        const info=await transporter.sendMail({
            from:'"Wearhub" <amiranas761@gmail.com>',
            to:email,
            subject:'Password Reset Code',
            text:`Your otp is ${otp}`,
            html:`<p>hi ${findemail.name} your otp for password reset is <b>${otp}</b></p> `
        })
        if(info.messageId){
            await user.updateOne({email:email},{$set:{otp:otp}})
            res.status(200).json({msg:'Otp has been Send to your email ',token:token})

        }
        else{
            return res.status(400).json({msg:"Can't send email"})
        }
        
    } catch (error) {
        res.status(500).json({msg:'internal server error'})
        
    }
   
    
}

module.exports={signup,login,sendotp};