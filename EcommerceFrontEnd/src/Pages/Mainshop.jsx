import React, { useMemo } from 'react'
import { useState,useEffect } from 'react'
import Card from '../Components/Card';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../Store/Auth';

const Mainshop = ({productss,isLoading,filteredprodocust}) => {
   
   
//     const onchange=(e)=>{
// setselecteditem(e.target.value)
//     }


console.log('main',productss);


console.log('bhai',filteredprodocust);


  return (
    <div className=" min-h-screen p-6">
    {/* Header */}
    <header className="text-center my-6">
      <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
      <p className="text-gray-600 mt-2">Explore our range of products and services for your fitness journey</p>
    </header>
    {/* <li className='text-gray-400'>
                <input type="radio" value="Khaadi" checked={selecteditem==="Khaadi"} onChange={onchange} on />
                {' '}Khaadi
              </li> */}

    {/* Product Grid */}
    {isLoading?(<div className='flex justify-center items-center mt-40 '><ClipLoader color='white' size={50} loading={isLoading}/> </div>):(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {productss.map((items) => (
        <Card key={items._id} title={items.name} id={items._id}  category={items.Category} price={items.price} image={items.bigimage}/>
      ))}
    </div>
    )}
  </div>
  )
}

export default Mainshop
