import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Checkout = () => {
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const cart = currentUser?.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [error, setError] = useState('');

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      setError('Please enter your delivery address.');
      return;
    }
    setError('');
    alert(`✅ Order placed successfully!\nTotal: ₹${total}\nPayment method: ${paymentMethod}`);
    navigate('/products');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="mb-4">
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between mb-2">
              <div>
                <p>{item.title} <span className="text-xs text-gray-500">({item.size})</span></p>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
              <p>₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-semibold border-t pt-4 mb-6">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            placeholder="Enter your delivery address"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Credit / Debit Card</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handlePlaceOrder}
          disabled={!address.trim()}
          className={`w-full py-2 rounded ${
            address.trim() ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
