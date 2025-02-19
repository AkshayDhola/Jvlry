import { NavLink } from 'react-router-dom';
import React  from 'react';
function Navbar() {
  return (
    <div className='w-full h-12 px-7 pt-2 flex justify-between items-center fixed top-0 z-50 bg-white'>
      {/* <NavLink to="/" className='jm text-[1.6vw]'>Jvlry</NavLink> */}
      <div className='text-[1.03vw] flex gap-9'>
        <NavLink to="/home">home</NavLink>
        <NavLink to="/products">Procuts</NavLink>
      </div>
    </div>
  )
}

export default Navbar
