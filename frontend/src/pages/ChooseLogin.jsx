import React from 'react'
import Header from '../components/Header'
import LoginCard from '../components/LoginCard'

const ChooseLogin = () => {
  return (
    <div className="vh-100 flex flex-col justify-center items-center">
      <div className="flex flex-col pt-50 md:flex-row justify-around items-center gap-50">
          {/* <LoginCard title="Donor / Volunteer" imgSrc="https://via.placeholder.com/150" />
          <LoginCard title="NGO" imgSrc="https://via.placeholder.com/150" />
          <LoginCard title="Government" imgSrc="https://via.placeholder.com/150" /> */}
      </div>
    </div>
  )
}

export default ChooseLogin;