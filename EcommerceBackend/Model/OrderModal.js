const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
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
    ,
    SubTotal:{
        type:Number
    },
    FullName:{
        type:String,

    },
    Address:{
        type:String,  
    },
    City:{
        type:String,
    },
    PhoneNumber:{
        type:Number,

    },
    PaymentStatus:{
        type:String,
        enum:["Paid","Not Paid"]
    }


},{timestamps:true})

const Order=new mongoose.model('Order',OrderSchema)
module.exports=Order;