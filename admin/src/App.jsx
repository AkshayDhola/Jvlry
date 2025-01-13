import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setToken(response.data.token);
            // localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error("Login failed:", error.response.data);
        }
  };

  return (
    <>
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-2/5 h-4/5 bg-zinc-100/50 p-5'>
        <h2 className='text-xl'>Welcome!</h2>
        <div className='w-4/5 h-4/5 flex justify-start items-end px-3'>
          <h1 className='text-8xl'>JMLRY</h1>
          <h2 className='text-md'>Collections</h2>
        </div>
      </div>
      <form className='w-2/5 h-4/5 p-7 flex justify-start items-start flex-col gap-7' onSubmit={handleSubmit}>
        <h2 className='text-xl'>Log in</h2>
            <input className='w-72 h-9 px-5 py-2 outline-none border-b-[1px] border-zinc-300' gap-3 type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input className='w-72 h-9 px-5 py-2 outline-none border-b-[1px] border-zinc-300' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <input className='w-52 h-9 bg-sky-400/50 outline-none rounded-md border-[1px] border-zinc-300' value="submit" type="submit"/>
    </form>
    </div>
    
    </>
  )
}

export default App
