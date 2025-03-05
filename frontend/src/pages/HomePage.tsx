import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import HomeSection2 from '../components/HomeSection2'
import WeatherCard from '../components/WeatherCard'
import HomeSection3 from '../components/HomeSection3'
import HomeSection4 from '../components/HomeSection4'

import { RefreshCw, Filter } from 'lucide-react';
import NewsSlider from '../components/NewsSlider';
import { fetchNews, fetchUpdatedNews } from '../services/newsService';
import { NewsItem, NewsCategory } from '../types/news';
import News from '../components/News'


const HomePage = () => {

  return (
    <div>
      <Header />
      <Carousel />
      <HomeSection2 />
      <div className='pt-220 xl:pt-0'>
        <HomeSection3 />
      </div>
      <HomeSection4 />
      <News />
    </div>
  )
}

export default HomePage;
