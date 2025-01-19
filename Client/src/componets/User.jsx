import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User() {
  const [data, setData] = useState([]);
  
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
        console.log(response.data.user._id);
                      
      } catch (error) {
        console.error("Error fetching data:", error); 
      } 
    };
    
    fetchData();
  }, []);
  
  return (
    <div className='w-full h-screen bg-red-400 pt-11'>
      <h1>User Data</h1>
      <h1>{data._id}</h1> {/* Render fetched data */}
    </div>
  );
}

export default User;
