const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const mongoose=require('mongoose');
const SignupSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    confirmPassword:{
        type:String,
        require:true

    },
    role:{
        type:String,
        enum:["User","Admin"],

        default:'User',
    },

    otp:{
        type:Number,
        require:true
    }
})
SignupSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }
    try{
    const saltroud=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(this.password,saltroud)
    this.password=hashedpassword
    }
    catch(error){
        next(error)
    }
})
SignupSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            role:this.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'30d'
        })
       
    }
    catch(error){
console.log('Error generating jwt token' ,error);

    }
}
SignupSchema.methods.comparepassword=async function(password){
try {
    return bcrypt.compare(password,this.password)
} catch (error) {
    console.log(error);
    
}
}
const signup=new mongoose.model('User',SignupSchema);
module.exports=signup