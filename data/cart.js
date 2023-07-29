export const cart = [];

export function addToCart(productId, addedMessageTimeouts) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const selectedQuantity = document.querySelector(
    `.js-quantity-selector-${productId}`
  ).value;

  const addMessage = document.querySelector(`.js-added-${productId}`);
  addMessage.classList.add("added-to-cart-on");

  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeOutId = setTimeout(() => {
    addMessage.classList.remove("added-to-cart-on");
  }, 2000);

  addedMessageTimeouts[productId] = timeOutId;

  if (matchingItem) {
    matchingItem.quantity += Number(selectedQuantity);
  } else {
    cart.push({
      productId: productId,
      quantity: Number(selectedQuantity),
    });
  }
}
