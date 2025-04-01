import { useNavigate } from 'react-router-dom';
import './App.css'
import { useCart } from './context/CartContext';
const cartSummary = () => {
    const navigate = useNavigate();
    const {cart} = useCart(); 
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="cart-summary" onClick={() => navigate('/cart')}>
      <strong>{totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default cartSummary;