import React from 'react'
import { NavLink } from 'react-router-dom';
function Footer() {
  return (
    <div className='w-full h-screen flex items-end'>
    <div className='w-full h-2/3 bg-black px-5 text-white relative'>
        <div className='absolute bottom-5'>
            <h2 className='text-6xl leading-snug font-thin'>
              City Light Road, <br />
              Behind Science Centre, <br />
              Surat, Gujarat 395007,
            </h2>
        </div>
        <div className='absolute h-full pb-11 right-5 w-1/3 text-white flex flex-col justify-end items-end'>
          <NavLink to="/terms">Terms of Use</NavLink>
          <p>Privacy Policy</p>
          <p>Shipping & Returns</p>
        </div>
    </div>
  </div>
  )
}

export default Footer
