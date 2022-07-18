import { toast } from "react-toastify";

export function getProductsCart() {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    return [];
  } else {
    const cartArray = cart.split(",");
    return JSON.parse(cartArray);
  }
}

export function addProductToCart(id, quantity) {
  const cart = getProductsCart();

  let productAdded = {
    id: id,
    quantity: quantity,
  };

  if (!cart) {
    localStorage.setItem("cart", JSON.stringify([productAdded]));
    toast.success("Producto añadido al carro");
  } else {
    const ProductFound = cart.find((item) => item.id == productAdded.id);
    if (ProductFound) {
      toast.warning("El producto ya está en el carro");
    } else {
      cart.push(productAdded);
      localStorage.setItem("cart", JSON.stringify(cart));
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

export function updateProductFromCart(id, quantity) {
  const cart = getProductsCart();
  if (cart) {
    const productFound = cart.find((item) => item.id == id);
    if (productFound) {
      productFound.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function removeProductFromCart(id) {
  const cart = getProductsCart();
  const newCart = cart.filter((item) => item.id != id);
  localStorage.setItem("cart", JSON.stringify(newCart));

  if (newCart.length === 0) {
    localStorage.removeItem("cart");
  }
}
