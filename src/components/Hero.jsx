import { useNavigate } from "react-router-dom";
import "../assets/styles/hero.css"
import heroBg from "../assets/images/hero-img.jpg"
import globeIcon from '../assets/images/iconpack/globe icon.svg'


export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-cover bg-c bg-no-repeat w-full h-screen flex justify-center items-center my-auto mx-auto flex-col gap-8"
      style={{
        backgroundImage: `
        radial-gradient(circle at right, rgb(1, 46, 16), transparent 45%),
        radial-gradient(circle at left, rgb(1, 46, 16), transparent 85%),
    url(${heroBg})`
      }}>
      <div className="text-center">
        <h1
          className="text-center font-bold text-white pb-4"
          style={{ fontFamily: "'Roboto Slab', serif", fontSize: '64px', lineHeight: '1.15' }}
        >
          Work Green, <span style={{ color: '#00CC2C' }}>Earn Clean.</span>
        </h1>
        <p className="text-white text-center" style={{ fontFamily: "'Roboto', sans-serif", fontSize: '20px', lineHeight: '1.6' }}>
          Connect to <strong>paid climate micro-jobs</strong> in your community —<br />
          waste collection, tree planting, urban farming and more.<br />
          Get paid fast via mobile money.
        </p>
      </div>
      <div className="cta-button ml-auto mr-auto flex space-x-6">
        <button
          onClick={() => navigate('/onboarding')}
          className="rounded-[10px] text-white font-medium"
          style={{ fontFamily: "'Roboto', sans-serif", fontSize: '16px', padding: '16px 32px', background: '#026C24', border: 'none', cursor: 'pointer' }}
        >
          Find climate work
        </button>
        <button
          className="job-btn rounded-[10px] text-white font-medium"
          style={{ fontFamily: "'Roboto', sans-serif", fontSize: '16px', padding: '16px 32px', background: 'transparent', border: '2px solid #ffffff', cursor: 'pointer' }}
        >
          Post a job
        </button>
      </div>
      <div className="tag-line">
        <p className="flex items-center justify-center gap-2 text-white text-center" style={{ fontSize: '16px' }}>
          <span><img src={globeIcon} alt="Globe" /></span>
          Connecting workers to verified climate organisations across Lagos
        </p>
      </div>
    </section>
  )
}