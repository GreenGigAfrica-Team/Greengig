import React from 'react'
import footerLogo from '../assets/images/footer-logo.png'

export default function Footer() {
  return (
    <footer className="bg-[#012e10] ml-auto mr-auto py-15">
      <div className='ml-auto mr-auto w-[90%]'>
        <div className='grid grid-cols-5 pb-10 gap-4'>
        <div className='col-span-2'>
          <img src={footerLogo} alt="" className='w-40 h-30  -mb-10 -ml-10' />
          <p className='text-[rgba(255,255,255,0.50)] font-semibold'>Connecting low-income youth and women <br /> across Lagos to paid climate micro-jobs</p>
        </div>
        <div className='text-[rgba(255,255,255,0.50)]'>
          <h4 className='text-white font-medium pb-2'>COMPANY</h4>
          <ul>
            <li>About us</li>
            <li>Our impact</li>
            <li>Partners</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='text-[rgba(255,255,255,0.50)]'>
          <h4 className='text-white font-medium pb-2'>PLATFORM</h4>
          <ul>
            <li>Find Jobs</li>
            <li>Post a job</li>
            <li>Volunteer</li>
            <li>How it works</li>
          </ul>
        </div>
        <div className='text-[rgba(255,255,255,0.50)]'>
          <h4 className='text-white font-medium pb-2'>LEGAL</h4>
            <ul>
            <li>Privacy policy</li>
            <li>Terms of service</li>
            <li>Cookie policy</li>
    
          </ul>
        </div>
      </div>
      <div className='flex justify-between items-center border-t border-[rgba(255,255,255,0.10)] pt-10 text-[rgba(255,255,255,0.50)]'>
        <div className=''>
          <p>&copy; {new Date().getFullYear()} GreenGig Africa. All rights reserved.</p>
        </div>
        <div>
          <ul className=' flex justify-between gap-2'>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
      </div>
      
    </footer>
  )
}