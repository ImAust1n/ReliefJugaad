import React from 'react'
import Header from '../components/Header'
import LoginCard from '../components/LoginCard'
import { Link } from 'react-router-dom'
const ChooseLogin = () => {
  return (
    <div className="flex justify-center items-center min-h-screen pt-20 lg:pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full px-4">
        <Link to="/donor-login" className="no-underline">
          <LoginCard title="Donor / Volunteer" imgSrc="https://easydrawingguides.com/wp-content/uploads/2023/05/how-to-draw-an-easy-superman-featured-image-1200-480x480.png" />
        </Link>
        <Link to="/ngo-login" className="no-underline">
          <LoginCard title="NGO" imgSrc="https://t3.ftcdn.net/jpg/05/37/44/52/360_F_537445204_qpG8LQ6QNassV6OF987veg5sVs4neZzY.jpg" />
        </Link>
        <Link to="/gov-login" className="no-underline">
          <LoginCard title="Government" imgSrc="https://upload.wikimedia.org/wikipedia/en/6/6b/National_Disaster_Management_Authority_Logo.png" />
        </Link>
      </div>
    </div>
  )
}

export default ChooseLogin;