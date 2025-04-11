import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

function Swwiper() {
  return (
    <Swiper
        slidesPerView={5}
        spaceBetween={10}
        loop={true}
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,
        }}
        draggable={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full cursor-grab"
    >
        <SwiperSlide className='w-full h-[60vh]'>
            <img className='w-full h-full object-cover' src="https://nidatabba.com/_content/Library/img/home/home-mexico.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className='w-full h-[60vh]'>
            <img className='w-full h-full object-cover' src="https://nidatabba.com/_content/Library/img/mexico/collections-internal-mexico-collection-slide-2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className='w-full h-[60vh]'>
            <img className='w-full h-full object-cover' src="https://i.pinimg.com/474x/4e/b4/3e/4eb43ea164ed5b0cb46573bc8e337ddf.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className='w-full h-[60vh]'>
            <img className='w-full h-full object-cover' src="https://i.pinimg.com/474x/c6/a9/09/c6a9097bfb238fcdf31f80c8ea7caebf.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className='w-full h-[60vh]'>
            <img className='w-full h-full object-cover' src="https://i.pinimg.com/474x/b6/03/5f/b6035f8b741faebd1857864b3421ec69.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className='w-full h-[60vh]'>
            <img className='w-full h-full object-cover' src="https://i.pinimg.com/736x/80/24/ce/8024ce86c399f1c15ac3f5dbe1d231f7.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className='w-full h-[60vh]'>
            <img className='w-full h-full object-cover' src="https://i.pinimg.com/474x/5a/ef/1c/5aef1c3a2846d5a4c1c29f7bb0ba42a5.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className='w-full h-[60vh]'>
            <img className='w-full h-full object-cover' src="https://nidatabba.com/_content/Library/img/products/NT402052-B.jpg" alt="" />
        </SwiperSlide>
        
      </Swiper>
  )
}

export default Swwiper
