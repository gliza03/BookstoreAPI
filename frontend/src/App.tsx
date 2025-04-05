import { useState } from 'react'
import './App.css'
import Books from './Books'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './homepage'
import CartPage from './cartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './adminBooksPage';

function App() {
  const [selectedCategories] = useState<string[]>([]);

  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/books" element={<Books selectedCategories={selectedCategories} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
      
    </>
  )
}

export default App
