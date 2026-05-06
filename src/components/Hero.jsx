// import { useState } from "react";
import heroBg from "../assets/images/hero-img.jpg"
import "../assets/styles/hero.css"


export default function Hero() {
  return (
    <section className="bg-cover bg-c bg-no-repeat h-[90vh] w-full flex justify-center items-center my-auto mx-auto flex-col gap-8"
      style={{
        backgroundImage: `
        radial-gradient(circle at right, rgb(1, 46, 16), transparent 45%),
        radial-gradient(circle at left, rgb(1, 46, 16), transparent 85%),
    url(${heroBg})`
      }}>
      <div className="">
        <h1 className="text-5xl text-center font-bold text-white pb-3">Clean Green, <span className="text-green-600">Earn Clean</span></h1>
        <p className="text-white text-center text-[1.2rem]">Connect to paid climate micro-jobs in your community  <br />waste collection, tree planning, urban farming and more. <br />
          Get paid fast via mobile money.
        </p>
      </div>
      <div className="cta-button ml-auto mr-auto flex space-x-8">
        <button className="bg-green-900 p-2.5 rounded-md text-white">Find climate jobs</button>
        <button className="job-btn border-2 border-solid border-white p-2.5 rounded-md text-white">Post a job</button>
      </div>
      <div className="tag-line">
        <p className="text-white text-[1rem] text-center">Connecting workers to verified climate organisations across Lagos</p>
      </div>
    </section>
  )
}