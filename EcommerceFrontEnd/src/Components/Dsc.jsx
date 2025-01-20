import React from "react"
import { useEffect } from "react"
import Aos from "aos"
import "aos/dist/aos.css"
const Dsc = (probs) => {
    useEffect(()=>{
        Aos.init()
    },[])
    return (
      <div data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000" className="   pb-12 pt-12   ">
        <div className="border-l-2 border-gray-400  ">
        <h3 className="lg:text-xl font-bold text-gray-200 font-serif md:text-[8px] sm:text-[6px]">{probs.number}</h3>
        <h3 className="lg:text-xl font-semibold text-gray-300 mt-2 font-serif md:text-[8px] md:mt-0 sm:text-[5px]">{probs.title}</h3>
        <p className="text-gray-100 lg:mt-4 lg:text-lg font-serif md:text-[7px] md:mt-1 sm:text-[4px] sm:mt-[2px]">{probs.description}</p>
        </div>
       
      </div>
    )
  }
  
  export default Dsc