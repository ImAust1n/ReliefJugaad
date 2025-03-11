import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer.jsx'
import { Loader } from 'lucide-react'

import HomePage from './pages/HomePage.tsx'

import ChooseLogin from './pages/ChooseLogin'
import AboutUs from './pages/AboutUs.tsx'
import EmergencyContacts from './pages/EmergencyContacts.jsx';
import DropPointsPage from './pages/DropPointsPage'

import DonorPage from './pages/DonorPage'
import DonatePage from './pages/DonatePage.tsx'
import DonorSignUpPage from './pages/DonorSignUpPage'
import DonorLoginPage from './pages/DonorLoginPage'

import LoginPage from './pages/LoginPage'

import NGOPage from './pages/NGOPage'
import WarehousePage from './pages/WarehousePage.jsx'
import InventoryPage from './pages/InventoryPage.tsx' 
import NGOSignUpPage from './pages/NGOSignUpPage'
import NGOLoginPage from './pages/NGOLoginPage'

import GOVPage from './pages/GOVPage'
import CampPage from './pages/CampPage'
import RequirementPage from './pages/RequirementPage.tsx'
import GOVSignUpPage from './pages/GOVSignUpPage'
import GOVLoginPage from './pages/GOVLoginPage'
import SOSReliefPage from './pages/SOSReliefPage.jsx'
import GOVInventoryPage from './pages/GOVInventoryPage'
import { useAuthStore } from './store/useAuthStore.js'
import { useNGOStore } from './store/useNGOStore.js'
import { useGOVStore } from './store/useGOVStore.js'
import { useDisasterStore } from './store/useDisasterStore.js'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  const { authUser, checkAuth: checkAuthUser, isCheckingAuth: isCheckingAuthUser } = useAuthStore();
  const { authNGO, checkAuth: checkAuthNGO, isCheckingAuth: isCheckingAuthNGO } = useNGOStore();
  const { authGOV, checkAuth: checkAuthGOV, isCheckingAuth: isCheckingAuthGOV } = useGOVStore();
  const { disasters, getAllDisasters } = useDisasterStore();
  
  useEffect(() => {
    checkAuthUser();
    checkAuthNGO();
    checkAuthGOV();
    getAllDisasters();
  }, [checkAuthUser, checkAuthNGO, checkAuthGOV, getAllDisasters]);

  if (isCheckingAuthUser || isCheckingAuthNGO || isCheckingAuthGOV) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<ChooseLogin/>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />
        <Route path="/drop-points" element={<DropPointsPage />} />

        {/* <Route path="/donor" element={authUser ? <DonorPage /> : <Navigate to="/donor-login" />} /> */}
        <Route path="/donor" element={authUser ? <DonatePage /> : <Navigate to="/donor-login" />} />
        <Route path="/donor-signup" element={!authUser ? <DonorSignUpPage /> : <Navigate to="/donor" />} />
        <Route path="/donor-login" element={!authUser ? <DonorLoginPage /> : <Navigate to="/donor" />} />

        <Route path="/ngo" element={authNGO ? <NGOPage /> : <Navigate to="/ngo-login" />} />
        <Route path="/ngo-warehouse" element={authNGO ? <WarehousePage /> : <Navigate to="/ngo-login" />} />
        <Route path="/ngo-inventory" element={authNGO ? <InventoryPage /> : <Navigate to="/ngo-login" />} />
        <Route path="/ngo-camp" element={authNGO ? <Navigate to="/gov-camp" /> : <Navigate to="/ngo-login" />} />
        <Route path="/ngo-signup" element={!authNGO ? <NGOSignUpPage /> : <Navigate to="/ngo" />} />
        <Route path="/ngo-login" element={!authNGO ? <NGOLoginPage /> : <Navigate to="/ngo" />} />

        <Route path="/gov" element={authGOV ? <GOVPage /> : <Navigate to="/gov-login" />} />
        <Route path="/gov-camp" element={(authNGO || authGOV) ? <CampPage /> : <Navigate to="/login" />} />
        <Route path="/gov-sos-relief" element={<SOSReliefPage />}></Route>
        <Route path="/gov-requirement" element={authGOV ? <RequirementPage /> : <Navigate to="/gov-login" />} />
        <Route path="/gov-inventory" element={authGOV ? <GOVInventoryPage /> : <Navigate to="/gov-login" />} />
        <Route path="/gov-signup" element={!authGOV ? <GOVSignUpPage /> : <Navigate to="/gov" />} />
        <Route path="/gov-login" element={!authGOV ? <GOVLoginPage /> : <Navigate to="/gov" />} />
      </Routes>

      <Footer />

      <Toaster />
    </div>
  )
}

export default App;