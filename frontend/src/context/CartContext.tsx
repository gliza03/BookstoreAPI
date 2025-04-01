import React from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (bookID: number) => void;
    clearCart: () => void;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = React.useState<CartItem[]>([]);

    const addItem = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.bookID === item.bookID);
            const updatedCart = prevCart.map((cartItem) => 
                cartItem.bookID === item.bookID ? { ...cartItem, price: cartItem.price + item.price } : cartItem
            );
            return existingItem ? updatedCart : [...prevCart, item];
        });
    };

    const removeItem = (bookID: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.bookID !== bookID));
    };

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};