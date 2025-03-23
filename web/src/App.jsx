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
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Upcomes from './componets/Upcomes';
const stripePromise = loadStripe('pk_test_51QlNZkE9sXHqPRmjPTg1PNfhCFOIbl3LETrBugatLFkpJZYs46lCMV60P3EnBpRqe8QCvmXo5uS9oQBPBwkGTy7h00gbRePMy0'); 
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
        <Route path="/up" element={<Upcomes />} />
        <Route path='*' element={<Error/>} />
        <Route path="/user" element={ <Elements stripe={stripePromise}><ProtectedRoute><User /></ProtectedRoute></Elements>} />
      </Routes>
    </Router> 
    </>
  )
}

export default App
