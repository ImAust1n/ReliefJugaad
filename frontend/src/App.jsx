import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import './index.css'
import Header from './components/Header'

import HomePage from './pages/HomePage'

import ChooseLogin from './pages/ChooseLogin'
import AboutUs from './pages/AboutUs.jsx'
import EmergencyContacts from './pages/EmergencyContacts.jsx';

import DonorPage from './pages/DonorPage'
import DonatePage from './pages/DonatePage'
import DonorSignUpPage from './pages/DonorSignUpPage'
import DonorLoginPage from './pages/DonorLoginPage'

import NGOPage from './pages/NGOPage'
import WarehousePage from './pages/WarehousePage'
import InventoryPage from './pages/InventoryPage' 
import NGOSignUpPage from './pages/NGOSignUpPage'
import NGOLoginPage from './pages/NGOLoginPage'

import GOVPage from './pages/GOVPage'
import CampPage from './pages/CampPage'
import RequirementPage from './pages/RequirementPage'
import GOVSignUpPage from './pages/GOVSignUpPage'
import GOVLoginPage from './pages/GOVLoginPage'

import { useAuthStore } from './store/useAuthStore.js'
import { useNGOStore } from './store/useNGOStore.js'
import { useGOVStore } from './store/useGOVStore.js'

const App = () => {
  const { authUser } = useAuthStore();
  const { authNGO } = useNGOStore();
  const { authGOV } = useGOVStore();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<ChooseLogin/>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />

        <Route path="/donor" element={authUser ? <DonorPage /> : <Navigate to="/donor-login" />} />
        <Route path="/donate" element={authUser ? <DonatePage /> : <Navigate to="/donor-login" />} />
        <Route path="/donor-signup" element={!authUser ? <DonorSignUpPage /> : <Navigate to="/donor" />} />
        <Route path="/donor-login" element={!authUser ? <DonorLoginPage /> : <Navigate to="/donor" />} />

        <Route path="/ngo" element={authNGO ? <NGOPage /> : <Navigate to="/ngo-login" />} />
        <Route path="/ngo-warehouse" element={authNGO ? <WarehousePage /> : <Navigate to="/ngo-login" />} />
        <Route path="/ngo-inventory" element={authNGO ? <InventoryPage /> : <Navigate to="/ngo-login" />} />
        <Route path="/ngo-signup" element={!authNGO ? <NGOSignUpPage /> : <Navigate to="/ngo" />} />
        <Route path="/ngo-login" element={!authNGO ? <NGOLoginPage /> : <Navigate to="/ngo" />} />

        <Route path="/gov" element={authGOV ? <GOVPage /> : <Navigate to="/gov-login" />} />
        <Route path="/gov-camp" element={authGOV ? <CampPage /> : <Navigate to="/gov-login" />} />
        <Route path="/gov-requirement" element={authGOV ? <RequirementPage /> : <Navigate to="/gov-login" />} />
        <Route path="/gov-signup" element={!authGOV ? <GOVSignUpPage /> : <Navigate to="/gov" />} />
        <Route path="/gov-login" element={!authGOV ? <GOVLoginPage /> : <Navigate to="/gov" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App;