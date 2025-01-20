import React from 'react'
import { useState } from 'react'
const NewArrival = () => {
    const [priceRange, setpriceRange] = useState([35,90])
  return (
    <div>
       <div className='h-[350px]     ml-14 mr-14  flex items-center justify-center ' style={{backgroundImage:'url("https://bonanzasatrangi.com/cdn/shop/collections/new-arrivals.jpg?v=1732694274")',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%' }}>
        <h1 className='text-[30px] text-gray-300 font-bold '></h1>

</div>
    <div className="flex flex-col md:flex-row p-4 ml-10 mr-10 ">
       
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 p-4 border-r">
        <h2 className="text-2xl font-bold mb-4 text-gray-300">SHOP</h2>
        <button className="text-sm text-blue-500 mb-4">Clear All</button>
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-gray-200">PRODUCT TYPE</h3>
          <ul>
            <li className='text-gray-400'><input type="checkbox"  /> Tops</li>
            <li className='text-gray-400'><input type="checkbox" /> Pants</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-gray-300">SIZE</h3>
          <ul>
            <li className='text-gray-400'><input type="checkbox" /> S</li>
            <li className='text-gray-400'><input type="checkbox" /> M</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-gray-300">COLOR</h3>
          <ul>
            <li className='text-gray-400'><input type="checkbox" /> Black</li>
            <li className='text-gray-400'><input type="checkbox" /> White</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-gray-300">PRICE</h3>
          <input
            type="range"
            min="35"
            max="590"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([35, e.target.value])}
            className="w-full"
          />
          <p>${priceRange[0]} - ${priceRange[1]}</p>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="w-full md:w-3/4 p-4">
        <div className="flex justify-between items-center mb-4 text-white">
          <p>Showing 1–9 of 108 results</p>
          <select className="border rounded p-2 bg-black text-white">
            <option>Default</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="border p-4 flex flex-col items-center">
              <img src="/path/to/image.jpg" alt="Product" className="mb-4" />
              <h3 className="text-lg font-bold text-gray-300">Product Name</h3>
              <p className="text-sm text-gray-200 mb-2">$100</p>
              <button className="bg-white text-black px-4 py-2 mt-auto">SELECT OPTIONS</button>
            </div>
          ))}
        </div>
      </main>
    </div>
    </div>
  )
}

export default NewArrival
