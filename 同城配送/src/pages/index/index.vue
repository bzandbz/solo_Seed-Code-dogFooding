<template>
  <scroll-view 
    scroll-y 
    class="index-scroll"
    @scrolltolower="onScrollToLower"
  >
    <view class="index-container">
      <!-- 搜索框 -->
      <view class="search-bar">
        <view class="search-box">
          <text class="search-icon">🔍</text>
          <input 
            class="search-input" 
            type="text" 
            placeholder="搜索商品、店铺" 
            placeholder-class="placeholder-style"
            v-model="searchValue"
            @confirm="onSearch"
          />
        </view>
        <text class="search-btn" @click="onSearch">搜索</text>
      </view>

      <!-- 轮播区域占位 -->
      <view class="banner-section">
        <image 
          class="banner-img" 
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=promotion%20banner%20supermarket%20delivery%20red%20colorful&image_size=landscape_16_9" 
          mode="aspectFill"
        />
      </view>

      <!-- 配送品类分类入口 -->
      <view class="category-section">
        <view class="section-title">
          <text class="title-text">配送品类</text>
        </view>
        <scroll-view scroll-x class="category-scroll">
          <view class="category-list">
            <view 
              v-for="item in categories" 
              :key="item.id" 
              class="category-item"
              @click="goToCategory(item.id)"
            >
              <image class="category-icon" :src="item.icon" mode="aspectFill" />
              <text class="category-name">{{ item.name }}</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 爆款商品列表 -->
      <view class="hot-section">
        <view class="section-title">
          <text class="title-text">🔥 爆款推荐</text>
        </view>
        <view class="product-grid">
          <view 
            v-for="item in displayProducts" 
            :key="item.id" 
            class="product-card"
          >
            <view class="product-image-wrapper" @click="goToDetail(item.id)">
              <image class="product-image" :src="item.image" mode="aspectFill" />
              <view v-if="item.discount" class="discount-tag">
                <text class="discount-text">{{ item.discount }}</text>
              </view>
            </view>
            <view class="product-info">
              <view class="product-name-wrapper" @click="goToDetail(item.id)">
                <text class="product-name" :numberOfLines="2">{{ item.name }}</text>
              </view>
              <view class="product-bottom">
                <view class="price-section">
                  <view class="product-price-row">
                    <text class="product-price">¥{{ item.price }}</text>
                    <text class="product-original-price" v-if="item.originalPrice">¥{{ item.originalPrice }}</text>
                  </view>
                  <view class="product-sales">
                    <text class="sales-text">已售{{ item.sales }}件</text>
                  </view>
                </view>
                <view class="add-cart-btn" @click.stop="addToCart(item)">
                  <text class="add-icon">+</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载更多提示 -->
      <view class="loading-section" v-if="loading || !hasMore">
        <text class="loading-text" v-if="loading">正在加载更多...</text>
        <text class="loading-text" v-else>没有更多了</text>
      </view>

      <!-- 底部占位（为tabbar预留空间） -->
      <view class="bottom-placeholder"></view>
    </view>
  </scroll-view>
</template>

<script>
import { categories, hotProducts } from '@/static/data/mockData.js'
import cartUtils from '@/utils/cart.js'

export default {
  data() {
    return {
      categories: categories,
      allHotProducts: hotProducts,
      displayProducts: [],
      searchValue: '',
      page: 1,
      pageSize: 8,
      loading: false,
      hasMore: true
    }
  },
  onLoad() {
    console.log('首页加载')
    this.loadMoreProducts()
  },
  methods: {
    onScrollToLower() {
      console.log('scroll-view触底了，加载更多')
      if (!this.loading && this.hasMore) {
        this.page++
        this.loadMoreProducts()
      }
    },
    loadMoreProducts() {
      if (this.loading) return
      
      this.loading = true
      
      setTimeout(() => {
        const startIndex = (this.page - 1) * this.pageSize
        const endIndex = startIndex + this.pageSize
        const newProducts = this.allHotProducts.slice(startIndex, endIndex)
        
        if (newProducts.length > 0) {
          this.displayProducts = [...this.displayProducts, ...newProducts]
          this.hasMore = this.displayProducts.length < this.allHotProducts.length
        } else {
          this.hasMore = false
        }
        
        this.loading = false
      }, 500)
    },
    onSearch() {
      if (this.searchValue.trim()) {
        uni.showToast({
          title: '搜索: ' + this.searchValue,
          icon: 'none'
        })
      }
    },
    goToCategory(categoryId) {
      uni.setStorageSync('targetCategoryId', categoryId)
      uni.switchTab({
        url: '/pages/category/category'
      })
    },
    goToDetail(productId) {
      uni.showToast({
        title: '商品详情ID: ' + productId,
        icon: 'none'
      })
    },
    addToCart(product) {
      cartUtils.addToCart(product)
      uni.showToast({
        title: '已加入购物车',
        icon: 'success'
      })
    }
  }
}
</script>

<style scoped>
.index-scroll {
  width: 100%;
  height: calc(100vh - 50px);
}

.index-container {
  background-color: #F5F5F5;
}

/* 搜索框样式 */
.search-bar {
  background: linear-gradient(180deg, #FF6B6B 0%, #FF8E8E 100%);
  padding: 20rpx 30rpx;
  display: flex;
  align-items: center;
}

.search-box {
  flex: 1;
  background-color: #FFFFFF;
  border-radius: 40rpx;
  padding: 16rpx 24rpx;
  display: flex;
  align-items: center;
}

.search-icon {
  font-size: 32rpx;
  margin-right: 16rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #333333;
  height: 40rpx;
  line-height: 40rpx;
}

.placeholder-style {
  color: #999999;
}

.search-btn {
  font-size: 28rpx;
  color: #FFFFFF;
  margin-left: 20rpx;
  padding: 16rpx 24rpx;
  border-radius: 40rpx;
  background-color: rgba(255, 255, 255, 0.2);
}

/* 轮播区域 */
.banner-section {
  padding: 20rpx;
}

.banner-img {
  width: 100%;
  height: 300rpx;
  border-radius: 16rpx;
}

/* 分类区域 */
.category-section {
  background-color: #FFFFFF;
  margin: 20rpx;
  border-radius: 16rpx;
  padding: 20rpx;
}

.section-title {
  margin-bottom: 20rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.category-scroll {
  white-space: nowrap;
}

.category-list {
  display: flex;
}

.category-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 140rpx;
  margin-right: 20rpx;
}

.category-item:last-child {
  margin-right: 0;
}

.category-icon {
  width: 90rpx;
  height: 90rpx;
  border-radius: 16rpx;
  margin-bottom: 12rpx;
}

.category-name {
  font-size: 24rpx;
  color: #666666;
  text-align: center;
}

/* 爆款商品区域 */
.hot-section {
  background-color: #FFFFFF;
  margin: 20rpx;
  border-radius: 16rpx;
  padding: 20rpx;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-card {
  width: 48%;
  background-color: #FFFFFF;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  height: 300rpx;
}

.product-image {
  width: 100%;
  height: 100%;
}

.discount-tag {
  position: absolute;
  top: 12rpx;
  left: 12rpx;
  background: linear-gradient(90deg, #FF4D4F 0%, #FF7875 100%);
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.discount-text {
  font-size: 20rpx;
  color: #FFFFFF;
}

.product-info {
  padding: 16rpx;
  display: flex;
  flex-direction: column;
}

.product-name-wrapper {
  margin-bottom: 12rpx;
}

.product-name {
  font-size: 26rpx;
  color: #333333;
  line-height: 36rpx;
  height: 72rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.price-section {
  display: flex;
  flex-direction: column;
}

.product-price-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 4rpx;
}

.product-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF4D4F;
  margin-right: 12rpx;
}

.product-original-price {
  font-size: 22rpx;
  color: #999999;
  text-decoration: line-through;
}

.product-sales {
  display: flex;
  align-items: center;
}

.sales-text {
  font-size: 22rpx;
  color: #999999;
}

.add-cart-btn {
  width: 48rpx;
  height: 48rpx;
  background: linear-gradient(180deg, #FF6B6B 0%, #FF4D4F 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 8rpx rgba(255, 77, 79, 0.3);
  flex-shrink: 0;
}

.add-cart-btn:active {
  transform: scale(0.9);
  box-shadow: 0 2rpx 4rpx rgba(255, 77, 79, 0.3);
}

.add-icon {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: bold;
  line-height: 1;
}

/* 加载区域 */
.loading-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx 0;
}

.loading-text {
  font-size: 26rpx;
  color: #999999;
}

/* 底部占位（额外一点空间，不需要太高） */
.bottom-placeholder {
  height: 40rpx;
}
</style>
