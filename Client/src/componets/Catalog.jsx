import React , { useState, useEffect } from 'react';
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import LoaderCatalog from "./LoaderCatalog";
function Catalog() {
    const [data, setData] = useState([]);
    const [cat, setcat] = useState("all products");
    const [search, setsearch] = useState("");
    const [more, setmore] = useState(20);

    const filterredItem = data.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) &&
          (cat === "all products" ||
            item.category.toLowerCase() === cat.toLowerCase())
      );


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
  return data.length >= 1 ? (
    <>
        <div className='w-full h-[50vh] pt-[7rem] px-6 flex flex-col gap-5'>
            <h2 className='text-2xl'>Catalog</h2>
            <div className="flex justify-between items-center border-b p-4 border-zinc-400/5">
          <div className=" flex gap-2 ">
            {[
              "all products",
              "anklet",
              "bracelet",
              "earrings",
              "necklace",
              "ring",
              "set",
            ].map((e, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setcat(e)}
                  className={`px-9 py-2 ${
                    cat === e ? "bg-zinc-700 text-white" : ""
                  } text-[.9vw] uppercase border border-zinc-400/50 rounded-full`}
                >
                  {e}
                </button>
              );
            })}
          </div>

          <div>
            <Input
            className="py-2 text-[.9vw] uppercase border border-zinc-400/50 rounded-full outline-none"
              placeholder="Search here"
              allowClear
              size="large"
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>
        </div>
           
        </div> 
        <div className='w-full h-screen pt-7 px-6'>
          <div className="grid grid-cols-5 grid-rows-3 gap-y-20 w-full">
          {data.length >= 1 ? (
            filterredItem.slice(0, more).map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col gap-1"
                  onClick={() => gotoProduct(e._id)}
                >
                  <img
                    className="w-[231px] h-[234px] cursor-pointer object-cover rounded hover:scale-95 duration-200"
                    src={e.img}
                    key={e._id}
                  />
                  <p className="n text-[.9vw]">{e.title}</p>
                  <p className="n text-[1vw] text-zinc-700/50">${e.price}</p>
                </div>
              );
            })
          ) : (
            <LoaderCatalog />
            
          )}

            </div>

            <div className="flex justify-center items-center pb-11">
          {more < data.length && (
            <button
              onClick={() => setmore(more + 10)}
              className="px-9 py-2 text-[.9vw] uppercase border border-zinc-400/50 rounded-full"
            >
              More
            </button>
          )}
        </div>
        </div>
    </>
  ) : (
    <LoaderCatalog />
  );
}

export default Catalog
