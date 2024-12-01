import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Catalog() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/jevlry');
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } 
        };
        fetchData();
    }, []);

    const gotoProduct = (id) => {
      navigate(`/product/${id}`);
    };




  return (
    <>
        <div className='w-full h-[50vh] pt-[7rem] px-6 flex flex-col gap-5'>
            <h2 className='text-2xl'>Catalog</h2>
            <div className='flex gap-2 pb-[16vh] border-b border-zinc-400/50'>
                {["all products","anklet","bracelet","earrings","necklace","ring","set"].map((e,i)=>{
                    return <button key={i} className='px-9 py-2 text-[.9vw] uppercase border border-zinc-400/50 rounded-full'>{e}</button>
                })}
            </div>
        </div> 
        <div className='w-full h-screen pt-7 px-6'>
          <div className="grid grid-cols-5 grid-rows-3 gap-y-20 w-full">
              {data.map(e => {                 
                  return <div className='flex flex-col gap-1' onClick={() => gotoProduct(e.id)}>
                    <img className='w-[231px] h-[234px] object-cover' src={e.img} key={e.id} /> 
                    <p className='n text-[.9vw]'>{e.title}</p>
                    <p className='n text-[1vw] text-zinc-700/50'>${e.price}</p>
                  </div>
                    
              })}
            </div>
        </div>
    </>
  )
}

export default Catalog
