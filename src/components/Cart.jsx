import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { currentUser, removeFromCart, changeQuantity } = useContext(AppContext);
  const navigate = useNavigate();

  const cart = currentUser?.cart || [];

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="mt-2 px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="mt-[50px] container mx-auto px-4 pt-12 pb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
        Your Cart
      </h1>

      <div className="flex flex-col gap-6">
        {cart.map((item, idx) => (
          <div
            key={`${item.id}-${item.size}-${idx}`}
            className="flex flex-col sm:flex-row items-center bg-white shadow rounded-lg p-4"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
            </div>

            <div className="flex-1 sm:ml-5 mt-3 sm:mt-0 w-full">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">{item.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="text-gray-500 text-xs mb-2">Size: <span className="font-medium">{item.size}</span></p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => changeQuantity(item.id, item.size, -1)}
                  className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => changeQuantity(item.id, item.size, 1)}
                  className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-100"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="ml-4 text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="mt-3 sm:mt-0 sm:ml-auto font-semibold text-gray-900">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <span className="text-xl font-bold text-gray-800">Total: ₹{total}</span>
       <button
  onClick={() => navigate('/checkout')}
  className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
>
  Proceed to Checkout
</button>

      </div>
    </div>
  );
};

export default Cart;
