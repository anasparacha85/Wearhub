import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { base_URL } from '../Slices/ProductSlice';
import OrderPopup from '../Components/OrderPopup';
import { toast } from 'react-toastify';

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

const placeOrder=(e)=>{
  e.preventDefault()
  fetch(`${base_URL}/api/Order/CreateOrder`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':JwtToken
    },
    body:JSON.stringify(form)
  }).then((res)=>{
    
    return res.json()
  }).then((data)=>{
    if(data.SuccessMessage){
      toast.success(data.SuccessMessage)
      setShowModal(true)
    }
    if(data.FailureMessage){
      toast.error(data.FailureMessage)
    }
    console.log(data);
    
  }).catch((error)=>{
    console.log(error);
    toast.error(error.FailureMessage)
    
  })
}
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-800 min-h-screen">
      {/* Cart Summary */}
      <div className="md:col-span-2 bg-gray-900 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">CheckOut Details</h2>
        {/* Example item - map your actual cart items here */}
      {cartItems.map((value)=>(
        <div className="flex items-center flex-col justify-center border-b py-3 text-white">
        <div className="flex items-center gap-4">
         
          <div>
            <p className="font-medium">{value.productId.name}</p>
            <p className="text-sm text-gray-500 text-center">:No of Suits {value.Quantity}</p>
          </div>
        </div>
        <p className="font-semibold text-gray-200">Rs. {value.TotalPrice}</p>
       
      </div>
      ))}
       <p className='font-bold text-gray-200'>Total Price. {calculateSubtotal()}</p>
        
        {/* Repeat above block for each item */}
      </div>

      {/* Checkout Form */}
      <div className="bg-gray-900 rounded-2xl shadow p-6 text-gray-200">
        <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>
        <form onSubmit={placeOrder} className="space-y-4">
          <input type="text" name="address" placeholder="Address" className="w-full p-3  border rounded-xl text-white" onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" className="w-full p-3 border rounded-xl text-white" onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" className="w-full p-3 border rounded-xl text-white" onChange={handleChange} required />

         

          <button  type="submit" className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">Place Order</button>
        </form>
      </div>
      <OrderPopup ShowModal={ShowModal} setShowModal={setShowModal}/>
    </div>
  );
}
