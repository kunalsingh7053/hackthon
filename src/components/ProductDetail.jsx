import React, { useContext, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(AppContext);

  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');

  // Memoize random rating & reviews so they stay the same on rerender
  const { rating, reviews } = useMemo(() => {
    const randomRating = (Math.random() * 1.5 + 3.5).toFixed(1);
    const randomReviews = Math.floor(Math.random() * 400 + 50);
    return { rating: randomRating, reviews: randomReviews };
  }, [id]);

  const needsSize = product && ['cloths', 'tshirt', 'hoodie', 'cargo'].includes(product.type);

  const handleAddToCart = () => {
    if (needsSize && !selectedSize) {
      alert('Please select a size!');
      return;
    }
    addToCart(product.id, selectedSize);
    alert('Added to cart!');
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 mb-4">Product not found</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="mt-20 container mx-auto px-4 pt-12 pb-8">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto rounded-xl shadow"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500';
            }}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-900 mb-4">₹{product.price}</p>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-lg mr-1">★</span>
            <span className="text-yellow-400 text-lg mr-1">★</span>
            <span className="text-yellow-400 text-lg mr-1">★</span>
            <span className="text-yellow-400 text-lg mr-1">★</span>
            <span className={`text-yellow-400 text-lg ${rating >= 4.8 ? '' : 'opacity-30'}`}>★</span>
            <span className="ml-2 text-gray-600">({rating} • {reviews} reviews)</span>
          </div>

          {/* Size selector only if needed */}
          {needsSize && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Select Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={needsSize && !selectedSize}
            className={`bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition ${
              needsSize && !selectedSize ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
