import { useState } from 'react'
import './App.css'
import Books from './Books'
import CategoryFilter from './CategoryFilter';
import CartSummary from './cartSummary';

function App() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  
    return (
      <>
       <div className="row">
        <h1>Amaze Books!</h1>
        </div>
        <CartSummary />
        <div className="container">
        <div className="row">
            <div className="col-md-3">
            <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
            </div>
            <div className="col-md-9">
            <Books selectedCategories={selectedCategories} />
            </div>
        </div>
        </div>
      
      </>
    )
  }
  
export default App
  
