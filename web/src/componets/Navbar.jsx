// src/Navbar.js
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {} from "antd";
import { addQuantity, removeFromCart } from "../redux/cartSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.items);
  const wholeCart = useSelector((state)=>state.cart)
  const {totalQuantity , totalPrice}  = wholeCart
  const dispatch = useDispatch()



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
        <NavLink to="/up">Up-Coming</NavLink>
      </div>
      <div className='text-[1.03vw] italic'>
        <button onClick={() => setIsOpen(true)}>Cart ({cartData.length})</button>
      </div>
      <div className={`absolute w-[30vw] px-5 py-7 h-screen m-3 top-0 right-0 bg-white flex flex-col justify-between ${isOpen?'translate-x-0':'translate-x-[65vh]'} transition-transform ease-in-out duration-500`}>
        <div className='flex justify-between items-center'>
          <p>cart</p>
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        <div className='noScroll h-80 flex flex-col overflow-y-auto'>
        {cartData.map((item, index) => {
            return (
              <div className='w-full flex p-2 gap-2 border-b-[1px] border-zinc-400/50' key={index}>
                <img className='w-28 h-28 object-cover' src={item.img} alt="" />
                <div>
                  <p className='jm text-sm w-32'>{item.title}</p>
                  <div className='flex w-52 justify-between pt-11'>

                  <div className='flex w-20 justify-between items-center overflow-hidden h-6 border border-zinc-400/50 rounded-full'>
                    <h1 className='w-8 text-center font-bold text-[1vw] text-zinc-400/50 hover:cursor-pointer' onClick={()=>dispatch(removeFromCart(item._id))}>-</h1>
                    <p className='w-8 text-center text-[1vw]'>{item.quantity}</p>
                    <h1 className='w-8 text-center font-bold text-[1vw] text-zinc-400/50 hover:cursor-pointer' onClick={()=>dispatch(addQuantity(item._id, totalPrice))}>+</h1>
                  </div>
                  <p className='n'>${item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='flex flex-col gap-2 px-2'>
          <p className='text-[1vw]'>Free shipping within India. </p>
          <p className='text-[1vw]'>This price is inclusive of taxes.</p>
          <p className='text-[1vw]'>Complimentary return within 30 days.</p>
          <div className='flex justify-between items-end pt-3'>
            <h2 className='text-[1.3vw]'>Subtotal</h2>
            <h2 className='n font-bold'>$ {totalPrice}</h2>
          </div>
          <button onClick={handleNavigation} className='px-11 py-2 text-[.8vw] uppercase bg-black text-white border border-zinc-400/50 rounded-full'>Cheackout</button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;