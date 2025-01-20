import React, { useState } from "react";

const ProductsDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("10");

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className=" text-gray-100 min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div >
            <div className="flex  items-center   justify-around">
                  {/* Thumbnail List */}
              <div className="flex flex-col items-start space-y-4 mt-4 ">
                {Array(4)
                  .fill("")
                  .map((_, idx) => (
                    <img
                      key={idx}
                      src="https://via.placeholder.com/100"
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-20 h-20 rounded-lg cursor-pointer hover:opacity-80"
                    />
                  ))}
              </div>
              {/* Main Image */}
              <img
                src="https://via.placeholder.com/500"
                alt="Product"
                className="w-full h-auto max-w-md rounded-lg"
              />
            
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Kurta</h1>
            <p className="text-green-400 font-semibold text-2xl">PKR 3,000</p>
            <p className="line-through text-gray-400">PKR 5,000</p>
            <p className="text-gray-300 text-sm">
              SKU: EET24695B | Pay in 3 installments of PKR 1,150
            </p>
            <button className="bg-black text-white py-3 px-6 w-full rounded-lg font-bold hover:bg-gray-800 transition">
              ADD TO BAG
            </button>

            {/* Product Options */}
            <div>
              <h3 className="font-bold">Quantity</h3>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="bg-gray-700 w-10 h-10 flex items-center justify-center rounded-lg"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="bg-gray-700 w-10 h-10 flex items-center justify-center rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold">Size</h3>
              <div className="flex items-center space-x-2 mt-2">
                {["8", "10", "12", "14", "16"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 border ${
                      selectedSize === size
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-gray-800 text-gray-300 border-gray-600"
                    } rounded-lg hover:bg-gray-700 transition`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
        {/* Details Section */}
       
          <div className="  rounded-lg">
            <h3 className="text-lg font-bold">Details</h3>
            <p className="text-gray-300 text-sm mt-2">
              A puff-printed flared kurta with scalloped full sleeves, schiffli
              detailing, and a round neck finished with beads.
            </p>
          </div>

       
          </div>
        </div>


        {/* You May Also Like Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(4)
              .fill("")
              .map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 p-4 rounded-lg hover:shadow-lg"
                >
                  <img
                    src="https://via.placeholder.com/200"
                    alt={`Recommended Product ${idx + 1}`}
                    className="w-full rounded-lg"
                  />
                  <h3 className="mt-2 text-lg font-semibold">Product Name</h3>
                  <p className="text-green-400 font-bold">PKR 2,000</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;
