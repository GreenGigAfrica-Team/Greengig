import { Routes, Route, Navigate } from 'react-router-dom'
import Step1Phone from './pages/Step1Phone'
import Step2OTP from './pages/Step2OTP'
import Step3WorkPath from './pages/Step3WorkPath'
import Step4Profile from './pages/Step4Profile'
import Step5Success from './pages/Step5Success'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboarding/phone" replace />} />
      <Route path="/onboarding/phone" element={<Step1Phone />} />
      <Route path="/onboarding/verify" element={<Step2OTP />} />
      <Route path="/onboarding/path" element={<Step3WorkPath />} />
      <Route path="/onboarding/profile" element={<Step4Profile />} />
      <Route path="/onboarding/success" element={<Step5Success />} />
    </Routes>
  )
}

export default App
