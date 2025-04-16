const jwt=require('jsonwebtoken')
const registeruser=require('../Model/SignupModel')
const AuthenticatedUser=async(req,res,next)=>{
   
        const token=req.header('Authorization');
        if(!token){
            return res.status(401).json({FailureMessage:"UnAuthorized Http Token Not Provided"})
        }
        try {
        const decodedtoken=jwt.verify(token,process.env.JWT_SECRET_KEY);
      
        const findUser=await registeruser.findOne({email:decodedtoken.email}).select({password:0}) 
        if(!findUser){
            return res.status(401).json({FailureMessage:"User is not Verified"})
        }
        req.user=findUser;
         req.role=findUser.role;
         req.token=decodedtoken;
         req.userId=findUser._id;
        next()

    } catch (error) {
        console.log("internalserver error authen",error)
        res.status(500).json({FailureMessage:"Internal Server error from AuthenticatedUser"})
        
    }
}
module.exports=AuthenticatedUser;