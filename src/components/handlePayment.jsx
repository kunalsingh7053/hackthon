
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Checkout = () => {
  const { currentUser } = useContext(AppContext);
  const [address, setAddress] = useState('');

  const handlePayment = () => {
    if (!address) {
      alert('Please enter your delivery address before placing order.');
      return;
    }

    const options = {
      key: 'YOUR_PUBLIC_KEY_HERE', // ⚠️ Only public key (from Razorpay dashboard)
      amount: 50000, // amount in paise, e.g., ₹500 = 50000
      currency: 'INR',
      name: 'Youthiapa Store',
      description: 'Test Order',
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // Here you can call setOrders / save order to localStorage etc.
      },
      prefill: {
        name: currentUser?.username || 'Guest',
        email: currentUser?.email || '',
      },
      notes: {
        address: address,
      },
      theme: {
        color: '#000000',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Delivery Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Pay & Place Order
      </button>
    </div>
  );
};

export default Checkout;
