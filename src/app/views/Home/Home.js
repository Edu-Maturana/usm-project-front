import React from 'react'
import "./Home.css";

import Header from '../../components/Header/Header'
import Shipping from '../../components/Shipping/Shipping';
import BannerGallery from '../../components/BannerGallery/BannerGallery';
import ProductsList from '../../components/ProductsList/ProductsList';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  return (
    <div className='home'>
        <Header />
        <Shipping />
        <BannerGallery />
        <ProductsList home={true} />
        <Footer />
    </div>
  )
}
