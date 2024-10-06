import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/homePage/HomePage';
import ContactPage from './pages/contactPage/ContactPage';
import ProductPage from './pages/productPage/ProductPage';
import CartPage from './pages/cartPage/CartPage';
import CheckoutSuccessPage from './pages/checkoutSuccessPage/CheckoutSuccessPage';
import { ShoppingCartProvider } from './context/cart';

function App() {
  return (
    <ShoppingCartProvider>
    <Router>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          </Route>
        </Routes>
  
    </Router>
    </ShoppingCartProvider>
  );
}

export default App;
