import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import HomeSection2 from '../components/HomeSection2'
import HomeSection3 from '../components/HomeSection3'
import HomeSection4 from '../components/HomeSection4'
import News from '../components/News'
import { useDisasterStore } from '../store/useDisasterStore'
import ChatBotApp from '../components/ChatBotApp'


const HomePage = () => {
  const { getNasaDisasters } = useDisasterStore();

  useEffect(() => {
    getNasaDisasters();
  }, []);

  return (
    <div className=''>
      <Carousel />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <News />
      <ChatBotApp />
    </div>
  )
}

export default HomePage;
