import React from 'react'
import { useState,useEffect } from 'react'
import Card from '../Components/Card'
import { ClipLoader } from 'react-spinners'
import { useAuth } from '../Store/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { fetchwommensCollection } from '../Slices/ProductSlice'

const MainWomensColection = () => {
  const dispatch=useDispatch()
   const productsState = useSelector((state) => state.products );
   
     const { products, isLoading, error } = productsState;

  const reduxState = useSelector((state) => state);
  console.log("Redux State:", reduxState);
    useEffect(() => {
      dispatch(fetchwommensCollection())
    
      
    }, [dispatch])
 
    
  return (
    <div className=" min-h-screen p-6">
    {/* Header */}
    <header className="text-center my-6">
      <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
      <p className="text-gray-600 mt-2">Explore our range of products and services for your fitness journey</p>
    </header>

    {/* Product Grid */}
    {isLoading?(<div className='flex justify-center items-center mt-40'><ClipLoader color="white" loading={isLoading} size={50} /></div> ):(
    <div className="md:grid flex flex-col md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {products.map((items) => (
        <Card key={items._id} title={items.name} id={items._id}  category={items.Category} price={items.price} image={items.bigimage}/>
      ))}
    </div>)}
  </div>
  )
}

export default MainWomensColection
