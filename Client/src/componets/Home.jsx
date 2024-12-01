import React from 'react'
import Swwiper from './Swwiper'
import Footer from './Footer'

function Home() {
  return (
    <>
     <div className='w-full h-screen flex px-5 items-center relative bg-[url(https://nidatabba.com/_content/Library/img/home/home-italian.jpg)] bg-cover'>
      <div className='w-1/3 h-1/5 pt-[11vh] flex flex-col gap-6 relative z-10 text-white'>
        <h2 className='text-5xl'>Mystery of Mexico</h2>
        <p className='text-sm'>Mexico embodies a captivating mystery, and we've curated a selection of pieces from this enchanting country to introduce modern traditions rooted in deep heritage.</p>
      </div>
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <div className='w-full flex px-7 py-7'>
      <div className='w-1/3 h-screen flex flex-col justify-center'>
        <h5>Diversity of beauty</h5>
        <p className='text-[1.005vw] pt-5 text-zinc-900/50'>We have traveled around the world and selected some exceptional pieces of jewelry. All of them are unique and united by certain ideas or represent a particular region on our globe. Our mission is to show cultural diversity and celebrate the uniqueness of traditional motives with high-quality of production and craftsmanship.</p>
        <p className='text-[1.005vw] pt-5 text-zinc-900/50'>We have seen the variety of beauty and brought this experience to you, and we invite you to join us on this breathtaking journey. Discover our collections from around the globe and find your perfect fit with Nida Tabba Jewelry.</p>
      </div>
      <div className='w-2/3 flex flex-col items-end'>
          <img className='w-[40vw] h-screen object-cover' src="https://nidatabba.com/_content/Library/img/home/main-diversity-of-beauty-2.jpg" alt="" />
          <p className='w-[30vw] text-[1.2vw] uppercase pt-5 text-zinc-900/50'>Cultural roots are essential. It is something that supports us from the very deep state of our unconscious mind. Allow yourself to express your inner world, and choose your mood and style with Nida Tabba Jewelry.</p>
      </div>
    </div>
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <h1 className='jm text-4xl'>The beauty of the world at your fingertips.</h1>
      <p className='w-[50vw] text-center text-[1.005vw] pt-5 text-zinc-900/50'>Join us on a globetrotting adventure where we've roamed the world, capturing the spirit of time and culture through a stunning collection of jewelry. Explore our map and unlock the stories behind each destination.</p>
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
      <div className='w-[50vw] text-[1.1vw] pb-11 leading-normal'>Jvlry jewelry is built upon the profound cultural heritage of diverse traditions, yet tailored for contemporary individuals and the modern city. Incorporate it into your daily attire to enrich your identity and express your unique personality. Explore our collection for inspirational looks.</div>
      <Swwiper/>
    </div>
    
    <Footer/>
    
    </>
    
  )
}

export default Home
