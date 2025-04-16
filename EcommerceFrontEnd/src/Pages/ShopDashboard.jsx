import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproduct } from "../Slices/ProductSlice";
import Mainshop from "./Mainshop";
import { useAuth } from "../Store/Auth";

const ShopDashboard = () => {
  const [priceRange, setPriceRange] = useState([25, 590]);
  const [selecteditem, setselecteditem] = useState("");
  const [showFilters, setShowFilters] = useState(false); // mobile toggle
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchproduct());
  }, [dispatch]);

  const onchange = (e) => {
    setselecteditem(e.target.value);
  };

  const filteredprodocust = products.filter(
    (product) => selecteditem === "" || product.brand === selecteditem
  );

  return (
    <div>
      {/* Hero Header */}
      <div
        className="h-[250px] md:h-[350px] mx-4 md:mx-14 flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-vector/abstract-dark-sales-background_52683-31614.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <h1 className="text-[24px] md:text-[30px] text-gray-300 font-bold">
          Shop Dashboard
        </h1>
      </div>

      <div className="flex flex-col md:flex-row p-4 md:mx-14 gap-6">
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden flex justify-between items-center">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside
          className={`w-full md:w-1/4 p-4 border-r  rounded ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-300">SHOP</h2>
          <button
            className="text-sm text-blue-500 mb-4"
            onClick={() => setselecteditem("")}
          >
            Clear All
          </button>

          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-gray-200">FILTER BY BRANDS</h3>
            <ul>
              {["Saya", "Bonanza", "Khaadi", "j."].map((brand) => (
                <li key={brand} className="text-gray-400">
                  <label className="flex items-center space-x-2">
                    <input
                      name="brand"
                      type="radio"
                      value={brand}
                      checked={selecteditem === brand}
                      onChange={onchange}
                    />
                    <span>{brand}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-gray-300">SIZE</h3>
            <ul>
              {["S", "M"].map((size) => (
                <li key={size} className="text-gray-400">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>{size}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Color Filter */}
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-gray-300">COLOR</h3>
            <ul>
              {["Black", "White"].map((color) => (
                <li key={color} className="text-gray-400">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>{color}</span>
                  </label>
                </li>
              ))}
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
              onChange={(e) =>
                setPriceRange([35, parseInt(e.target.value)])
              }
              className="w-full"
            />
            <p className="text-gray-300 mt-2">
              ${priceRange[0]}00 - ${priceRange[1]}00
            </p>
          </div>
        </aside>

        {/* Products Section */}
        <main className="w-full md:w-3/4 p-4  rounded">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 text-white gap-2">
            <p>Showing {filteredprodocust.length} products</p>
            <select className="border rounded p-2 bg-black text-white">
              <option>Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

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
