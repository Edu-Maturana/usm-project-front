import React, { useState, useEffect } from 'react'
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "./Cart.css";
import { Link } from "react-router-dom";


import useCart from '../../hooks/useCart';
import { getProduct } from '../../api/products';


export default function Cart(props) {
    const { getProducts } = useCart();
    const products = getProducts();
    const [reloadCart, setReloadCart] = useState(false);
    const buttonsVisible = props.buttonsVisible;
    return (
        <Sidebar
            visible={props.visible}
            position="right"
            onHide={() => props.hide(false)}
        >   <h2>Carro</h2>
            {
                products.length > 0 ? (
                    <ProductsCart
                        products={products}
                        reloadCart={reloadCart}
                        setReloadCart={setReloadCart}
                        buttonsVisible={buttonsVisible}
                    />

                ) : (
                    <EmptyCart />
                )
            }
        </Sidebar>
    )


}

export function ProductsCart(props) {
    const { products, reloadCart, setReloadCart } = props;
    const [productsData, setProductsData] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const { removeProduct, clearCart } = useCart();
    const buttonsVisible = props.buttonsVisible;
    const whatsAppUrl = "https://wa.me/56996977928?text=";

    useEffect(() => {
        (async () => {
            const productsTemp = [];
            let totalPriceTemp = 0;
            for await (const product of products) {
                const data = await getProduct(product);
                console.log(data);
                productsTemp.push(data);
                totalPriceTemp += data.price;
            }
            console.log(productsTemp);
            setProductsData(productsTemp);
            setTotalPrice(totalPriceTemp);
        })();
    }, [reloadCart, products]);

    const removeProductFromCart = (product) => {
        removeProduct(product);
        setReloadCart(true);
        console.log(product);
    };

    const clearProductsCart = () => {
        clearCart();
        setReloadCart(true);
    }

    return (
        <div className="ProductsCart">
            <div className="cart-items">
                {productsData &&
                    productsData.map((item) => (
                        <div className="cart-item" key={item.ID}>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="item-img"
                            />
                            <div className="cart-item-info">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-price">${item.price}</p>
                            </div>

                            <i
                                className="pi pi-trash delete-item"
                                style={{ fontSize: "1.2em" }}
                                onClick={() => removeProductFromCart(item.ID)}
                            />
                        </div>
                    ))}
                <p className="total-price">
                    Precio total: <b>${totalPrice}</b>
                </p>
            </div>
            <div className="cart-buttons">
                {
                    buttonsVisible ? (
                        <>
                            <Button
                                label="Limpiar carro"
                                className="p-button-text"
                                onClick={() => clearProductsCart()}
                            />
                            <Link to="/order">
                                <Button
                                    label="Hacer pedido"
                                    className="p-button"
                                />
                            </Link>
                        </>
                        
                    ) : (
                        null
                    )
                }

            </div>
        </div>
    );
}

export function EmptyCart() {
    return (
        <div className="cart-empty">
            <p>No has añadido ningún producto aún.</p>
        </div>
    );
}
