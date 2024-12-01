// src/Navbar.js
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
        const response = await fetch(`http://localhost:3000/api/jevlry/cart`);
        const data = await response.json();
        setProducts(data);
    };

    fetchProductDetails();
  },[isOpen]);

  const handleNavigation = () => {
    navigate('/checkout'); 
    setIsOpen(false);
  };

  return (
    <div className='w-full h-12 px-7 pt-2 flex justify-between items-center fixed top-0 z-50 bg-white'>
      <NavLink to="/" className='jm text-[1.6vw]'>Jvlry</NavLink>
      <div className='text-[1.03vw] flex gap-9'>
        <NavLink to="/collection">Collection</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <div className='text-[1.03vw] italic'>
        <button onClick={() => setIsOpen(true)}>Cart (0)</button>
      </div>
      <div className={`absolute w-[30vw] px-5 py-7 h-screen m-3 top-0 right-0 bg-white flex flex-col justify-between ${isOpen?'translate-x-0':'translate-x-[65vh]'} transition-transform ease-in-out duration-500`}>
        <div className='flex justify-between items-center'>
          <p>cart</p>
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        <div>
        {products.length > 0 ? (
                <ul>
                    {products.map(product => (
                        <li>
                            <p>Price: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
        <div className='flex flex-col gap-2 px-2'>
          <p className='text-[1vw]'>Free shipping within India. </p>
          <p className='text-[1vw]'>This price is inclusive of taxes.</p>
          <p className='text-[1vw]'>Complimentary return within 30 days.</p>
          <div className='flex justify-between items-end pt-3'>
            <h2 className='text-[1.3vw]'>Subtotal</h2>
            <h2 className='n font-bold'>$ 0</h2>
          </div>
          <button onClick={handleNavigation} className='px-11 py-2 text-[.8vw] uppercase bg-black text-white border border-zinc-400/50 rounded-full'>Cheackout</button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;