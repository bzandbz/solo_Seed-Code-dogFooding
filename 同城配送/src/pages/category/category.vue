<template>
  <view class="category-container">
    <view class="category-layout">
      <!-- 左侧一级分类栏 -->
      <scroll-view scroll-y class="left-category">
        <view 
          v-for="item in categories" 
          :key="item.id" 
          class="category-item"
          :class="{ active: activeCategoryId === item.id }"
          @click="selectCategory(item.id)"
        >
          <text class="category-name">{{ item.name }}</text>
          <view v-if="activeCategoryId === item.id" class="active-line"></view>
        </view>
      </scroll-view>

      <!-- 右侧商品展示区 -->
      <scroll-view scroll-y class="right-content">
        <!-- 二级分类 -->
        <view class="sub-category-section">
          <view class="sub-category-list">
            <view 
              v-for="item in currentCategory.children" 
              :key="item.id" 
              class="sub-category-item"
              @click="selectSubCategory(item.id)"
            >
              <text class="sub-category-name">{{ item.name }}</text>
            </view>
          </view>
        </view>

        <!-- 商品列表 -->
        <view class="product-section">
          <view class="section-title">
            <text class="title-text">{{ currentCategory.name }}推荐</text>
          </view>
          <view class="product-list">
            <view 
              v-for="item in currentProducts" 
              :key="item.id" 
              class="product-card"
              @click="goToDetail(item.id)"
            >
              <image class="product-image" :src="item.image" mode="aspectFill" />
              <view class="product-info">
                <text class="product-name" :numberOfLines="2">{{ item.name }}</text>
                <view class="product-bottom">
                  <view class="price-row">
                    <text class="current-price">¥{{ item.price }}</text>
                  </view>
                  <view class="sales-info">
                    <text class="sales-text">已售{{ item.sales }}件</text>
                  </view>
                </view>
                <view class="add-cart-btn" @click.stop="addCart(item)">
                  <text class="add-icon">+</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 底部占位 -->
        <view class="bottom-placeholder"></view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { categories, categoryProducts } from '@/static/data/mockData.js'

export default {
  data() {
    return {
      categories: categories,
      activeCategoryId: 1,
      activeSubCategoryId: null
    }
  },
  computed: {
    currentCategory() {
      return this.categories.find(item => item.id === this.activeCategoryId) || this.categories[0]
    },
    currentProducts() {
      return categoryProducts[this.activeCategoryId] || []
    }
  },
  onLoad() {
    console.log('分类页加载')
  },
  methods: {
    selectCategory(categoryId) {
      this.activeCategoryId = categoryId
      this.activeSubCategoryId = null
    },
    selectSubCategory(subCategoryId) {
      this.activeSubCategoryId = subCategoryId
      uni.showToast({
        title: '选择了二级分类',
        icon: 'none'
      })
    },
    goToDetail(productId) {
      uni.showToast({
        title: '商品详情ID: ' + productId,
        icon: 'none'
      })
    },
    addCart(item) {
      uni.showToast({
        title: '已加入购物车',
        icon: 'success'
      })
    }
  }
}
</script>

<style scoped>
.category-container {
  background-color: #F5F5F5;
  height: 100vh;
  overflow: hidden;
}

.category-layout {
  display: flex;
  height: 100%;
}

/* 左侧一级分类 */
.left-category {
  width: 180rpx;
  height: 100%;
  background-color: #F8F8F8;
}

.category-item {
  position: relative;
  padding: 30rpx 20rpx;
  text-align: center;
}

.category-item.active {
  background-color: #FFFFFF;
}

.category-name {
  font-size: 26rpx;
  color: #666666;
}

.category-item.active .category-name {
  color: #FF4D4F;
  font-weight: bold;
}

.active-line {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6rpx;
  height: 32rpx;
  background-color: #FF4D4F;
  border-radius: 0 4rpx 4rpx 0;
}

/* 右侧内容区 */
.right-content {
  flex: 1;
  height: 100%;
  background-color: #FFFFFF;
  padding: 20rpx;
}

/* 二级分类 */
.sub-category-section {
  margin-bottom: 20rpx;
}

.sub-category-list {
  display: flex;
  flex-wrap: wrap;
}

.sub-category-item {
  width: 25%;
  padding: 20rpx 0;
  text-align: center;
  background-color: #F8F8F8;
  border-radius: 12rpx;
  margin: 0 10rpx 16rpx 0;
}

.sub-category-item:nth-child(4n) {
  margin-right: 0;
}

.sub-category-name {
  font-size: 24rpx;
  color: #333333;
}

/* 商品列表 */
.product-section {
  background-color: #FFFFFF;
}

.section-title {
  margin-bottom: 20rpx;
  padding-left: 10rpx;
  border-left: 6rpx solid #FF4D4F;
}

.title-text {
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
}

.product-list {
  display: flex;
  flex-direction: column;
}

.product-card {
  display: flex;
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.product-image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 12rpx;
}

.product-info {
  flex: 1;
  margin-left: 20rpx;
  position: relative;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 16rpx;
}

.product-bottom {
  display: flex;
  flex-direction: column;
}

.price-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 8rpx;
}

.current-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF4D4F;
}

.sales-text {
  font-size: 22rpx;
  color: #999999;
}

.add-cart-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 56rpx;
  height: 56rpx;
  background: linear-gradient(180deg, #FF6B6B 0%, #FF4D4F 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 8rpx rgba(255, 77, 79, 0.3);
}

.add-icon {
  font-size: 40rpx;
  color: #FFFFFF;
  line-height: 1;
}

.bottom-placeholder {
  height: 40rpx;
}
</style>
