const express=require('express');
const dbconnect=require('./utils/db')
const cors=require('cors')
const Authrouter=require('./Router/AuthRouter')
const ShopRouter=require('./Router/ShopRouter')
const bodyparser=require('body-parser')
const server=express();
server.use(cors());
server.use(bodyparser.json())

server.use('/api/auth',Authrouter)
server.use('/api/Shop',ShopRouter)
dbconnect().then(()=>{server.listen(5000,()=>{
    console.log('server started');
    
    
})})
  