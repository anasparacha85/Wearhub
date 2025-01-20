import React from "react";
import Aos from "aos";
import { useEffect } from "react";
import 'aos/dist/aos.css'
const Card = ({ image, title, price, category ,sizes= ["XL", "L", "M", "S", "XS"],colors= ["#000000", "#008000", "#FF0000", "#FFFFFF"] }) => {
  
   colors= ["#000000", "#008000", "#FF0000", "#FFFFFF"]
  useEffect(()=>{
    Aos.init()
  },[])
  return (
    <div className="bg-gray-950 rounded-lg shadow-md p-4 max-w-sm" data-aos="zoom-in-left  " data-aos-duration="3000" >
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

      {/* Colors */}
      <div className="flex gap-3 mt-3">
        {colors.map((color) => (
          <div
            key={color}
            className={`w-6 h-6 rounded-full cursor-pointer`}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Card;
