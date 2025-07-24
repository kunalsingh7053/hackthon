import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { products, addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  // States for filters
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sizeFilter, setSizeFilter] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id];
    if (size) {
      addToCart(product.id, size);
      alert('Added to cart!');
    } else {
      alert('Please select a size!');
    }
  };

  // Filtered products logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesSize = sizeFilter ? p.size === sizeFilter : true;

    // Random rating for demonstration (better if you store rating with product)
    const randomRating = Math.random() * 1.5 + 3.5;
    const matchesRating = randomRating >= minRating;

    return matchesSearch && matchesPrice && matchesSize && matchesRating;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-gray-800">
        Our Collection
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        />

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Min Rating:</label>
          <select
            value={minRating}
            onChange={e => setMinRating(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value={0}>All</option>
            <option value={3.5}>3.5+</option>
            <option value={4}>4+</option>
            <option value={4.5}>4.5+</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Size:</label>
          <select
            value={sizeFilter}
            onChange={e => setSizeFilter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Price:</label>
          <input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-20 border border-gray-300 rounded px-2 py-1"
          />
          <span>–</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-20 border border-gray-300 rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found for selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-contain mb-4"
              />

              <h2 className="text-lg font-bold mb-1">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>

              <div className="flex justify-between mb-3">
                <span className="font-semibold">₹{product.price}</span>
                <span className="text-yellow-500">★ {(Math.random() * 1.5 + 3.5).toFixed(1)}</span>
              </div>

              <select
                value={selectedSizes[product.id] || ''}
                onChange={(e) => handleSizeChange(product.id, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mb-3"
              >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>

              <button
                onClick={() => handleAddToCart(product)}
                className={`px-4 py-2 rounded ${
                  selectedSizes[product.id]
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
                disabled={!selectedSizes[product.id]}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
