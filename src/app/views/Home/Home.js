import React from 'react'
import "./Home.css";

import Header from '../../components/Header/Header'
import BannerGallery from '../../components/BannerGallery/BannerGallery';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Home() {
  return (
    <div className='home'>
        <Header />
        <BannerGallery />
        <ProductCard />
    </div>
  )
}
