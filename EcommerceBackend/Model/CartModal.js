const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    items:[
        {  
            productId:{
               type: mongoose.Schema.Types.ObjectId,
                ref:'ShopProducts'
             },
             Quantity:{
                type:Number,
                min:1,
                required:true,
                default:1
             },
             TotalPrice:{
                type:Number,
                
             }
             
}
    ]
},{timestamps:true})

const Cart=new mongoose.model('Cart',schema)
module.exports=Cart