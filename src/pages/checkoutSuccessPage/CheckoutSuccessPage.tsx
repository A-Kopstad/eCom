
import { Link } from 'react-router-dom';

function CheckoutSuccessPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 text-center">
    <div>
      <h1 className="mb-4">Checkout Successful!</h1>
      <p>Thank you for your purchase!</p>
      <p>Your order has been confirmed, and we will send you a confirmation email shortly.</p>
      <Link to="/" className="btn btn-primary mt-4">
        Continue Shopping
      </Link>
    </div>
  </div>
  );
}

export default CheckoutSuccessPage;
