const express=require('express')
const { createCheckoutSession } = require('../Controller/StripeController')
const AuthenticatedUser = require('../Middleware/AuthenticatedUser')
const bodyParser = require('body-parser')
const Router=express.Router()
Router.route('/create-checkout-session').post(AuthenticatedUser,createCheckoutSession)

module.exports=Router