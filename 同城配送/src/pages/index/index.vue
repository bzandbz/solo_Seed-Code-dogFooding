<template>
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
          v-for="item in hotProducts" 
          :key="item.id" 
          class="product-card"
          @click="goToDetail(item.id)"
        >
          <view class="product-image-wrapper">
            <image class="product-image" :src="item.image" mode="aspectFill" />
            <view v-if="item.discount" class="discount-tag">
              <text class="discount-text">{{ item.discount }}</text>
            </view>
          </view>
          <view class="product-info">
            <text class="product-name" :numberOfLines="2">{{ item.name }}</text>
            <view class="product-price-row">
              <text class="product-price">¥{{ item.price }}</text>
              <text class="product-original-price">¥{{ item.originalPrice }}</text>
            </view>
            <view class="product-sales">
              <text class="sales-text">已售{{ item.sales }}件</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { categories, hotProducts } from '@/static/data/mockData.js'

export default {
  data() {
    return {
      categories: categories,
      hotProducts: hotProducts,
      searchValue: ''
    }
  },
  onLoad() {
    console.log('首页加载')
  },
  methods: {
    onSearch() {
      if (this.searchValue.trim()) {
        uni.showToast({
          title: '搜索: ' + this.searchValue,
          icon: 'none'
        })
      }
    },
    goToCategory(categoryId) {
      uni.switchTab({
        url: '/pages/category/category'
      })
    },
    goToDetail(productId) {
      uni.showToast({
        title: '商品详情ID: ' + productId,
        icon: 'none'
      })
    }
  }
}
</script>

<style scoped>
.index-container {
  background-color: #F5F5F5;
  min-height: 100vh;
  padding-bottom: 20rpx;
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
  margin-bottom: 12rpx;
}

.product-price-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 8rpx;
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
</style>
