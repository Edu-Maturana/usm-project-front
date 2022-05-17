import React from 'react'
import "./Home.css";

import Header from '../../components/Header/Header'
import BannerGallery from '../../components/BannerGallery/BannerGallery';
import ProductsList from '../../components/ProductsList/ProductsList';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  return (
    <div className='home'>
        <Header />
        <BannerGallery />
        <ProductsList />
        <Footer />
    </div>
  )
}
