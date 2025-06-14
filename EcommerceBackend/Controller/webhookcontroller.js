const express=require('express')
require('dotenv').config()
const Stripe=require('stripe')
const Cart = require('../Model/CartModal')
const payment = require('../Model/PaymentModel')
const stripe=Stripe(process.env.STRIPE_SECRET_KEY)
const User=require('../Model/SignupModel')
const Order = require('../Model/OrderModal')
const node=require('nodemailer')

const transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'amiranas761@gmail.com',
        pass:'qjuuuxffwofxyzdd'

    }
})


