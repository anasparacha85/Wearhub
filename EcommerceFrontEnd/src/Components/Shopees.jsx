import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css' 

const Shopees = ({imagsrc,title,paragraph}) => {
    useEffect(()=>{
        Aos.init()
    },[])
  return (
    <div className="flex lg:h-[600px]  p-6 md:h-[400px] sm:h-[340px]" style={{backgroundColor:' rgb(20, 23, 23)'}}>
    {/* Left div with image */}
    <div data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className="lg:w-2/5 lg:h-[500px] mt-10  md:w-[200px] md:h-[300px] sm:w-[160px] sm:h-[200px]" >
      <img 
        src={imagsrc}
        alt="Placeholder" 
        className="w-full h-full object-cover rounded-lg"
        style={{borderRadius:' 0% 100% 0% 100% / 100% 100% 0% 0%', mixBlendMode:'color-dodge'}}
      />
    </div>
    
    {/* Right div with text */}
    <div data-aos="fade-left"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" className="lg:w-1/2 flex flex-col justify-center pl-6 md:w-[400px] sm:w-[300px]">
      <h4 className="lg:text-lg font-medium text-gray-400 md:text-[8px] sm:text-[6px]">{title}</h4>
      <h2 className="lg:text-4xl font-bold text-gray-100 mt-2 Font-Nerko md:text-[24px] sm:text-[15px]">{paragraph}</h2>
     <button className="mt-6 lg:ml-72 lg:pt-2 lg:w-28 lg:text-[14px] lg:pl-2 lg:pr-2 lg:pb-2 bg-gray-500 text-white  rounded-xl  hover:bg-gray-400 md:ml-36 md:w-20 md:p-1 md:text-[8px] sm:ml-[58px] sm:w-14 sm:p-2 sm:text-[6px] ">
     <Link to='/Collections'>shop Now</Link>
      </button>
    </div>
    </div>
  )
}

export default Shopees
