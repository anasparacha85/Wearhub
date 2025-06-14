const mongoose=require('mongoose')
const PaymentSchema= new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  amount: Number,
  currency: String,
  status: { type: String, enum: ['paid', 'failed', 'pending'], default: 'pending' },
  transactionId: String,
  paymentIntentId: String,
  paymentMethod: String,
  email: String,
}, { timestamps: true });

const payment=new mongoose.model('Payment',PaymentSchema)
module.exports =payment