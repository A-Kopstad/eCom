import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../api/apiCalls';
import { Link } from "react-router-dom"; 
import { Product } from '../../types/productTypes'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./home.scss";

function HomePage() { 
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchAllProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter products
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">StoreOne</h1>
      <h2 className="text-center mb-4">Products</h2>
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <img 
                src={product.image.url} 
                alt={product.image.alt || 'Product Image'} 
                className="card-img-top product-img" 
              />
              <div className="card-body">
                <p className="card-title fs-4">{product.title}</p>
                <p className="card-text ">
                  Price: 
                  {product.discountedPrice < product.price ? (
                    <>
                      <span className='text-decoration-line-through'>
                        ${product.price.toFixed(2)}
                      </span>
                      <span className='fs-5 d-block'>${product.discountedPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className='fs-5'>${product.discountedPrice.toFixed(2)}</span>
                  )}
                </p>
                <Link to={`/products/${product.id}`} className="btn btn-primary">View Product</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
