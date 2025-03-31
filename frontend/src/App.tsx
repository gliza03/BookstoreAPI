import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Books from './Books'
import CategoryFilter from './CategoryFilter'

function App() {
  const [count, setCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  return (
    <>
    <h1>Amaze Books!</h1>
    <div className="row">
      <h1>Amaze Books!</h1>
    </div>
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
