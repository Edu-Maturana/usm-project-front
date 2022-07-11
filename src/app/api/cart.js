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

export function addProductToCart(product, quantity) {
  console.log(product, quantity);
  const cart = getProductsCart();

  let productAdded = {
    product: product,
    quantity: quantity,
  };

  if (!cart) {
    localStorage.setItem("cart", JSON.stringify([productAdded]));
    toast.success("Producto añadido al carro");
  } else {
    console.log(cart.find((item) => item.product == productAdded.product));
    const ProductFound = cart.find(
      (item) => item.product == productAdded.product
    );
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

export function clearCart() {
  localStorage.removeItem("cart");
}

export function removeProductFromCart(product) {
  const cart = getProductsCart();
  const newCart = cart.filter((item) => item != product);
  localStorage.setItem("cart", newCart);

  if (newCart.length === 0) {
    localStorage.removeItem("cart");
  }
}
