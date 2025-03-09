import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import HomeSection2 from '../components/HomeSection2'
import HomeSection3 from '../components/HomeSection3'
import HomeSection4 from '../components/HomeSection4'
import News from '../components/News'

const HomePage = () => {

  return (
    <div className='pt-20 xl:pt-0'>
      <Carousel />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <News />
    </div>
  )
}

export default HomePage;
