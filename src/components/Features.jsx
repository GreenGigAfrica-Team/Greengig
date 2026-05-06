// import React from "react";



export default function Features() {
  const greenGigAfricaFeatures = [
  
    {
    icon: "",
    id: "1",
    title: "Multi-stage photo proof",
    description:"Photos required at task start, during and completion with automatic GPS location and timestamp. No single staged photo accepted"
    },


    {
      icon: "",
      id: "2",
      title: "AI image validation",
      description:"Every submission is scanned by AI to confirm it contains relevant content like wate, trees or farming  activity. Irrelevant photos are flagged automatically"
    },


    {
      icon: "",
      id: "3",
      title: "Approval before payment",
      description:"Payment are only released after an organization reviewer approves your proof of work. Full transparency at every step."
    }
  

]

  return (
    <section className=" flex justify-center items-center flex-col bg-[#f5f5f5] mt-8 h-125 max-h-150">
      <div className="flex justify-center items-center flex-col mb-8 gap-2">
        <h2 className="text-4xl font-bold">Your work is verified. <br /> Your pay is guaranteed</h2>
        <p className="text-center">Trust is GreenGig Africa's foundation. Every task, every submission,  <br /> every payment is protected by layers of verification.</p>
      </div>
      <div className="feature-card flex justify-between items-center gap-8 max-w-400 py-4 ml-auto mr-auto w-[80%]">
        {greenGigAfricaFeatures.map((featuresCard) => (
          <div key={featuresCard.id}
          className="w-full  h-full flex justify-center items-center flex-col  py-8 px-4 rounded-[10px] bg-white flex-1">
            {/* {featuresCard.icon} */}
            <h6 className="text-center font-bold text-[1.1rem] pb-1">{featuresCard.title}</h6>
            <p className="w-full">{featuresCard.description}</p>
          </div>
        ))}
      </div>
    </section>

  )
}