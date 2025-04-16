const express=require('express');
const Router=express.Router()

const OrderCOntroller=require('../Controller/OrderCOntroller');
const AuthenticatedUser = require('../Middleware/AuthenticatedUser');
Router.route('/CreateOrder').post(AuthenticatedUser,OrderCOntroller.CreateOrder)
Router.route('/LatestOrder').get(AuthenticatedUser,OrderCOntroller.LatestOrder)
module.exports=Router