import React, { useState } from 'react';
import Shopdashboardcover from '../../public/Shopdashboard cover.jpg'
import { Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const ShopDashboard = () => {
  const [priceRange, setPriceRange] = useState([25, 590]);
  const [selectedItem, setSelectedItem] = useState('');
  const navigate = useNavigate();

  const onchange = (e) => {
    const value = e.target.value;
    setSelectedItem(value);
    navigate(`/Shop/${value}`); // Navigate to the specific route
  };

  return (
    <div>
      {/* Header Section */}
      <div
        className="h-[350px] ml-14 mr-14 flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://img.freepik.com/free-vector/abstract-dark-sales-background_52683-31614.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <h1 className="text-[30px] text-gray-300 font-bold">Shop Dashboard</h1>
      </div>

      <div className="flex flex-col md:flex-row p-4 ml-10 mr-10">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 p-4 border-r">
          <h2 className="text-2xl font-bold mb-4 text-gray-300">SHOP</h2>
          <button className="text-sm text-blue-500 mb-4">Clear All</button>

          <div className="mb-6">
            <h3 className="font-bold mb-2 text-gray-200">FILTER BY BRANDS</h3>
            <ul>
              <li className="text-gray-400">
                <input
                  type="radio"
                  value="Saya"
                  checked={selectedItem === 'Saya'}
                  onChange={onchange}
                />{' '}
                Saya
              </li>
              <li className="text-gray-400">
                <input
                  type="radio"
                  value="Bonanza"
                  checked={selectedItem === 'Bonanza'}
                  onChange={onchange}
                />{' '}
                Bonanza
              </li>
              <li className='text-gray-400'>
                <input type="radio" value="Khaadi" checked={selectedItem==="Khaadi"} onChange={onchange} />
                {' '}Khaadi
              </li>
              <li className='text-gray-400'>
                <input type="radio" value="j." checked={selectedItem==="j."} onChange={onchange} />
                {' '}J.
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2 text-gray-300">SIZE</h3>
            <ul>
              <li className="text-gray-400">
                <input type="checkbox" /> S
              </li>
              <li className="text-gray-400">
                <input type="checkbox" /> M
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2 text-gray-300">COLOR</h3>
            <ul>
              <li className="text-gray-400">
                <input type="checkbox" /> Black
              </li>
              <li className="text-gray-400">
                <input type="checkbox" /> White
              </li>
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
            <p className="text-gray-300">
              ${priceRange[0]}00 - ${priceRange[1]}00
            </p>
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

          {/* Outlet for Rendered Routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ShopDashboard;
