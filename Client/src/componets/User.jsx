import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch ,useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import easyinvoice from "easyinvoice";

function User() {
  const [data, setData] = useState([]);
  const cartData = useSelector((state) => state.cart.items);
  const dispatch = useDispatch()
  const stripe = useStripe();
  
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
  
    const token = localStorage.getItem('token');
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.user);   
         
                      
      } catch (error) {
        console.error("Error fetching data:", error); 
      } 
    };
    
    fetchData();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      // Create payment intent on the server
      const { data } = await axios.post('http://localhost:3000/create-payment-intent', {
        amount: 1000, 
      });
      console.log(data);
      
      const clientSecret = data.clientSecret;

      // Confirm card payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // const url = window.URL.createObjectURL(new Blob(data));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `invoice-${invoiceId}.pdf`);
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      if (error) {
        setMessage(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setMessage('Payment successful!');
      }
    } catch (error) {
      setMessage('Error processing payment.');
      console.error(error);
    }

    setIsLoading(false);
    
  };

  const generateInvoice = async () => {
    const invoicedata = {
      "api":"free",
      "mode": "development",
      "documentTitle": "INVOICE", // Defaults to INVOICE
      "currency": "USD",
      "taxNotation": "vat", 
      images: {
        logo: "https://i.pinimg.com/474x/35/e7/a3/35e7a32a17772ba22991f768d3d1de7b.jpg",
        background: "https://i.pinimg.com/474x/2c/8b/39/2c8b39b15db1f5dcab6566e56b5b099b.jpg"
      },
      "marginTop": 50,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
      "sender": {
        "company": "Jmlary",
        "address": "Nandani Resdenicy, Nr. Ramvatika Society",
        "zip": "39150",
        "city": "Surat",
        "country": "India"
      },
      "client": {
        "company": data.name,
        "address": data?.billingAddress?.street,
        "zip": data?.billingAddress?.postalCode,
        "city": data?.billingAddress?.city,
        "country": "India"
      },
      "invoiceNumber": "1",
      "invoiceDate": "2025-02-09",
      "products": [...cartData.map(e=>{
        return  {
          quantity: e.quantity,
          description: e.title,
          taxRate: 6,
          price: e.price
        }
      })],
      "bottomNotice": "Thank you for your purchase!"
    };

    easyinvoice.createInvoice(invoicedata, function (result) {
      // The response will contain a base64 encoded PDF file
      console.log('PDF base64 string: ', result.pdf);
      const link = document.createElement("a");
      link.href=`data:application/pdf;base64,${result.pdf}`;
      link.download="invoice.pdf";
      link.style.display="none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      
  });
  };



  return (
    <div className='w-full h-fit py-11 bg-red-100 pt-11'>
      <h1>User Data</h1>
      <h1>{data._id}</h1>
      <h1>{data.name}</h1>
      <h1>{data.email}</h1>
      <h1>{data.password}</h1>
      <h1>{data.cart}</h1>
      <h1>{data.orders}</h1>
      <h1>{data.picture}</h1>
      <h1>{data.cardNumber}</h1>

      <h1>{data.expirationDate}</h1>
      <h1>{data.cvv}</h1>
     <h1>{data?.billingAddress?.city}</h1>
     <h1>{data?.billingAddress?.state}</h1>
     <h1>{data?.billingAddress?.street}</h1>
     <h1>{data?.billingAddress?.postalCode}</h1>
     <h1>
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
     </h1>

      <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <p>{message}</p>}
    </form>
    <button
        onClick={generateInvoice}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download Invoice
      </button>
    </div>
  );
}

export default User;
