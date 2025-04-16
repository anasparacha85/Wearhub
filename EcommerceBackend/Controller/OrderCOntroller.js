
const Cart=require('../Model/CartModal')
const Order=require('../Model/OrderModal')
const nodemailer=require('nodemailer')
const transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'amiranas761@gmail.com',
        pass:'qjuuuxffwofxyzdd'

    }
})

const CreateOrder=async (req,res)=>{
    try {
        let SUbTotal=0;
        const {address,city,phone}=req.body;
        console.log(address,city,phone);
        
        const findCart=await Cart.findOne({
            userId:req.user._id
        }).populate('items.productId')
        console.log(findCart);
        if(!findCart){
       return res.status(400).json({FailureMessage:"There are no products in the cart"})
    }
    findCart.items.forEach(element => {
        SUbTotal=SUbTotal+=element.TotalPrice
    });
        console.log(SUbTotal);
  const CreatedOrder=   await Order.create({userId:req.user._id,items:findCart.items,SubTotal:SUbTotal,FullName:req.user.name,Address:address,city:city,PhoneNumber:phone})
       
  if(!CreatedOrder){
    return res.status(400).json({FailureMessage:"Order Not Placed"})
  }
  const deleteCart=await Cart.deleteOne({userId:req.user._id})
  res.status(200).json({SuccessMessage:"your Order has been placed",CreatedOrder})
await transporter.sendMail({
            from:'"Wearhub" <amiranas761@gmail.com>',
                to:req.user.email,
                subject:'Order Placed Confrimation',
                html:`<p>hi ${req.user.name} Your Order has been COnfirmed and will be ready to deliver in about 1 to 2 days ...Thanks for Placing Order from our Brand . </p>`,
               
  })
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({FailureMessage:"Internal Server error"})
        
    }

}
const LatestOrder=async(req,res)=>{
    try {
        const order=await Order.findOne({userId:req.user._id}).sort({createdAt:-1}).populate('items.productId')
        if(!order){
            return res.status(400).json({FailureMessage:'Order not found'})
        }
        res.status(200).json({SuccessMessage:"Recieved Order",order})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({FailureMessage:'Internal Server error'})
    }
}
module.exports={CreateOrder,LatestOrder}