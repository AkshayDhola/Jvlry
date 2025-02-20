import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import easyinvoice from "easyinvoice";
import { FaUser, FaEnvelope, FaCreditCard, FaBox, FaDownload, FaShoppingCart } from 'react-icons/fa';

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
      "api": "free",
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
      "products": [...cartData.map(e => {
        return {
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
      link.href = `data:application/pdf;base64,${result.pdf}`;
      link.download = "invoice.pdf";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


    });
  };



  return (
    <div className="min-h-screen overflow-hidden w-full flex pt-16">
      <div className="w-1/5 border-r-[1px] border-t-[1px]">
          <div className="h-20 flex gap-3 items-center border-b-[1px] pl-6">
            <img className='w-14 h-14 rounded-full' src={data.picture} alt="" />
            <div className='h-9'>
              <h1 className="text-lg text-gray-800 leading-none">{data.name}</h1>
              <p className="text-md text-gray-600">{data.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-6 pl-4">
            <div className="p-4">
              <p className="text-sm text-gray-500">Billing Address</p>
              <p className="font-medium text-gray-900">
                {data?.billingAddress?.street}, {data?.billingAddress?.city} - {data?.billingAddress?.postalCode},<br /> {data?.billingAddress?.state} 
              </p>
              <p className="text-sm text-gray-500 mt-6">Payment Card</p>
              <p className="font-medium text-gray-900">**** **** **** {data.cardNumber?.slice(-4)}</p>
            </div>
          </div>
      </div>
      <div className='w-3/4 flex flex-wrap gap-3 h-1/2 ml-12'>
        {cartData.map((item, index) => (
              <div key={index} className="w-[25rem] h-44 p-4 flex items-center border-[1px] gap-3">
                <img className="w-36 h-36 object-cover" src={item.img} alt={item.title} />
                <div className="flex flex-col justify-between h-full">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 bg-white border border-gray-300 rounded-full">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(addQuantity(item._id, totalPrice))}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xl">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          <div className="w-full py-7">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="w-4/5 border p-4">
              <CardElement
                className="p-2"
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#a0aec0',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!stripe || isLoading}
              className="w-1/5 py-3 px-6 rounded-lg border-[1px]"
            >
              {isLoading ? 'Processing...' : 'Pay Now'}
            </button>

            
          </form>
          <div className='w-fit mt-5'>
          {message && (
            message.includes('successful') ? (
              <button onClick={generateInvoice} className="px-5 flex items-center justify-center w-full border-[1px] py-3 rounded-lg">
                Download Invoice
              </button>
              ) : 
              (
              <div className="flex items-center justify-center w-full border-[1px] py-3 px-6 rounded-lg">
                Unsuccessful, try again
              </div>
              )
            )}

        </div>
          
        </div>
      
    </div>
    </div>
  )
}

export default User;