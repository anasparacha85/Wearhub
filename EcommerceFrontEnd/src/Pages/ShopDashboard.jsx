import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mainshop from "./Mainshop"; // Ensure this is correctly imported
import { useAuth } from "../Store/Auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchproduct } from "../Slices/ProductSlice";
const ShopDashboard = () => {
  const [priceRange, setPriceRange] = useState([25, 590]);
 

  const [selecteditem, setselecteditem] = useState(""); // Now stores selected brand as a string
  const dispatch=useDispatch()
 const {products,isLoading,error}=useSelector((state)=>state.products)

  // Function to handle radio button selection
  const onchange = (e) => {
    setselecteditem(e.target.value); // Store the selected brand name
  };
    // Fetch products on component mount
    useEffect(() => {
      dispatch(fetchproduct());
    }, [dispatch]);

  // Fetch all products from API
  

  // Filter products based on selected brand
  const filteredprodocust = products.filter(
    (product) => selecteditem === "" || product.brand === selecteditem
  );

  return (
    <div>
      {/* Header Section */}
      <div
        className="h-[350px] ml-14 mr-14 flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-vector/abstract-dark-sales-background_52683-31614.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <h1 className="text-[30px] text-gray-300 font-bold">Shop Dashboard</h1>
      </div>

      <div className="flex flex-col md:flex-row p-4 ml-10 mr-10">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 p-4 border-r">
          <h2 className="text-2xl font-bold mb-4 text-gray-300">SHOP</h2>
          <button
            className="text-sm text-blue-500 mb-4"
            onClick={() => setselecteditem("")} // Clear filter
          >
            Clear All
          </button>

          {/* Filter by Brands */}
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-gray-200">FILTER BY BRANDS</h3>
            <ul>
              {["Saya", "Bonanza", "Khaadi", "j."].map((brand) => (
                <li key={brand} className="text-gray-400">
                  <input
                    name="brand"
                    type="radio"
                    value={brand}
                    checked={selecteditem === brand}
                    onChange={onchange}
                  />{" "}
                  {brand}
                </li>
              ))}
            </ul>
          </div>

          {/* Filter by Size */}
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

          {/* Filter by Color */}
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

          {/* Price Filter */}
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
            <p>Showing {filteredprodocust.length +"  " } products</p>
            <select className="border rounded p-2 bg-black text-white">
              <option>Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Render Products */}
          <Mainshop
            productss={filteredprodocust}
            isLoading={isLoading}
           
            selecteditem={selecteditem}
            setselecteditem={setselecteditem}
           
          />
        </main>
      </div>
    </div>
  );
};

export default ShopDashboard;
