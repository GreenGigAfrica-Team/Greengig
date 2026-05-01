// import { useState } from "react";


export default function Hero() {
  return (
    <div className="hero-section flex justify-center flex-col gap-8 min-h-screen">
      <div className="">
        <h1 className="text-4xl font-bold text-white">Clean Green, <span className="text-green-600">Earn Clean</span></h1>
        <p className="text-center">Connect to paid climate micro-jobs in your community  <br />waste collection, tree planning, urban farming and more. <br />
          Get paid fast via mobile money.
        </p>
      </div>
      <div className="cta-button ml-auto mr-auto flex space-x-8">
        <button className="bg-green-900 p-2.5 rounded-md">Find climate jobs</button>
        <button className="border border-green-900 p-2.5 rounded-md">Post a job</button>
      </div>
      <div className="tag-line">
        <p>Connecting workers to verified climate organisations across Lagos</p>
      </div>
    </div>
  )
}