import React from 'react';

export default function Cta() {
  return (
    <section className='flex justify-center items-center flex-col ml-auto mr-auto' style={
      {
        background: "linear-gradient(135deg, #014d1a 0%, #012e10 100% )",
        height: "400px",
        maxHeight: "600px"
    }
    }>
      <div className='flex gap-4 flex-col w-[50%] mb-10'>
        <h1 className='text-4xl font-bold text-white text-center'>Be Part of Africa's <br /> climate workforce</h1>
        <p className= ' text-[1.2rem] text-white text-center'>Find paid tasks, volunteers, or post climate jobs in your <br /> community</p>
      </div>
      <div className='flex gap-4'>
        <button className='bg-[#00ce2e] py-2 px-8 rounded-md font-semibold'>Find climate work</button>
        <button className='border-[0.17rem] border-white py-2 px-6 rounded-md text-white font-semibold'>Post a job</button>
      </div>
    </section>
  )
}