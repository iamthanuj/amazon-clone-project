export let cart = JSON.parse(localStorage.getItem("saveCart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function saveToLocalStorage(){
  localStorage.setItem("saveCart", JSON.stringify(cart));
}


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
  saveToLocalStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  
  saveToLocalStorage();
}
