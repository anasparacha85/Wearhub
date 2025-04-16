import React, { useEffect, useState } from "react";
import cover from '../../public/cover.jpg'
import cover2 from "../../public/cover2.png"
import cover3 from "../../public/cover3.jpg"
import cover4 from  "../../public/cover4.jpg"

const ImageSlider = () => { 
  const images = [
    cover,cover2,cover3,cover4
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to the previous image
  const timeoutid=setTimeout(()=>{
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    
    setCurrentIndex(newIndex);
   
    
    
  },8000)
  
  
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Navigate to the next image
  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
   
  };
  
  
  return (
    <div className="relative w-screen mx-auto h-[700px] overflow-hidden ">
      {/* Image Container */}
      <div className="relative h-[650px] md:h-96 bg-gray-200">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="md:w-full w-screen h-[650px]  object-cover  transition-transform duration-500"
        />
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        onClick={()=>{clearTimeout(timeoutid); goToNext()}}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
      >
        &#10095;
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-72 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-gray-500" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
