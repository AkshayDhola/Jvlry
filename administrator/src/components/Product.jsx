import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Product() {
    const { _id } = useParams();
    const [product, setProduct] = useState(null);


    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await fetch(`http://localhost:3000/api/jevlry/${_id}`);
            const data = await response.json();
            setProduct(data);        
        };

        fetchProductDetails();
    }, [_id]);
    if (!product) {
      return <div>Loading...</div>;
    }

   
    

  
  return (
    <>
    <div className='w-full h-screen flex gap-5 px-5 py-[17vh]'>
        <div className='w-1/2 flex gap-2'>
          <img className='w-1/2 h-[55vh] object-cover' src={product.img} alt="" />
          <img className='w-1/2 h-[55vh] object-cover' src={product.img.replace(/-(\d+)\.jpg$/, '-2.jpg')} alt="" />
        </div>
        <div className='w-1/2 flex flex-col px-11'>
          <h1 className='jm text-4xl pb-11'>{product.title}</h1>
          <div className='flex justify-between border-y border-zinc-400/50 py-3'>
            <h2>Metal</h2>
            <p className='px-5 py-1 text-[.8vw] uppercase border border-zinc-400/50 rounded-full'>{product.metal}</p>
          </div>
          <div className='flex justify-between border-y border-zinc-400/50 py-3'>
            <h2>Size</h2>
            <div className='flex gap-2'>
            {(product.size.length === 0)?"no":product.size.map((e,i)=>{
              return <p key={i} className='px-5 py-1 text-[.8vw] uppercase border border-zinc-400/50 rounded-full'>{e}</p>
            })}
            </div>
            
          </div>
          <div className='flex pt-[29vh] flex-col gap-2'>
                <p>Free shipping within India. </p>
                <p>This price is inclusive of taxes.</p>
                <p>Complimentary return within 30 days.</p>
          </div>
          <div className='flex justify-between pt-8'>
            <h2 className='n text-[1.4vw] font-semibold'>${product.price}</h2>
          </div>
        </div>
    </div>

    </>
  )
}

export default Product
