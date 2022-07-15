import React, { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "./Cart.css";
import { Link } from "react-router-dom";

import useCart from "../../hooks/useCart";
import { getProduct } from "../../api/products";


export default function Cart(props) {
  const { getProducts, updateProduct } = useCart();
  const products = getProducts();
  const [reloadCart, setReloadCart] = useState(false);
  const buttonsVisible = props.buttonsVisible;
  return (
    <Sidebar
      visible={props.visible}
      position="right"
      onHide={() => props.hide(false)}
    >
      {" "}
      <h2>Carro</h2>
      {products.length > 0 ? (
        <ProductsCart
          products={products}
          reloadCart={reloadCart}
          setReloadCart={setReloadCart}
          updateProduct={updateProduct}
          buttonsVisible={buttonsVisible}
        />
      ) : (
        <EmptyCart />
      )}
    </Sidebar>
  );
}

export function ProductsCart(props) {
  const id = window.location.pathname.split("/")[2];
  const { products, reloadCart, setReloadCart, updateProduct } = props;
  const [productsData, setProductsData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { removeProduct, clearCart } = useCart();
  const [product, setProduct] = useState({});
  const buttonsVisible = props.buttonsVisible;

  useEffect(() => {
    getProduct(id).then((product) => setProduct(product));
  }, []);

  const getStock = (product) => {
    if (product.stock === 100) {
      return 0;
    }
    return product.stock;
  }

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      let messageTemp = [];
      let totalPriceTemp = 0;
      for await (const product of products) {
        const data = await getProduct(product.id);
        productsTemp.push(data);
        messageTemp = [
          ...messageTemp,
          {
            id: data.ID,
            name: data.name,
            price: data.price,
            quantity: product.quantity,
          },
        ];
        totalPriceTemp += data.price * product.quantity;
      }
      console.log(productsTemp);
      setProductsData(productsTemp);
      setTotalPrice(totalPriceTemp);
      const message = {
        products: messageTemp,
        totalPrice: totalPriceTemp,
      };
      localStorage.setItem("message", JSON.stringify(message));
    })();
  }, [products, reloadCart]);

  const removeProductFromCart = (id) => {
    setProductsData(null);
    removeProduct(id);
    setReloadCart(true);
  };

  const clearProductsCart = () => {
    clearCart();
    setReloadCart(true);
  };

  const updateProductFromCart = (id, quantity) => {
    updateProduct(id, quantity);
    setReloadCart(true);
  }

  return (
    <div className="ProductsCart">
      <div className="cart-items">
        {productsData &&
          productsData.map((item) => (
            <div className="cart-item" key={item.ID}>
              <img src={item.image} alt={item.name} className="item-img" />
              <div className="cart-item-info">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">
                  Cantidad:{" "}
                  {products.find((product) => product.id == item.ID).quantity}
                </p>
                <p className="item-price">${item.price}</p>
                <InputNumber
                  disabled={getStock(product) === 0}
                  className="HorizontalBar"
                  min={1}
                  max={getStock(product)}
                  value={products.find((product) => product.id == item.ID).quantity}
                  onChange={(e) => {
                    updateProductFromCart(item.ID, e.value);
                  }
                  }
                  showButtons
                  buttonLayout="horizontal"
                  decrementButtonClassName="p-button-danger"
                  incrementButtonClassName="p-button-success"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  size={1}
                  allowEmpty={false}
                />
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
        {buttonsVisible ? (
          <>
            <Button
              label="Limpiar carro"
              className="p-button-text"
              onClick={() => clearProductsCart()}
            />
            <Link to="/order">
              <Button label="Hacer pedido" className="p-button" />
            </Link>
          </>
        ) : null}
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
