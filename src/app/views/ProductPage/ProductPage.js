import React from 'react'
import "./ProductPage.css";

import Header from '../../components/Header/Header';
import { ProductContent }  from '../../components/ProductContent/ProductContent';
import Footer from '../../components/Footer/Footer';

export default function ProductPage() {
    return (
        <div className='ProductPage'>
            <Header />
            <ProductContent />
            <Footer />
        </div>
    )
}
