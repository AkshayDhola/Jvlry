import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Footer from './Footer';
function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await fetch(`http://localhost:3000/api/jevlry/${id}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProductDetails();
    }, [id]);
    if (!product) {
      return <div>Loading...</div>;
    }


    const handleCart = async () => {
      try {
        const response = await axios.post('http://localhost:3000/addtocart', product.id);
        if (response.status === 201) {
          alert("done!")
        } else {
          alert(response.statusText);
        }
      } catch (err) {
        alert(err);
      }
    };

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
            <button onClick={()=>handleCart()} className='px-11 py-2 text-[.8vw] uppercase bg-black text-white border border-zinc-400/50 rounded-full'>Add to cart</button>
          </div>
        </div>
    </div>

    <div className='w-full pt-44 flex px-7 py-7'>
    <div className='w-1/3'>
          <img className='w-[40vw] h-screen object-cover' src="https://nidatabba.com/_content/Library/img/item/item-discover-mystery-of-mexico-1.jpg" alt="" />
      </div>
      <div className='w-3/5 px-11 h-screen flex flex-col gap-32 justify-center'>
        <h5 className='n text-3xl'>Experience the vivacity of Mexico and wear its elegance proudly with Jvlry Jewelry's Mexican Collection. Explore our unique pieces and let the soul of Mexico become a part of your personal style.</h5>
        <img className='w-[50vw] h-4/5 object-cover' src="https://nidatabba.com/_content/Library/img/item/item-discover-mystery-of-mexico-2.jpg" alt="" />
      </div>
      
    </div>

    <Footer/>
    </>
  )
}

export default Product
