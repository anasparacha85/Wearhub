
require('dotenv').config()

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Cart = require("../Model/CartModal");
const User = require('../Model/SignupModel');
const Order = require('../Model/OrderModal');
const nodemailer=require('nodemailer')
const transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'amiranas761@gmail.com',
        pass:'qjuuuxffwofxyzdd'

    }
})

const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const line_items = cart.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.productId.name,
        },
        unit_amount: item.productId.price * 100, // price in cents
      },
      quantity: item.Quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/checkout`,
      customer_email: user.email,
      metadata: {
        userId: user._id.toString(),
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone
      }
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Stripe session creation failed' });
  }
};
const CreateWebhookEvent = async (req, res) => {
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
      return res.status(200).json({ SuccessMessage: "Your order has been placed", order });

    } catch (err) {
      console.error("Order creation failed in webhook:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  res.status(200).send('Webhook received');
};

module.exports={createCheckoutSession}