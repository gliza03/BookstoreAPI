import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Books from './Books'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Books />
    </>
  )
}

export default App
