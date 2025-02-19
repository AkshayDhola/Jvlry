import React from 'react'
import Swwiper from './Swwiper'
import Footer from './Footer'
function Colltion() {
  return (
    <>
     <div className='w-full h-screen flex px-5 items-center relative bg-[url(https://nidatabba.com/_content/Library/img/home/home-mexico.jpg)] bg-cover'>
      <div className='w-1/3 h-1/5 pt-[11vh] flex flex-col gap-6 relative z-10 text-white'>
        <h2 className='text-5xl'>Mystery of Mexico</h2>
        <p className='text-sm'>Mexico embodies a captivating mystery, and we've curated a selection of pieces from this enchanting country to introduce modern traditions rooted in deep heritage.</p>
      </div>
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-1/2 text-center'>
        <h5>Discover the enchanting allure of Jvlry Jewelry's collections.</h5>
        <p className='text-[1.005vw] pt-5 text-zinc-900/50'>Step into a meticulously curated world where each piece tells a captivating story, inviting you to unravel its secrets. Join us on this extraordinary journey without leaving the comfort of your hometown. Our collections pay homage to the mesmerizing beauty of diverse cultures, and we invite you to infuse them into the narrative of your unique style.</p>
      </div>
    </div>

    <div className='w-full px-5'>
      <div className='jm text-5xl leading-normal'>Begin your exploration <br />with Jvlry Jewelry today</div>
      <div className='w-full flex gap-6 pt-[7vh] text-white'>
        <div className='w-2/5 h-[40vh] bg-[url(https://nidatabba.com/_content/Library/img/collections/collection-cover-mexico.jpg)] bg-cover p-4 relative'>
            <h5 className='jm text-[2vw] relative z-10'>Mystery of Maxico</h5>
            <div class="absolute inset-0 bg-transparent opacity-50 hover:bg-black transition-all duration-200"></div>
        </div>
        <div className='w-3/5 h-[40vh] bg-[url(https://nidatabba.com/_content/Library/img/collections/collection-cover-italy.jpg)] bg-cover p-4 relative'>
            <h5 className='jm text-[2vw] relative z-10'>Italian Warmth</h5>
            <div class="absolute inset-0 bg-transparent opacity-50 hover:bg-black transition-all duration-200"></div>
        </div>
      </div>
      <div className='w-full flex gap-6 pt-[3vh] text-white'>
        <div className='w-3/5 h-[40vh] bg-[url(https://nidatabba.com/_content/Library/img/collections/collection-cover-indus.jpg)] bg-cover p-4 relative'>
            <h5 className='jm text-[2vw] relative z-10'>Indus Valley</h5>
            <div class="absolute inset-0 bg-transparent opacity-50 hover:bg-black transition-all duration-200"></div>
        </div>
        <div className='w-2/5 h-[40vh] bg-[url(https://nidatabba.com/_content/Library/img/collections/collection-cover-signature.jpg)] bg-cover p-4 relative'>
            <h5 className='jm text-[2vw] relative z-10'>Signature Collection</h5>
            <div class="absolute inset-0 bg-transparent opacity-50 hover:bg-black transition-all duration-200"></div>
        </div>
      </div>
    </div>

    <div className='w-full pt-[50vh] px-5'>
      <div className='text-3xl leading-normal'>Cultural diversity in modern city</div>
      <Swwiper/>
    </div>
      
    <Footer/>
    </>
  )
}

export default Colltion
