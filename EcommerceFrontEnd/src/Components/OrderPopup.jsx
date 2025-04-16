import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { base_URL } from '../Slices/ProductSlice'

const OrderPopup = ({ShowModal,setShowModal}) => {
const [latestOrder, setlatestOrder] = useState({})
const {JwtToken}=useSelector((state)=>state.auth)


   
  const fetchlatestorder=()=>{
  
  
  fetch(`${base_URL}/api/Order/LatestOrder`,{
    method:'GET',
    headers:{
      "Authorization":JwtToken
    }
  }).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data);
    if(data.SuccessMessage){
    setlatestOrder(data.order)
    }
    
  }).catch((error)=>{
    console.log(error);
    
  })
  }
  useEffect(()=>{
    fetchlatestorder()
  },[ShowModal])

    if(!ShowModal) return null
  return (
   
      
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 z-50">
    <div className="bg-gray-700 text-white p-6 rounded-xl w-[90%] md:w-[500px]">
      <h2 className="text-xl font-bold mb-4">✅ Order Confirmed</h2>
      <p><strong>Order ID:</strong> {latestOrder._id}</p>
      <p><strong>Total:</strong> Rs. {latestOrder.SubTotal}</p>
      <p><strong>Shipping to:</strong> {latestOrder.FullName}, {latestOrder.Address}, {latestOrder.City}</p>
      
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Items:</h3>
        {latestOrder.items.map(item => (
          <div key={item._id} className="mb-1">
            • {item.productId.name} × {item.Quantity} — Rs. {item.TotalPrice}
          </div>
        ))}
      </div>

      <button onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-700">
        Close
      </button>
    </div>
 


    </div>
  )
}

export default OrderPopup
