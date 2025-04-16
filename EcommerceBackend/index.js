const express=require('express');
const dbconnect=require('./utils/db')
const cors=require('cors')
const Authrouter=require('./Router/AuthRouter')
const ShopRouter=require('./Router/ShopRouter')
const CartRouter=require('./Router/CartROuter')
const OrderRouter=require('./Router/OrderRouter')
const bodyparser=require('body-parser')
const server=express();
server.use(cors());
server.use(bodyparser.json())
require('dotenv').config
server.get('/',(req,res)=>{
    res.status(200).json({Message:"Server started"})
})
server.use('/api/auth',Authrouter)
server.use('/api/Shop',ShopRouter)
server.use('/api/Cart',CartRouter)
server.use('/api/Order',OrderRouter)
const port =process.env.PORT || 5000
dbconnect().then(()=>{server.listen(port,()=>{
    console.log('server started');
    
    
})})
  