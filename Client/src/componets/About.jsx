import React from 'react'
import Swwiper from './Swwiper'
import Footer from './Footer'
function About() {
  return (
    <>
     <div className='w-full h-screen flex px-5 items-center relative bg-[url(https://nidatabba.com/_content/Library/img/about/about-us-main-visual.jpg)] bg-cover'>
      <div className='w-full h-full pt-[11vh] flex justify-center items-end relative z-10 text-white'>
        <p className='w-1/2 pb-7 text-center text-[1vw]'>We've roamed the globe, immersed ourselves in different cultures, and witnessed the breathtaking beauty that exists in every corner of the world. From the intricate designs of the Middle East to the elegance of Mexico, we've curated a collection that reflects the richness of global aesthetics.</p>
      </div>
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <div className='w-full flex items-end gap-5 px-7 py-7'>
          <img className='w-2/3 h-[80vh] object-cover' src="https://nidatabba.com/_content/Library/img/about/about-us-passion-for-beauty-2.jpg" alt="" />
          <p className='w-[30vw] text-[1.1vw] uppercase pt-5 text-zinc-900/50'>Jvlry Jewelry is more than just jewelry; it's an invitation to embark on a journey of discovery, where passion, diversity, culture, and craftsmanship converge. These aren't just relics of the past; this jewelry serves as ideal companions for everyday life in the urban society.</p>
    </div>
   
    <div className='w-full flex px-7 py-7'>
      <div className='w-1/3 h-screen flex flex-col justify-center'>
        <h5>Crafted by Masters</h5>
        <p className='text-[1.005vw] pt-5 text-zinc-900/50'>Craftsmanship is the cornerstone of Jvlry Jewelry. We are proud to collaborate with master artisans from around the world, each possessing a deep understanding of their craft passed down through generations. We foster deep, robust relationships based on shared values and a unified vision to create jewelry that is more than adornment, it's a testament to the art of meticulous craftsmanship.</p>
        <p className='text-[1.005vw] pt-5 text-zinc-900/50'>Our partners are an integral part of our team, and we deeply value their talents. We're grateful for the opportunity to reciprocate their contributions.</p>
      </div>
      <div className='w-2/3 flex flex-col items-end'>
          <img className='w-[40vw] h-screen object-cover' src="https://nidatabba.com/_content/Library/img/home/main-diversity-of-beauty-2.jpg" alt="" />
      </div>
    </div>

    <Footer/>
    
    </>
  )
}

export default About
