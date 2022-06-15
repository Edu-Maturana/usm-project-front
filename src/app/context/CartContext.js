import { createContext } from "react";

const CartContext = createContext({
    products: 0,
    addProduct: () => null,
    getProducts: () => null,
    removeProduct: () => null,
    clearCart: () => null,
});

export default CartContext;