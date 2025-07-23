import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Products = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              
              {/* description - only 2 lines */}
              <p className="text-gray-700 text-sm mb-2 line-clamp-2">{product.description}</p>
              
              <div className="mt-auto text-primary font-bold text-md">₹ {product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
