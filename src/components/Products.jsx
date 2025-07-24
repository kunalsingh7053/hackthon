import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { products, addToCart } = useContext(AppContext);
  const navigate = useNavigate();

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

  const clearFilters = () => {
    setSearch('');
    setPriceRange([0, 2000]);
    setSizeFilter('');
    setMinRating(0);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesSize = sizeFilter ? p.size === sizeFilter : true;
    const randomRating = Math.random() * 1.5 + 3.5;
    const matchesRating = randomRating >= minRating;
    return matchesSearch && matchesPrice && matchesSize && matchesRating;
  });

  return (
    <div className="mt-20 container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-gray-800">
        Our Collection
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="md:w-1/4 bg-white shadow rounded-lg p-3">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-semibold">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-xs text-blue-600 hover:underline"
              title="Clear All Filters"
            >
              Reset
            </button>
          </div>

          {/* Search */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Price range */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-1">Price Range</label>
            <div className="flex gap-1">
              <input
                type="number"
                value={priceRange[0]}
                onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-1/2 border border-gray-300 rounded px-1 py-0.5 text-xs"
                placeholder="Min"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-1/2 border border-gray-300 rounded px-1 py-0.5 text-xs"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Size */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-1">Size</label>
            <select
              value={sizeFilter}
              onChange={e => setSizeFilter(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="">All Sizes</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          {/* Rating */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm mb-1">Min Rating</label>
            <select
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={0}>All</option>
              <option value={3.5}>3.5+</option>
              <option value={4}>4+</option>
              <option value={4.5}>4.5+</option>
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="mt-1 w-full bg-gray-100 text-gray-700 py-1.5 rounded text-sm hover:bg-gray-200 transition"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Products */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found for selected filters.</p>
          ) : (
            filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg opacity-0 animate-fadeIn"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-60 object-contain mb-4 transition-transform duration-300 hover:scale-105"
                />
                <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between mb-3">
                  <span className="font-semibold">₹{product.price}</span>
                  <span className="text-yellow-500">★ {(Math.random() * 1.5 + 3.5).toFixed(1)}</span>
                </div>
                <select
                  value={selectedSizes[product.id] || ''}
                  onChange={(e) => handleSizeChange(product.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 mb-2 text-sm transition-colors duration-300"
                >
                  <option value="">Select Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!selectedSizes[product.id]}
                  className={`w-full py-2 rounded transition-colors duration-300 ${
                    selectedSizes[product.id]
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="mt-2 text-sm text-blue-600 hover:underline transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
