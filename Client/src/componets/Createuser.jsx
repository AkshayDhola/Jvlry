import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    picture: "",
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    }
  });

  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token){
      navigate('/user');
    }
  },[])

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("billingAddress.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", formData);
      const token = response.data.token;   
      localStorage.setItem('token', token); 
      navigate("/user");
      setFormData({
        name: "",
        email: "",
        password: "",
        picture: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
      });
      
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="w-full h-[89vh] mt-[11vh] px-7 py-7 border-t border-zinc-700/50">
        <div className="w-2/3">
          <h2 className="jm text-lg">Contact Information</h2>
          {error && <p className="text-red-500"> error</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <form className="pt-6" onSubmit={handleSubmit}>
            <div className="flex gap-4 pb-5">
            <input
                name="name"
                className="n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="Enter Name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                name="picture"
                className="n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="Picture URL"
                type="text"
                value={formData.picture}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-4 pb-5">
              <input
                name="email"
                className="w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="Email*"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                name="password"
                className="w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="Password*"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <h2 className="jm text-lg pb-6">Shipping Address</h2>
            <div className="flex gap-4 pb-5">
              <input
                name="billingAddress.street"
                className="n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="Street Address*"
                type="text"
                value={formData.billingAddress.street}
                onChange={handleInputChange}
                required
              />
              <input
                name="billingAddress.city"
                className="n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="City*"
                type="text"
                value={formData.billingAddress.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex gap-4 pb-5">
              <input
                name="billingAddress.state"
                className="n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="State*"
                type="text"
                value={formData.billingAddress.state}
                onChange={handleInputChange}
                required
              />
              <input
                name="billingAddress.postalCode"
                className="n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="Zip*"
                type="text"
                value={formData.billingAddress.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <h2 className="jm text-lg pb-6">Payment Information</h2>
            <div className="flex gap-4 pb-5">
              <input
                name="cardNumber"
                className="n w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="Card Number*"
                type="text"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
              <input
                name="expirationDate"
                className="n w-[12.5vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="MM/YY"
                type="text"
                value={formData.expirationDate}
                onChange={handleInputChange}
                required
              />
              <input
                name="cvv"
                className="n w-[12.5vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
                placeholder="CVV"
                type="number"
                value={formData.cvv}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              className="n w-[25vw] px-3 py-2 bg-black text-white text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
