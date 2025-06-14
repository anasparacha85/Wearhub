const express=require('express');
const dbconnect=require('./utils/db')
const cors=require('cors')
const Authrouter=require('./Router/AuthRouter')
const ShopRouter=require('./Router/ShopRouter')
const CartRouter=require('./Router/CartROuter')
const OrderRouter=require('./Router/OrderRouter')
const StripeRouter=require('./Router/StripeRouter')
const bodyparser=require('body-parser')

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Cart = require("./Model/CartModal");
const User = require('./Model/SignupModel');
const Order = require('./Model/OrderModal');
const nodemailer=require('nodemailer')
const transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'amiranas761@gmail.com',
        pass:'oxgistgtmrabvhuh'

    }
})

require('dotenv').config()

const server=express();

server.use(cors());
console.log(process.env.STRIPE_WEBHOOK_SECRET);
server.post('/api/stripe/webhook', bodyparser.raw({type: 'application/json'}), async(req, res) => {
    const sig = req.headers['stripe-signature'];
      let event;
    
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (error) {
        console.log("webhook error", error);
        return res.status(400).json({ FailureMessage: `Webhook error ${error.message}` });
      }
    
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const { userId, address, city, phone } = session.metadata;
    
        try {
          const user = await User.findById(userId);
          if (!user) return res.status(400).json({ message: 'User not found' });
    
          const cart = await Cart.findOne({ userId }).populate('items.productId');
          if (!cart) return res.status(400).json({ message: 'Cart not found' });
    
          let subTotal = 0;
          cart.items.forEach(item => {
            subTotal += item.TotalPrice;
          });
    
          const order = await Order.create({
            userId,
            items: cart.items,
            SubTotal: subTotal,
            FullName: user.name,
            Address: address,
            city,
            PhoneNumber: phone,
            PaymentStatus: 'Paid'
          });
    
          await Cart.deleteOne({ userId });
    
          await transporter.sendMail({
            from: '"Wearhub" <amiranas761@gmail.com>',
            to: user.email,
            subject: 'Order Confirmation',
            html: `<p>Hi ${user.name}, your order has been confirmed!</p>`,
          });
    
          console.log("✅ Order placed after Stripe payment!");
            res.status(200).json({ SuccessMessage: "Your order has been placed", order });
    
        } catch (err) {
          console.error("Order creation failed in webhook:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
      }
    
      res.status(200).send('Webhook received');
  // your webhook handler logic here
});


server.use(bodyparser.json())
server.get('/',(req,res)=>{
    res.status(200).json({Message:"Server started"})
})
server.use('/api/auth',Authrouter)
server.use('/api/Shop',ShopRouter)
server.use('/api/Cart',CartRouter)
server.use('/api/Order',OrderRouter)
server.use('/api/stripe',StripeRouter)
const port =process.env.PORT || 5000
dbconnect().then(()=>{server.listen(port,()=>{
    console.log('server started');
    
    
})})
  