const express=require('express')
const Router=express.Router()

const CartController=require('../Controller/CartController')
const AuthenticatedUser = require('../Middleware/AuthenticatedUser')
Router.route('/AddToCart').post(AuthenticatedUser,CartController.AddtoCart)
Router.route('/GetUserCart').get(AuthenticatedUser,CartController.FetchUserCart)
Router.route('/HandleQuantity').post(AuthenticatedUser,CartController.handlequantity)
module.exports=Router