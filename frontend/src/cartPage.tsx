import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { CartItem } from "./types/CartItem";
import { useEffect, useState } from "react";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeItem } = useCart();
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    useEffect(() => {
        // Initialize Bootstrap tooltips
        import("bootstrap").then(({ Tooltip }) => {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
        });
    }, [cart]);

    const generateTooltip = (item: CartItem) => {
        const fields = [
            item.author ? `Author: ${item.author}` : null,
            item.category ? `Category: ${item.category}` : null,
            item.pageCount ? `Page Count: ${item.pageCount}` : null,
        ];
        return fields.filter((field) => field !== null).join(", ");
    };

    const handleRemoveItem = (bookID: number, title: string) => {
        removeItem(bookID);
        setAlertMessage(`${title} has been removed`);
        setTimeout(() => setAlertMessage(null), 3000); // Clear the alert after 3 seconds
    };

    return (
        <div>
            <h1>Your cart</h1>
            {alertMessage && (
                <div className="alert alert-warning" role="alert">
                    {alertMessage}
                </div>
            )}
            <div>{cart.length === 0 ? "Your cart is empty" : ""}</div>
            <ul>
                {cart.map((item: CartItem) => (
                    <li key={item.bookID}>
                        <span
                            data-bs-toggle="tooltip"
                            title={generateTooltip(item)}
                        >
                            {item.title} - ${item.price}
                        </span>
                        <button onClick={() => handleRemoveItem(item.bookID, item.title)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total: ${(Math.round(cart.reduce((acc, item) => acc + item.price, 0) * 100) / 100).toFixed(2)}</h3>
            <button onClick={() => navigate('/')}>Continue Browsing</button>
        </div>
    );
}

export default CartPage;