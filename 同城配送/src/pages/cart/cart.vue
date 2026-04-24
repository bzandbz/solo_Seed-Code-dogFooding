<template>
  <view class="cart-container">
    <scroll-view scroll-y class="cart-scroll" v-if="cartList.length > 0">
      <view class="cart-list">
        <view 
          v-for="item in cartList" 
          :key="item.id" 
          class="cart-item"
        >
          <view class="check-wrapper" @click="toggleCheck(item.id)">
            <view class="check-box" :class="{ checked: item.checked }">
              <text v-if="item.checked" class="check-icon">✓</text>
            </view>
          </view>
          
          <image class="product-image" :src="item.image" mode="aspectFill" />
          
          <view class="product-info">
            <text class="product-name" :numberOfLines="2">{{ item.name }}</text>
            
            <view class="price-section">
              <text class="product-price">¥{{ item.price }}</text>
            </view>
            
            <view class="bottom-section">
              <view class="quantity-control">
                <view class="quantity-btn" @click="decreaseQuantity(item)">
                  <text class="quantity-icon">-</text>
                </view>
                <text class="quantity-text">{{ item.quantity }}</text>
                <view class="quantity-btn" @click="increaseQuantity(item)">
                  <text class="quantity-icon">+</text>
                </view>
              </view>
              
              <view class="subtotal-section">
                <text class="subtotal-label">小计：</text>
                <text class="subtotal-price">¥{{ (item.price * item.quantity).toFixed(2) }}</text>
              </view>
            </view>
          </view>
          
          <view class="delete-btn" @click="deleteItem(item.id)">
            <text class="delete-icon">🗑️</text>
          </view>
        </view>
      </view>
      
      <view class="bottom-placeholder"></view>
    </scroll-view>
    
    <view class="empty-cart" v-else>
      <view class="empty-icon">
        <text class="empty-text">🛒</text>
      </view>
      <text class="empty-title">购物车空空如也</text>
      <text class="empty-desc">快去逛逛，把心仪商品加入购物车吧~</text>
      <view class="go-shopping-btn" @click="goShopping">
        <text class="btn-text">去逛逛</text>
      </view>
    </view>
    
    <view class="cart-footer" v-if="cartList.length > 0">
      <view class="footer-left">
        <view class="check-wrapper" @click="toggleAllCheck">
          <view class="check-box" :class="{ checked: isAllChecked }">
            <text v-if="isAllChecked" class="check-icon">✓</text>
          </view>
        </view>
        <text class="select-all-text">全选</text>
      </view>
      
      <view class="footer-right">
        <view class="total-info">
          <view class="total-row">
            <text class="total-label">共{{ checkedCount }}件商品</text>
          </view>
          <view class="total-row amount-row">
            <text class="total-label">合计：</text>
            <text class="total-price">¥{{ totalPrice.toFixed(2) }}</text>
          </view>
        </view>
        
        <view class="submit-btn" :class="{ disabled: checkedCount === 0 }" @click="submitOrder">
          <text class="submit-text">提交订单</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import cartUtils from '@/utils/cart.js'

export default {
  data() {
    return {
      cartList: []
    }
  },
  computed: {
    isAllChecked() {
      if (this.cartList.length === 0) return false
      return this.cartList.every(item => item.checked)
    },
    totalPrice() {
      const checkedItems = this.cartList.filter(item => item.checked)
      return checkedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    allTotalPrice() {
      return this.cartList.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    checkedCount() {
      const checkedItems = this.cartList.filter(item => item.checked)
      return checkedItems.reduce((total, item) => total + item.quantity, 0)
    },
    allCount() {
      return this.cartList.reduce((total, item) => total + item.quantity, 0)
    }
  },
  onLoad() {
    console.log('购物车页面加载')
  },
  onShow() {
    this.loadCart()
  },
  methods: {
    loadCart() {
      this.cartList = cartUtils.getCart()
    },
    
    toggleCheck(productId) {
      cartUtils.toggleCheck(productId)
      this.loadCart()
    },
    
    toggleAllCheck() {
      const newCheckState = !this.isAllChecked
      cartUtils.toggleAllCheck(newCheckState)
      this.loadCart()
    },
    
    decreaseQuantity(item) {
      if (item.quantity <= 1) {
        uni.showModal({
          title: '提示',
          content: '确定要删除该商品吗？',
          success: (res) => {
            if (res.confirm) {
              this.deleteItem(item.id)
            }
          }
        })
        return
      }
      cartUtils.updateQuantity(item.id, item.quantity - 1)
      this.loadCart()
    },
    
    increaseQuantity(item) {
      cartUtils.updateQuantity(item.id, item.quantity + 1)
      this.loadCart()
    },
    
    deleteItem(productId) {
      cartUtils.removeFromCart(productId)
      this.loadCart()
      uni.showToast({
        title: '已删除',
        icon: 'success'
      })
    },
    
    goShopping() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    },
    
    goSettle() {
      if (this.checkedCount === 0) {
        uni.showToast({
          title: '请选择要结算的商品',
          icon: 'none'
        })
        return
      }
      uni.showToast({
        title: '去结算',
        icon: 'success'
      })
    },
    
    submitOrder() {
      if (this.checkedCount === 0) {
        uni.showToast({
          title: '请选择要提交的商品',
          icon: 'none'
        })
        return
      }
      uni.showToast({
        title: '提交订单',
        icon: 'success'
      })
    }
  }
}
</script>

<style scoped>
.cart-container {
  background-color: #F5F5F5;
  min-height: 100vh;
  position: relative;
  padding-bottom: 140rpx;
}

.cart-scroll {
  height: calc(100vh - 50px);
}

.cart-list {
  padding: 20rpx;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  position: relative;
}

.check-wrapper {
  padding: 10rpx;
  margin-right: 10rpx;
  margin-top: 60rpx;
}

.check-box {
  width: 40rpx;
  height: 40rpx;
  border: 2rpx solid #CCCCCC;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
}

.check-box.checked {
  background: linear-gradient(180deg, #FF6B6B 0%, #FF4D4F 100%);
  border-color: #FF4D4F;
}

.check-icon {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: bold;
}

.product-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 160rpx;
}

.product-name {
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  height: 80rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12rpx;
}

.price-section {
  margin-bottom: 12rpx;
}

.product-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF4D4F;
}

.bottom-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-btn {
  width: 48rpx;
  height: 48rpx;
  background-color: #F5F5F5;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:active {
  background-color: #EEEEEE;
}

.quantity-icon {
  font-size: 32rpx;
  color: #333333;
  font-weight: bold;
  line-height: 1;
}

.quantity-text {
  font-size: 28rpx;
  color: #333333;
  font-weight: bold;
  margin: 0 20rpx;
  min-width: 40rpx;
  text-align: center;
}

.subtotal-section {
  display: flex;
  align-items: baseline;
}

.subtotal-label {
  font-size: 24rpx;
  color: #666666;
}

.subtotal-price {
  font-size: 30rpx;
  font-weight: bold;
  color: #FF4D4F;
}

.delete-btn {
  position: absolute;
  right: 10rpx;
  top: 10rpx;
  padding: 10rpx;
}

.delete-icon {
  font-size: 32rpx;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
  padding-bottom: 140rpx;
}

.empty-icon {
  width: 200rpx;
  height: 200rpx;
  background-color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.empty-text {
  font-size: 80rpx;
}

.empty-title {
  font-size: 32rpx;
  color: #333333;
  font-weight: bold;
  margin-bottom: 16rpx;
}

.empty-desc {
  font-size: 26rpx;
  color: #999999;
  margin-bottom: 40rpx;
}

.go-shopping-btn {
  background: linear-gradient(180deg, #FF6B6B 0%, #FF4D4F 100%);
  padding: 20rpx 60rpx;
  border-radius: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(255, 77, 79, 0.3);
}

.btn-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: bold;
}

.cart-footer {
  position: fixed;
  bottom: 100rpx;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  padding: 20rpx 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.06);
  z-index: 100;
}

.footer-left {
  display: flex;
  align-items: center;
}

.select-all-text {
  font-size: 28rpx;
  color: #333333;
  margin-left: 8rpx;
}

.footer-right {
  display: flex;
  align-items: center;
}

.total-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 20rpx;
}

.total-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 4rpx;
}

.total-row:last-child {
  margin-bottom: 0;
}

.amount-row {
  font-size: 28rpx;
}

.total-label {
  font-size: 24rpx;
  color: #666666;
}

.amount-row .total-label {
  font-size: 26rpx;
  color: #333333;
}

.total-price {
  font-size: 36rpx;
  font-weight: bold;
  color: #FF4D4F;
}

.submit-btn {
  background: linear-gradient(180deg, #FF6B6B 0%, #FF4D4F 100%);
  padding: 20rpx 40rpx;
  border-radius: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(255, 77, 79, 0.3);
  min-width: 180rpx;
  text-align: center;
}

.submit-btn:active {
  opacity: 0.8;
  transform: scale(0.98);
}

.submit-btn.disabled {
  background: #CCCCCC;
  box-shadow: none;
}

.submit-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: bold;
}

.bottom-placeholder {
  height: 260rpx;
}
</style>
