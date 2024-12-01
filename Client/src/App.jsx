import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componets/Navbar'
import Home from './componets/Home'
import Colltion from './componets/Colltion';
import About from './componets/About';
import Catalog from './componets/Catalog';
import Createuser from './componets/Createuser';
import Product from './componets/Product';

function App() {
  return (
    <>
      <Router>
          <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Createuser />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/collection" element={<Colltion />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router> 
    </>
  )
}

export default App
