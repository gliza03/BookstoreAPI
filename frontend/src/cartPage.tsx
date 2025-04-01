import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { CartItem } from "./types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const {cart, removeItem} = useCart();

    return (
        <div>
            <h1>Your cart</h1>
            <div>{cart.length=== 0 ? "Your cart is empty" : ""}</div> <ul>
                {cart.map((item: CartItem) => (
                    <li key={item.bookID}>
                        {item.title} - ${item.price}
                        <button onClick={() => removeItem(item.bookID)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total: ${cart.reduce((acc, item) => acc + item.price, 0)}</h3>
            <button onClick={() => navigate('/')}>Continue Browsing</button>
        </div>
    );
}
export default CartPage;