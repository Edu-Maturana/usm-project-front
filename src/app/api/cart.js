import { toast } from 'react-toastify';

export function getProductsCart() {
    const cart = localStorage.getItem("cart");

    if (!cart) {
        return [];
    } else {
        const cartArray = cart.split(",");
        return cartArray;
    }
}

export function addProductToCart(product) {
    const cart = getProductsCart();
    if (!cart) {
        localStorage.setItem("cart", product);
        toast.success("Producto añadido al carro");
    } else {
        const ProductFound = cart.find((item) => item == product);
        console.log(ProductFound);
        if (ProductFound) {
            toast.warning("El producto ya está en el carro");
        } else {
            cart.push(product);
            localStorage.setItem("cart", cart);
            toast.success("Producto añadido al carro");
        }
    }
}

export function countProductsCart() {
    const cart = getProductsCart();
    if (!cart) {
        return 0;
    } else {
        return cart.length;
    }
}

export function clearCart() {
    localStorage.removeItem("cart");
}

export function removeProductFromCart(product) {
    const cart = getProductsCart();
    const newCart = cart.filter((item) => item !== product);
    localStorage.setItem("cart", newCart);

    if (newCart.length === 0) {
        localStorage.removeItem("cart");
    }
}