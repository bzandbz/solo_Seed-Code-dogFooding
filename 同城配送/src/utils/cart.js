const CART_STORAGE_KEY = 'delivery_cart'

export const cartUtils = {
  getCart() {
    try {
      const cart = uni.getStorageSync(CART_STORAGE_KEY)
      return cart ? JSON.parse(cart) : []
    } catch (e) {
      console.error('获取购物车失败:', e)
      return []
    }
  },

  setCart(cart) {
    try {
      uni.setStorageSync(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (e) {
      console.error('保存购物车失败:', e)
    }
  },

  addToCart(product) {
    const cart = this.getCart()
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        checked: true
      })
    }

    this.setCart(cart)
    return cart
  },

  removeFromCart(productId) {
    const cart = this.getCart()
    const newCart = cart.filter(item => item.id !== productId)
    this.setCart(newCart)
    return newCart
  },

  updateQuantity(productId, quantity) {
    const cart = this.getCart()
    const item = cart.find(item => item.id === productId)

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId)
      }
      item.quantity = quantity
      this.setCart(cart)
    }

    return cart
  },

  toggleCheck(productId) {
    const cart = this.getCart()
    const item = cart.find(item => item.id === productId)

    if (item) {
      item.checked = !item.checked
      this.setCart(cart)
    }

    return cart
  },

  toggleAllCheck(isChecked) {
    const cart = this.getCart()
    cart.forEach(item => {
      item.checked = isChecked
    })
    this.setCart(cart)
    return cart
  },

  clearCart() {
    try {
      uni.removeStorageSync(CART_STORAGE_KEY)
    } catch (e) {
      console.error('清空购物车失败:', e)
    }
    return []
  },

  getCartCount() {
    const cart = this.getCart()
    return cart.reduce((total, item) => total + item.quantity, 0)
  },

  getCartTotal() {
    const cart = this.getCart()
    const checkedItems = cart.filter(item => item.checked)
    return checkedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  getCheckedItems() {
    const cart = this.getCart()
    return cart.filter(item => item.checked)
  },

  isAllChecked() {
    const cart = this.getCart()
    if (cart.length === 0) return false
    return cart.every(item => item.checked)
  }
}

export default cartUtils
