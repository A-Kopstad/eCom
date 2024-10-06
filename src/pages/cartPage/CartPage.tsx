
import { useShoppingCart } from '../../context/cart';
import { Link } from 'react-router-dom';
import "./cartPage.scss"


const CartPage = () => {
  const { cartItems, removeItem, totalAmount, resetCart } = useShoppingCart();

  // Handle removing an item
  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  // Handle resetting the cart
  const handleResetCart = () => {
    resetCart();
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
    <h1 className="text-center mb-4">Shopping Cart</h1>
    {cartItems.length === 0 ? (
      <div className="text-center">
        <h4>Your cart is empty.</h4>
      </div>
    ) : (
      <>
        <div className="row w-100">
          {cartItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100">
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  className="card-img-top product-img"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Price: ${item.discountedPrice.toFixed(2)}</p>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-warning my-2 " onClick={handleResetCart}>
              Clear Cart
            </button>
        <div className="text-center mt-4">
          <h4>Total Price: ${totalAmount.toFixed(2)}</h4>
          <span>
            <Link to="/checkout-success" className="btn px-4 btn-success mt-4" onClick={handleResetCart}>
              Checkout
            </Link>
           
          </span>
        </div>
      </>
    )}
  </div>
  );
};

export default CartPage;
