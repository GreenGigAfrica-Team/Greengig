// import React from "react";
import wasteBinIcon from '../assets/images/iconpack/waste collection icon.svg'
import treePlantingIcon from '../assets/images/iconpack/tree planting icon.svg'
import urbanFarmingIcon from '../assets/images/iconpack/urban farming icon.svg'
import climateDataIcon from '../assets/images/iconpack/climate data icon.svg'
import recycleIcon from '../assets/images/iconpack/recycle icon.svg'
import communityIcon from '../assets/images/iconpack/community icon.svg' 



export default function Features() {
  const jobSection = [
  
    {
    icon: wasteBinIcon,
    id: 1,
    title: "Waste Collection",
    description:"Community waste collection and sorting in Alimosho and other hihg-density Lagos areas. Direct LAWMA alignment."
    },


    {
      icon: treePlantingIcon,
      id: 2,
      title: "Tree Planting",
      description:"Seedling planting and monitoring for mangrove restoration and reforestation in Epe LGA and costal areas."
    },


    {
      icon: urbanFarmingIcon,
      id: 3,
      title: "Urban Farming",
      description:"Maintain and expand community gardens, food forests, and urban growing spaces across Lagos neighbour hoods."
    },


    {
      icon: climateDataIcon,
      id: 4,
      title: "Climate Data Collection",
      description:"Collect localised environmental data — flood levels, air quality, waste hotspots — for government and research partners."
    },


    {
      icon: recycleIcon,
      id: 5,
      title: "Recycling & Sorting",
      description:"Sort recyclable materials at community collection points. Support Lagos State recycling partners."
    },
  
    {
      icon: communityIcon,
      id: 6,
      title: "Community Education",
      description:"Lead awareness sessions on waste management, and sustainable living in local schools and markets."
    }
  

]

  return (
    <section className=" flex justify-center items-center flex-col bg-[#026c24] mt-8 py-10 h-full max-h-150 text-white">
      <div className="flex justify-center items-center flex-col mb-8 gap-2">
        <h2 className="text-4xl font-bold">Climate work that pays</h2>
        <p className="text-center text-white">From Lagos waste crisis to coastal restoration. Real environmental work, <br /> verified and comoensated</p>
      </div>
      <div className="grid gap-3 grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 max-w-400 py-4 ml-auto mr-auto w-[80%]">
        {jobSection.map((jobsCard) => (
          <div key={jobsCard.id}
          className="py-8 px-4 rounded-[10px] bg-[#014d1a]">
            <img src= {jobsCard.icon}alt= {jobsCard.title} className='w-8 h-8 mb-3' />
            <h6 className="text-left font-bold text-[1.1rem] pb-1">{jobsCard.title}</h6>
            <p className="w-full">{jobsCard.description}</p>
          </div>
        ))}
      </div>
    </section>

  )
}