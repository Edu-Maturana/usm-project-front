import React, { useState, useEffect } from 'react'
import { Sidebar } from "primereact/sidebar";

import useCart from '../../hooks/useCart';
import { getProduct } from '../../api/products';

export default function Cart(props) {
    const { getProducts } = useCart();
    const products = getProducts();
    const { reloadCart, setReloadCart } = useState(false);
    const [productsData, setProductsData] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const { removeProduct } = useCart();

    useEffect(() => {
        (async () => {
            const productsTemp = [];
            let totalPriceTemp = 0;
            for await (const product of products) {
                const data = await getProduct(product);
                productsTemp.push(data);
                totalPriceTemp += data.data.product.price;
            }
            setProductsData(productsTemp);
            setTotalPrice(totalPriceTemp);
        })();
    }, [reloadCart, products]);

    const removeProductFromCart = (product) => {
        removeProduct(product);
        setReloadCart(true);
        console.log(product);
    };

    return (
        <div>
            <Sidebar
                visible={props.visible}
                position="right"
                onHide={() => props.hide(false)}
            >
                <h2>Carro</h2>
                <p>No hay productos en el Carro</p>
            </Sidebar>
        </div>
    )
}
