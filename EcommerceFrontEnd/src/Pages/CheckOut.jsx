import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { base_URL } from '../Slices/ProductSlice';
import OrderPopup from '../Components/OrderPopup';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
const stripepromise=loadStripe('pk_test_51RPSvD4Dr3uM4C0nbSDcUATQJ7jxWaNpeOeSf3T9zJIyeWHAHnAMUTbUmsoA4wAnRbS1bDaFPn5bbYzMosNqMDuq00r0CcKrZr')
export default function CheckoutPage() {
  const [form, setForm] = useState({
    address: '',
    city: '',
    
    phone: '',
   
  });
const {JwtToken}=useSelector((state)=>state.auth)
 const [cartItems, setCartItems] = useState([
    
  ]);
  const [ShowModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
   
  const fetchCart=()=>{
  
  
  fetch(`${base_URL}/api/Cart/GetUserCart`,{
    method:'GET',
    headers:{
      "Authorization":JwtToken
    }
  }).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data);
    if(data.SuccessMessage){
      setCartItems(data.CartData.items)
    }
    if(data.FailureMessage){
      setCartItems([])
    }
   
    
  }).catch((error)=>{
    console.log(error);
    
  })
  }
  useEffect(()=>{
  fetchCart()
  },[])
  

 
const calculateSubtotal = () =>{
//   cartItems.items?.map(((value)=>{
//    console.log("hello",value.price);
   
    
//   }
// ))
let sum=0
cartItems?.forEach(value=>{
  sum+=value.TotalPrice
  
  
  
})
return sum;


}
useEffect(()=>{
  console.log(
    calculateSubtotal()

  );

},[fetchCart])
const handlePayment = async (e) => {
    e.preventDefault();

    if (!form.address || !form.city || !form.phone) {
      return toast.error('Please fill all fields');
    }

    try {
      const res = await fetch(`${base_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: JwtToken,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (!data.id) {
        return toast.error('Something went wrong');
      }
      

      const stripe = await stripepromise;
      console.log(stripe);
      
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      console.log(result);
      

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Payment failed');
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-800 min-h-screen">
      {/* Cart Summary */}
      <div className="md:col-span-2 bg-gray-900 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">CheckOut Details</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center flex-col justify-center border-b py-3 text-white">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium">{item.productId.name}</p>
                <p className="text-sm text-gray-500 text-center">No of Suits: {item.Quantity}</p>
              </div>
            </div>
            <p className="font-semibold text-gray-200">Rs. {item.TotalPrice}</p>
          </div>
        ))}
        <p className="font-bold text-gray-200 mt-4">Total Price: Rs. {calculateSubtotal()}</p>
      </div>

      {/* Checkout Form */}
      <div className="bg-gray-900 rounded-2xl shadow p-6 text-gray-200">
        <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <input type="text" name="address" placeholder="Address" className="w-full p-3 border rounded-xl text-white" onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" className="w-full p-3 border rounded-xl text-white" onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" className="w-full p-3 border rounded-xl text-white" onChange={handleChange} required />

          <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Pay with Stripe
          </button>
        </form>
      </div>

      <OrderPopup ShowModal={ShowModal} setShowModal={setShowModal} />
    </div>
  );
}