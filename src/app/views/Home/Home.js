import React from 'react'
import "./Home.css";

import Header from '../../components/Header/Header'
import BannerGallery from '../../components/BannerGallery/BannerGallery';

export default function Home() {
  return (
    <div className='home'>
        <Header />
        <BannerGallery />
    </div>
  )
}
