import React, { useState } from "react";

const LoaderCatalog = () => {
  const [number, setnumber] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  return (
    <div className="overflow-hidden">
      <>
        <div class="w-full  h-[50vh] pt-[7rem] px-6 flex flex-col gap-5 animate-pulse">
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="flex gap-2 pb-[3vh] border-b border-zinc-400/50">
            <div class="px-9 py-2 h-6 rounded-full bg-gray-200"></div>
            <div class="px-9 py-2 h-6 rounded-full bg-gray-200"></div>
            <div class="px-9 py-2 h-6 rounded-full bg-gray-200"></div>
            <div class="px-9 py-2 h-6 rounded-full bg-gray-200"></div>
            <div class="px-9 py-2 h-6 rounded-full bg-gray-200"></div>
            <div class="px-9 py-2 h-6 rounded-full bg-gray-200"></div>
            <div class="px-9 py-2 h-6 rounded-full bg-gray-200"></div>
          </div>
        </div>

        <div class="w-full h-screen  px-6 animate-pulse">
          <div class="grid grid-cols-5 grid-rows-3 gap-y-20 w-full">
            <div class="flex flex-col gap-1">
              <div class="w-[231px] h-[234px] bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="w-[231px] h-[234px] bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="w-[231px] h-[234px] bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="w-[231px] h-[234px] bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="w-[231px] h-[234px] bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="w-[231px] h-[234px] bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
            </div>  
            <div class="flex flex-col gap-1">
              <div class="w-[231px] h-[234px] bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
            </div>  
            <div class="flex flex-col gap-1">
              <div class="w-[231px] h-[234px] bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
            </div>  
            <div class="flex flex-col gap-1">
              <div class="w-[231px] h-[234px] bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
            </div>  
            <div class="flex flex-col gap-1">
              <div class="w-[231px] h-[234px] bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
              <div class="w-[231px] h-6 bg-gray-200 rounded"></div>
            </div>  
          </div>
        </div>
            <div class="flex justify-center items-center">
              <button class="bg-zinc-700 px-10 py-2 text-white rounded mb-5 h-10 cursor-not-allowed" disabled>More</button>
            </div>
      </>
    </div>
  );
};

export default LoaderCatalog;
