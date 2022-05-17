import React from 'react'
import "./AllProducts.css";

import Header from '../../components/Header/Header'
import ProductsList from '../../components/ProductsList/ProductsList'
import Footer from '../../components/Footer/Footer'

export default function AllProducts() {
  return (
    <div className='AllProducts'>
        <Header />
        <ProductsList home={false} />
        <Footer />
    </div>
  )
}
