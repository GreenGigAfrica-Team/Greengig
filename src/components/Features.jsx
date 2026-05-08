import React from "react";
import cameraIcon from '../assets/images/iconpack/camera icon.svg'
import aiIcon from '../assets/images/iconpack/ai icon.svg'
import checkMarkIcon from '../assets/images/iconpack/checkmark icon.svg'



export default function Features() {
  const greenGigAfricaFeatures = [
  
    {
    icon: cameraIcon,
    id: 1,
    title: "Multi-stage photo proof",
    description:"Photos required at task start, during and completion with automatic GPS location and timestamp. No single staged photo accepted"
    },


    {
      icon: aiIcon,
      id: 2,
      title: "AI image validation",
      description:"Every submission is scanned by AI to confirm it contains relevant content like waste, trees or farming  activity. Irrelevant photos are flagged automatically."
    },


    {
      icon: checkMarkIcon,
      id: 3,
      title: "Approval before payment",
      description:"Payment are only released after an organization reviewer approves your proof of work. Full transparency across every process."
    }
  

]

  return (
    <section className=" flex justify-center items-center flex-col bg-[#f5f5f5] h-full max-h-200 py-12">
      <div className="flex justify-center items-center flex-col mb-8 gap-2">
        <h2 className="text-4xl font-bold">Your work is verified. <br /> Your pay is guaranteed</h2>
        <p className="text-center">Trust is GreenGig Africa's foundation. Every task, every submission,  <br /> every payment is protected by layers of verification.</p>
      </div>
      <div className="flex justify-between
       gap-8 max-w-400 py-4  w-[80%]">
        {greenGigAfricaFeatures.map((featuresCard) => (
          <div key={featuresCard.id}
            className="flex align items-center flex-col flex-1 px-4  py-4 rounded-[10px] bg-white">
            <div className="w-12 h-12 bg-[#dcfcefcd] rounded-md flex justify-center items-center px-2 py-2 my-6"><img src= {featuresCard.icon} alt="" /></div>
            
            <h6 className="text-center font-bold text-[1.1rem] pb-1 mt-auto">{featuresCard.title}</h6>
            <p className="mt-auto text-center">{featuresCard.description}</p>
          </div>
        ))}
      </div>
    </section>

  )
}