import React, { useEffect, useState } from "react";
import { base_URL } from "../Slices/ProductSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = ({ setIsCartOpen }) => {
  const { JwtToken } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = () => {
    fetch(`${base_URL}/api/Cart/GetUserCart`, {
      method: "GET",
      headers: {
        Authorization: JwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.SuccessMessage){
          setCartItems(data.CartData.items)
        }
        if(data.FailureMessage){
          setCartItems([])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = (productId, action) => {
    fetch(`${base_URL}/api/Cart/HandleQuantity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JwtToken,
      },
      body: JSON.stringify({ productId: productId, action: action }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.SuccessMessage) {
          fetchCart();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateSubtotal = () => {
    let sum = 0;
    cartItems?.forEach((value) => {
      sum += value.TotalPrice;
    });
    return sum;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-gray-900 w-full sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 h-full p-6 overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={() => setIsCartOpen(false)}
          className="absolute top-4 right-4 text-white text-xl hover:text-red-500"
        >
          ✖
        </button>

        <h1 className="text-3xl font-bold mb-8 text-gray-200">Your Cart</h1>

        {/* Cart Items */}
        <div className="space-y-6">
          {cartItems?.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-950 p-4 rounded-lg"
            >
              <img
                src={item.productId.bigimage}
                alt={item.productId.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="ml-4 flex-grow">
                <h2 className="text-xl font-semibold text-gray-300">
                  {item.productId.name}
                </h2>
                <p className="text-gray-400">PKR {item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.productId._id, "decrease")
                  }
                  className="bg-gray-600 text-white w-8 h-8 rounded hover:bg-gray-700"
                >
                  -
                </button>
                <span className="text-gray-300 px-2">{item.Quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.productId._id, "increase")
                  }
                  className="bg-gray-600 text-white w-8 h-8 rounded hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-200">Subtotal</h3>
            <p className="text-xl font-semibold text-gray-100">
              PKR {calculateSubtotal()}
            </p>
          </div>
        </div>

        {/* Checkout */}
        <button
          onClick={() => {
            setIsCartOpen(false);
            navigate("/Checkout");
          }}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
