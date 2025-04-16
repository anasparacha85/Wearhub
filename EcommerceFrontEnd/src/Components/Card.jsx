import React from "react";
import Aos from "aos";
import { useEffect } from "react";
import 'aos/dist/aos.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/Auth";
import { useSelector } from "react-redux";

const Card = ({ image, title, price, category ,sizes= ["XL", "L", "M", "S", "XS"],colors= ["#000000", "#008000", "#FF0000", "#FFFFFF"],id }) => {
  const navigate=useNavigate()
   const {isAdminSignupOpen,isSignupOpen,isloginopen,setSignupOpen,setisAdminSignupOpen,setisloginopen,jwttoken}=useAuth()
   const JwtToken=useSelector((state)=>state.auth.JwtToken)
   
   
   colors= ["#000000", "#008000", "#FF0000", "#FFFFFF"]
  useEffect(()=>{
    Aos.init()
  },[])

  
  const onclick=() =>{
   
      if(!JwtToken){
        setisloginopen(true)
      }
      else{
      navigate(`/productsdetail/${id}`, {state:{from:window.location.pathname}})
      }

    
  }
 
  return (
    <div className="bg-gray-950 rounded-lg shadow-md p-4 w-[130%] md:w-auto"data-aos="zoom-in-left  " data-aos-duration="3000" >
      <img
        src={image}
        alt={title}
        className="w-full h-80  rounded-md "
        style={{objectFit:'100% 100%'}}
      />
      <p className="text-sm text-gray-200 mt-2">{category}</p>
      <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
      <p className="text-red-500 font-bold mt-1">${price}</p>

      {/* Sizes */}
      <div className="flex gap-2 mt-3">
        {sizes.map((size) => (
          <button
            key={size}
            className="border text-gray-200 border-gray-300 rounded-md px-2 py-1 text-sm hover:bg-gray-100 hover:text-gray-900"
          >
            {size}
          </button>
        ))}
      </div>

      {/* Add to Cart */}
      <div className="flex gap-3 mt-3">
        <button className="text-gray-100 bg-red-700 py-2 px-4 rounded-[30px]  hover:bg-red-600 cursor-pointer" onClick={onclick}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
