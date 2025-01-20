import React, { useState } from "react";

const Cart = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Kurta",
      price: 3000,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Shalwar",
      price: 2000,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
  ]);

  // Handle quantity changes
  const handleQuantityChange = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // Calculate subtotal
  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
console.log(calculateSubtotal());

  return (
    <div className=" text-gray-100 min-h-screen p-4 md:p-8 ">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {/* Cart Items */}
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-gray-950 p-4 rounded-lg"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg"
              />
              {/* Product Details */}
              <div className="ml-4 flex-grow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-400">PKR {item.price}</p>
              </div>
              {/* Quantity Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(item.id, "decrease")}
                  className="bg-gray-700 w-10 h-10 flex items-center justify-center rounded-lg"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, "increase")}
                  className="bg-gray-700 w-10 h-10 flex items-center justify-center rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal Section */}
        <div className="mt-8 p-4 bg-gray-950 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Subtotal</h3>
            <p className="text-xl font-semibold">PKR {calculateSubtotal()}</p>
          </div>
        </div>

        {/* Checkout Button */}
        <button className="mt-6 bg-gray-900 text-white py-3 px-6 w-full rounded-lg font-bold hover:bg-gray-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
