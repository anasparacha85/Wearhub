require('dotenv').config()
const mongoose=require('mongoose')
const URI=process.env.MONGODB_URI;


const dbconnect=async()=>{
    try{
        await mongoose.connect(URI);
        console.log('Database successfully Connected');
        
    }
    catch(error){
        console.error('database connection failed',error);
        process.exit(0)
        
    }
}
module.exports=dbconnect