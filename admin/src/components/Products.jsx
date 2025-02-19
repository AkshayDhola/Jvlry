import React , { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Products() {
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
            } 
        };
        fetchData();
    }, []);
    function gotoProduct(_id){
        navigate(`/product/${_id}`);  
    };
  return (
    <div className='w-full h-screen pt-24 px-6'>
        <div className="grid grid-cols-3 grid-rows-3 gap-y-20 gap-x-10 w-full">
    {data.map((e, i) => {
        return (
          <div
            key={i}
            className="flex gap-1"
           
          >
            <img
              className="w-[231px] h-[234px] cursor-pointer object-cover rounded"
              src={e.img}
              key={e._id}
            />
            <div className='w-full p-4 flex flex-col justify-between'>
                <div>
                    <p className="n text-[1vw] pb-2">{e.title}</p>
                    <p className="n text-md">${e.price}</p>
                </div>
                <div className='w-full justify-between flex'>
                    <button  onClick={() => gotoProduct(e._id)} className='text-green-600/50'>edit</button>
                    <button className='text-red-600/50'>delete</button>
                </div>
            </div>
          </div>
        );
      })}
      </div>
  </div>
  )
}

export default Products
