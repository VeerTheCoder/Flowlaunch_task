import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 400),
    []
  );

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-8 shadow-md rounded-lg overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="w-full h-40 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 truncate">
                {product.title}
              </h2>
              <p className="text-gray-600 mt-2">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedProduct.title}
            </h2>
            <div className="w-full h-64 flex items-center justify-center mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="max-h-full"
              />
            </div>
            <p className="text-gray-600">{selectedProduct.description}</p>
            <p className="mt-4 text-lg font-semibold text-gray-800">
              ${selectedProduct.price}
            </p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
