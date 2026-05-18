import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/styles/header.css';
import headerLogo from '../assets/images/header-logo.png'

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="fixed z-10 flex items-center justify-between py-6 px-6 h-[10vh] w-full"
      style={{
        background: "#ffffff",
        boxShadow: "0 1px 0 #e0e0e0"
      }}>
      <div className="logo flex items-center">
        <img src={headerLogo} alt="Header 
        Logo" className='w-30 h-30' />
      </div>
      <div className="flex">
        <ul className="nav-links flex gap-8">
          {['How it works', 'Task types', 'Why GreenGig', 'About'].map((label) => (
            <li key={label}>
              <a
                href=""
                className='relative text-[#1a1a1a] text-[16px] font-normal after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#026C24] after:transition-all hover:after:w-full underline-offset-8'
              >{label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-6 items-center">
        <button
          onClick={() => navigate('/login')}
          className="logIn text-[#1a1a1a] text-[16px] font-medium bg-transparent border-none cursor-pointer"
        >
          Log In
        </button>
        <button
          onClick={() => navigate('/onboarding')}
          className="sign-up rounded-[10px] text-white text-[16px] font-medium"
          style={{ padding: '14px 32px', background: '#026C24', border: 'none' }}
        >
          Sign Up
        </button>
      </div>
    </header>
  )
}
