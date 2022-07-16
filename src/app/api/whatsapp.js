export default function buildMessage(name, address, products, totalPrice) {
  let message = `Hola! Mi nombre es ${name}, mi dirección es ${address} y quisiera hacer la compra de los siguientes productos:%0a`;

  for (let product of products) {
    message += `%0aID: ${product.id}%0a${product.name}%0aPrecio: $${product.price}%0aCantidad: ${product.quantity}%0a`;
  }

  message += `%0aTotal: $${totalPrice}`;
  return message;
}
