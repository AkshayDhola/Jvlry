import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Footer from './Footer';
const UserForm = () => {
  const [fname, setFName] = useState(''); 
  const [lname, setLName] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [email, setEmail] = useState('');
  const [addre, setAddre] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [CN, setCN] = useState('');
  const [MM, setMM] = useState('');
  const [CVV, setCVV] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, address, email, password };  // Update field names

    try {
      const response = await axios.post('http://localhost:3000/createuser', user);
      if (response.status === 201) {
        navigate('/index');
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
    <div className='w-full h-screen mt-[11vh] px-7 py-7 border-t border-zinc-700/50'>
      <div className='w-2/3'>
          <h2 className='jm text-lg'>Contact Information</h2>       
          <form className='pt-6' onSubmit={handleSubmit}>
            <div className='flex gap-4 pb-5'>
              <input className='n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='First Name*' type="text" value={fname} onChange={(e) => setFName(e.target.value)} required />
              <input className='n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='Last Name*' type="text" value={lname} onChange={(e) => setLName(e.target.value)} required />
            </div>
            <div className='flex gap-4 pb-5'>
              <input className='n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='Phone Number*' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <input className='n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='Email*' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <h2 className='jm text-lg pb-6'>Shipping Address</h2>
            <div className='flex gap-4 pb-5'>
              <input className='n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='Address*' type="text" value={addre} onChange={(e) => setAddre(e.target.value)} required />
              <input className='n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='City*' type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className='flex gap-4 pb-5'>
              <input className='n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='State*' type="text" value={state} onChange={(e) => setState(e.target.value)} required />
              <input className='n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='Zip*' type="text" value={zip} onChange={(e) => setZip(e.target.value)} required />
            </div>
            <h2 className='jm text-lg pb-6'>Payment Information</h2>
            <div className='flex gap-4 pb-5'>
              <input className='n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='Card Number*' type="text" value={CN} onChange={(e) => setCN(e.target.value)} required />
              <input className='n w-[12.5vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='MM/YY' type="text" value={MM} onChange={(e) => setMM(e.target.value)} required />
              <input className='n w-[12.5vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' placeholder='CVV' type="number" value={CVV} onChange={(e) => setCVV(e.target.value)} required />
            </div>
            <button className='n w-[25vw] px-3 py-2 bg-black text-white text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50' type="submit">Pay</button>
        </form>
      </div>    
    </div>
    <Footer/>
    </>
  );
};

export default UserForm;
