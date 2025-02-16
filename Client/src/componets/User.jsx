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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <FaUser className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-900">{data.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{data.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Billing Address</p>
              <p className="font-medium text-gray-900">
                {data?.billingAddress?.street}, {data?.billingAddress?.city}, {data?.billingAddress?.state} {data?.billingAddress?.postalCode}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Payment Card</p>
              <p className="font-medium text-gray-900">**** **** **** {data.cardNumber?.slice(-4)}</p>
            </div>
          </div>
        </div>

        {/* Cart Items Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <FaShoppingCart className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Cart Items</h2>
          </div>

          <div className="space-y-4">
            {cartData.map((item, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <img className="w-20 h-20 object-cover rounded-lg" src={item.img} alt={item.title} />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
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
                    <p className="text-lg font-semibold text-blue-600">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <FaCreditCard className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Payment Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border rounded-lg p-4">
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
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Pay Now'}
            </button>

            {message && (
              <div className={`p-4 rounded-lg ${message.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Invoice Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <FaDownload className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
          </div>

          <button
            onClick={generateInvoice}
            className="flex items-center justify-center w-full md:w-auto bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaDownload className="mr-2" />
            Download Invoice
          </button>
        </div>
      </div>
    </div>

  )
}

export default User;
