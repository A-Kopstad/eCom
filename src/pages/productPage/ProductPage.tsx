// ProductPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/apiCalls'; 
import { Product } from '../../types/productTypes'; 
import { useShoppingCart } from '../../context/cart';
import "./productPage.scss";

function ProductPage() {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    //addItem function from the ShoppingCartContext
    const { addItem } = useShoppingCart();
  
    useEffect(() => {
      const loadProduct = async () => {
        if (!productId) {
          setError('Product ID is not available.');
          setLoading(false);
          return;
        }
  
        try {
          const response = await fetchProductById(productId);
          if (!response) {
            setError('Product not found.');
            return;
          }
          setProduct(response.data);
        } catch (err) {
          setError('Error fetching product.');
        } finally {
          setLoading(false);
        }
      };
  
      loadProduct();
    }, [productId]);
  
    // Return loading or error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    // Handle adding product to cart
    const handleAddToCart = () => {
      if (product) {
        const cartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          discountedPrice: product.discountedPrice,
          quantity: 1,
          image: {
            url: product.image.url,
            alt: product.image.alt,
          },
        };
  
        addItem(cartItem);
      }
    };
  
  
    // Render product details
    return (
      <div className="container mt-4">
          <div className="row">
              <div className="col-md-6">
                  <img 
                      src={product?.image?.url} 
                      alt={product?.image?.alt || 'Product Image'} 
                      className="img-fluid rounded shadow product-img" 
                  />
              </div>
              <div className="col-md-6">
                  <h1>{product?.title || 'Product Title'}</h1>
                  <p className="fs-5">{product?.description || 'No description available.'}</p>
                  <p className="fs-5">
                      Price: 
                      {product?.price && product?.discountedPrice ? (
                          product.discountedPrice < product.price ? (
                              <>
                                  <span className="text-decoration-line-through">
                                      ${product.price.toFixed(2)}
                                  </span>
                                  <div>
                                      ${product.discountedPrice.toFixed(2)}
                                  </div>
                              </>
                          ) : (
                              <span>${product.discountedPrice.toFixed(2)}</span>
                          )
                      ) : (
                          <span>Price not available</span>
                      )}
                  </p>
                  <p className="fs-5">
                      Rating: <span className='fs-5'>{product?.rating !== undefined ? product.rating : 'N/A'}</span>
                  </p>
                  <button 
                      className="btn btn-primary mt-3" 
                      onClick={handleAddToCart}
                  >
                      Add to Cart
                  </button>
              </div>
          </div>
          <hr />
          <p className='fs-4'>Tags:</p>
          <ul className="list-inline">
              {product?.tags?.map((tag: string, index: number) => (
                  <li key={index} className="list-inline-item">
                      <span className="badge bg-secondary">{tag}</span>
                  </li>
              ))}
          </ul>
          <p className='fs-4'>Reviews:</p>
          {product?.reviews?.length ? ( 
              <ul className="list-unstyled">
                  {product.reviews.map((review) => ( 
                      <li key={review.id} className="mb-4 review-item">
                          <div className="border p-3 rounded">
                              <p className='fs-5'>{review.username}:</p> 
                              {review.description} (Rating: {review.rating})
                          </div>
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No reviews available.</p>
          )}
      </div>
  );
}
  
  export default ProductPage;