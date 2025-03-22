import { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
     <h1>Hello this is Admin pannel</h1>
    </>
  )
}

export default App
