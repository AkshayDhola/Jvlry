import React from 'react'
import Footer from './Footer'

function Terms() {
  return (
    <>
        <div className='w-full mt-12 pb-10 h-24 flex justify-center items-end border-b-[1px]'>
            <h1>Terms of Use</h1>
        </div>
        <div className='max-w-screen-md mx-auto pt-10 flex flex-col justify-center items-center'>
            <p className='text-sm text-zinc-600'>Welcome to jmlry, the online platform for Jewelry, a jewelry brand dedicated to bringing exquisite jewelry from around the world to our valued customers. By accessing or using our website, you agree to comply with and be bound by the following Terms of Use. Please read them carefully before using our site.</p>
            <div className='py-5'>
                <h1 className='jm text-xl pb-4'>1. Acceptance of Terms</h1>
                <p className='text-sm text-zinc-500 pb-3'>By accessing, browsing, or using jmlry, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and any additional terms and conditions that may apply to specific sections of the website or to products and services available through the website. If you do not agree to these terms, please do not use this website.</p>
            </div>
            <div className='py-5'>
                <h1 className='jm text-xl pb-4'>2. Use of the Website</h1>
                <p className='text-sm text-zinc-500 pb-3'>You must be at least 18 years of age or have the consent of a parent or guardian to use this website.</p>
                <p className='text-sm text-zinc-500 pb-3'>You agree to use jmlry for lawful purposes only and in a manner that does not infringe the rights of, restrict, or inhibit the use and enjoyment of the site by any third party.</p>
                <p className='text-sm text-zinc-500 pb-3'>You agree not to use any automated means, including robots, spiders, or data mining techniques, to download, monitor, or copy any part of the website without our express written consent.</p>
            </div>
            <div className='py-7'>
                <h1 className='jm text-xl pb-4'>3. Product Descriptions</h1>
                <p className='text-sm text-zinc-500 pb-3'>We strive to ensure that the descriptions and images of our jewelry products on jmlry are as accurate as possible. However, we do not warrant that product descriptions or other content on the website are accurate, complete, reliable, current, or error-free.</p>
            </div>
            <div className='py-5'>
                <h1 className='jm text-xl pb-4'>4 .Pricing and Payment</h1>
                <p className='text-sm text-zinc-500 pb-3'>Prices for products listed on jmlry are subject to change without notice. We are not liable for any pricing errors or discrepancies.</p>
                <p className='text-sm text-zinc-500 pb-3'>Payments for purchases made through the website must be made through our approved payment methods. </p>
            </div>
            <div className='py-5'>
                <h1 className='jm text-xl pb-4'>5. User Accounts</h1>
                <p className='text-sm text-zinc-500 pb-3'>If you create an account on jmlry, you are responsible for maintaining the confidentiality of your account information, including your password. You agree to accept responsibility for all activities that occur under your account.</p>
            </div>
            <div className='py-5'>
                <h1 className='jm text-xl pb-4'>6. Limitation of Liability</h1>
                <p className='text-sm text-zinc-500 pb-3'>We do not guarantee that the website will be error-free, uninterrupted, or free of viruses or other harmful components.</p>
            </div>
            <div className='py-5'>
                <h1 className='jm text-xl pb-4'>7. Changes to Terms of Use</h1>
                <p className='text-sm text-zinc-500 pb-3'>We reserve the right to modify or update these Terms of Use at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the new terms.</p>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Terms
