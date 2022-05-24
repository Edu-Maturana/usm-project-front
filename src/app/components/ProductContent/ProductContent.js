import React, { useEffect, useState } from 'react'
import "./ProductContent.css";
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";

import { getProduct } from '../../api/products';

export default function ProductContent() {
    const id = window.location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const quantities = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' }
    ];
    useEffect(() => {
        getProduct(id)
            .then(product => setProduct(product));
    }, [id]);

    return (
        <div className="ProductContent">
            <img src={product.image} alt={product.name} />
            <div className="ProductData">
                <p className='Description'> {`Productos > ${product.name}`}</p>
                <h1>{product.name}</h1>
                <p className='Description'>{product.description}</p>
                <p className="Price">${product.price}</p>
                <Dropdown value={quantity} options={quantities} onChange={(e) => setQuantity(e.value)} placeholder="1" />
                <Button label="Añadir al carrito" />
            </div>
        </div>
    )
}

