// src/components/ProductFilter.jsx
import React from 'react';

const ProductFilter = ({
  filters, setFilters
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {/* Price */}
      <select
        value={filters.price}
        onChange={e => setFilters(prev => ({ ...prev, price: e.target.value }))}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="">All Prices</option>
        <option value="0-500">Under ₹500</option>
        <option value="500-1000">₹500 – ₹1000</option>
        <option value="1000-2000">₹1000 – ₹2000</option>
      </select>

      {/* Size */}
      <select
        value={filters.size}
        onChange={e => setFilters(prev => ({ ...prev, size: e.target.value }))}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="">All Sizes</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      {/* Min rating */}
      <select
        value={filters.minRating}
        onChange={e => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="0">All Ratings</option>
        <option value="3">3★ & up</option>
        <option value="4">4★ & up</option>
        <option value="4.5">4.5★ & up</option>
      </select>

      {/* Sort */}
      <select
        value={filters.sort}
        onChange={e => setFilters(prev => ({ ...prev, sort: e.target.value }))}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Default Sort</option>
        <option value="lowToHigh">Price: Low → High</option>
        <option value="highToLow">Price: High → Low</option>
      </select>
    </div>
  );
};

export default ProductFilter;
