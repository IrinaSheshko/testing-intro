function addToCart(cart, product, quantity = 1) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }
  if (quantity > product.stock) {
    throw new RangeError('Нельзя добавить больше, чем есть на складе');
  }

  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex !== -1) {
    const newQuantity = cart[existingIndex].quantity + quantity;
    if (newQuantity > product.stock) {
      throw new RangeError('Превышен остаток на складе');
    }
    const updatedCart = [...cart];
    updatedCart[existingIndex] = { ...updatedCart[existingIndex], quantity: newQuantity };
    return updatedCart;
  }

  return [...cart, { ...product, quantity }];
}


function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  const item = cart.find(p => p.id === productId);
  if (!item) {
    return cart; 
  }

  if (quantity > item.stock) {
    throw new RangeError('Количество превышает остаток на складе');
  }

  return cart.map(p => p.id === productId ? { ...p, quantity } : p);
}


function removeFromCart(cart, productId) {
  return cart.filter(item => item.id !== productId);
}


function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}


function calculateOrderTotal(cart, promoCode = '') {
  const subtotal = calculateCartSubtotal(cart);
  
  let discount = 0;
  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

  const discountedSubtotal = subtotal - discount;
  const delivery = subtotal >= 50000 ? 0 : 30000;
  const total = discountedSubtotal + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

module.exports = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};
