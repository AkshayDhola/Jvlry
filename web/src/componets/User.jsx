import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; 
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import easyinvoice from "easyinvoice";
import {
  FaUser,
  FaEnvelope,
  FaCreditCard,
  FaBox,
  FaDownload,
  FaShoppingCart,
} from "react-icons/fa";

function User() {
  const [data, setData] = useState([]);
  const cartData = useSelector((state) => state.cart.items);
  const wholeCart = useSelector((state) => state.cart);
  const { totalQuantity, totalPrice } = wholeCart;
  const dispatch = useDispatch();
  const stripe = useStripe();
  const [ID, setID] = useState(0);
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.user);
        setID(response.data.user._stripeid);
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
      const { data } = await axios.post(
        "http://localhost:3000/create-payment-intent",
        {
          amount: totalPrice ,
          customerId: ID,
        }
      );

      const clientSecret = data.clientSecret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      if (error) {
        setMessage(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
      }
    } catch (error) {
      setMessage("Error processing payment.");
      console.error(error);
    }

    setIsLoading(false);
  };
  const handleClear = () =>{
    const token = localStorage.getItem('token');
    if(token){
      localStorage.setItem("token","");
      navigate('/');
    }
  };

  const generateInvoice = async () => {
    const invoicedata = {
      api: "free",
      mode: "development",
      documentTitle: "INVOICE", // Defaults to INVOICE
      currency: "USD",
      taxNotation: "vat",
      images: {
        logo: "https://i.pinimg.com/474x/35/e7/a3/35e7a32a17772ba22991f768d3d1de7b.jpg",
        background:
          "https://i.pinimg.com/474x/2c/8b/39/2c8b39b15db1f5dcab6566e56b5b099b.jpg",
      },
      marginTop: 50,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      sender: {
        company: "Jmlary",
        address: "Nandani Resdenicy, Nr. Ramvatika Society",
        zip: "39150",
        city: "Surat",
        country: "India",
      },
      client: {
        company: data.name,
        address: data?.billingAddress?.street,
        zip: data?.billingAddress?.postalCode,
        city: data?.billingAddress?.city,
        country: "India",
      },
      invoiceNumber: "1",
      invoiceDate: "2025-02-09",
      products: [
        ...cartData.map((e) => {
          return {
            quantity: e.quantity,
            description: e.title,
            taxRate: 6,
            price: e.price,
          };
        }),
      ],
      bottomNotice: "Thank you for your purchase!",
    };

    easyinvoice.createInvoice(invoicedata, function (result) {
      console.log("PDF base64 string: ", result.pdf);
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
    <div className="w-full h-screen overflow-hidden flex">
      <div className="w-1/5 h-screen pt-16 pb-5 px-3 flex flex-col justify-between">
        <div>
          <div className="w-full h-44 relative overflow-hidden rounded-sm">
            <img
              className="w-full h-full object-cover"
              src={data.picture}
              alt=""
            />
            <div className="absolute w-full left-0 bottom-0 px-3 py-1 backdrop-blur-[1.2px] ">
              <p className="jm text-sm w-fit pr-4 text-white leading-tight lowercase bg-black">
                {data.name}
              </p>
              <p className="jm text-sm w-fit pr-4 text-gray-100 bg-black">
                {data.email}
              </p>
            </div>
          </div>
          <div className="w-full px-3 pt-5">
            <p className="text-sm text-zinc-700 border-b py-1">
              Billing Address
            </p>
            <p className="text-sm text-zinc-500 pt-2">
              {data?.billingAddress?.street}, {data?.billingAddress?.city},{" "}
              <br />
              {data?.billingAddress?.state}
            </p>
          </div>
          <div className="w-full px-3 pt-5">
            <p className="text-sm text-zinc-700 border-b py-1">Payment Card</p>
            <p className="text-sm text-zinc-500 pt-2">
              **** **** **** {data.cardNumber?.slice(-4)}
            </p>
          </div>
        </div>
        <div className="w-full px-3 pt-5">
          <p className="text-md text-zinc-700 cursor-pointer" onClick={handleClear}>Sign out</p>
        </div>
      </div>
      <div className="w-4/5 h-screen pt-16 pb-5 px-3 overflow-y-scroll">
        <div className="w-full h-4/5">
          <div className="flex gap-5 flex-wrap justify-center">
            {cartData.length > 0 ? (
              cartData.map((item, index) => (
                <div key={index} className="w-52 h-56 relative">
                  <img
                    className="w-full h-full object-cover"
                    src={item.img}
                    alt={item.title}
                  />
                  <div className="absolute bottom-2 left-2">
                    <h3 className="text-sm text-zinc-900">{item.title}</h3>
                  </div>
                  <p className="n absolute top-2 right-2 text-sm font-semibold">
                    ${item.price} ^ {item.quantity}
                  </p>
                </div>
              ))
            ) : (
              <div className="jm w-full h-52 border flex justify-center items-center text-3xl">
                Empty Card List
              </div>
            )}
          </div>
          <div className="w-full mt-6 py-11 border">
            <div className="px-11">
              <div className="flex justify-between items-center">
                <h1 className="jm text-lg">
                  Total Payment{" "}
                  <span className="px-3 text-md">{totalPrice}$</span>
                </h1>
                <button onClick={generateInvoice} className="text-green-600">
                  Download Invoice
                </button>
              </div>

              <form onSubmit={handleSubmit} className="w-full flex gap-5 py-7">
                <div className="w-4/5 border-b mb-3 px-3 py-2">
                  <CardElement
                    className="p-2"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#3D0301",
                          "::placeholder": {
                            color: "#E3D2C3",
                          },
                        },
                        invalid: {
                          color: "#E50046",
                        },
                      },
                    }}
                  />
                </div>

                <div className="w-1/5">
                  <button
                    type="submit"
                    disabled={!stripe || isLoading}
                    className="w-full border-[1.7px] rounded-sm py-3 px-7 hover:bg-[#F1F0E9] transition-colors"
                  >
                    {isLoading
                      ? "Processing..."
                      : message
                      ? message.includes("successful")
                        ? "Successful"
                        : "Failed"
                      : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
