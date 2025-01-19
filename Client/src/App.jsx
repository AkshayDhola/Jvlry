import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componets/Navbar'
import Home from './componets/Home'
import Colltion from './componets/Colltion';
import About from './componets/About';
import Catalog from './componets/Catalog';
import Createuser from './componets/Createuser';
import Product from './componets/Product';
import User from './componets/User';
import ProtectedRoute from "./componets/ProtectedRoute"
import Error from './componets/Error';

function App() {
  return (
    <>
      <Router>
          <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Createuser />} />
        <Route path="/product/:_id" element={<Product />} />
        <Route path="/collection" element={<Colltion />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path='*' element={<Error/>} />
        <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
      </Routes>
    </Router> 
    </>
  )
}

export default App
