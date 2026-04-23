<template>
  <scroll-view class="home-container" scroll-y>
    <view class="search-section">
      <view class="search-box">
        <input 
          class="search-input" 
          type="text" 
          placeholder="搜索场馆名称"
          v-model="searchKeyword"
          placeholder-class="placeholder-style"
        />
        <view class="search-btn" @click="handleSearch">
          <text class="search-btn-text">搜索</text>
        </view>
      </view>
    </view>

    <view class="banner-section">
      <view class="banner-content">
        <text class="banner-title">欢迎来到运动荟</text>
        <text class="banner-subtitle">发现身边优质运动场馆，轻松预约</text>
      </view>
    </view>

    <view class="category-section">
      <view class="section-title">
        <text class="title-text">场馆分类</text>
      </view>
      <view class="category-grid">
        <view 
          v-for="category in categories" 
          :key="category.id"
          class="category-item"
          @click="navigateToVenueList(category.typeKey)"
        >
          <view class="category-icon-wrapper">
            <uni-icons :type="getIconType(category.icon)" class="category-icon" :size="36"></uni-icons>
          </view>
          <text class="category-name">{{ category.name }}</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import categories from '@/static/data/categories.js'
import venues from '@/static/data/venues.js'

interface Venue {
  id: string
  name: string
  type: string
  typeKey: string
  price: number
  distance: string
  address: string
  description: string
  image: string
}

const searchKeyword = ref('')

const getIconType = (icon: string): string => {
  const iconMap: Record<string, string> = {
    badminton: 'gear',
    basketball: 'person-filled',
    tabletennis: 'loop',
    tennis: 'forward',
    swimming: 'download-filled',
    gym: 'gear-filled'
  }
  return iconMap[icon] || 'info'
}

const handleSearch = () => {
  const keyword = searchKeyword.value.trim()
  if (!keyword) {
    uni.showToast({
      title: '请输入搜索关键词',
      icon: 'none',
      duration: 2000
    })
    return
  }

  const matchedVenues = venues.filter((venue: Venue) => 
    venue.name.includes(keyword)
  )

  if (matchedVenues.length === 0) {
    uni.showToast({
      title: '未找到该场馆',
      icon: 'none',
      duration: 2000
    })
  } else {
    const targetVenue = matchedVenues[0]
    uni.navigateTo({
      url: '/pages/venue-detail/index?id=' + targetVenue.id
    })
  }
}

const navigateToVenueList = (typeKey: string) => {
  uni.setStorageSync('venueFilterType', typeKey)
  uni.switchTab({
    url: '/pages/venue-list/index'
  })
}
</script>

<style>
.home-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 20rpx;
}

.search-section {
  background-color: #1890FF;
  padding: 20rpx 30rpx;
}

.search-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8rpx;
  padding: 0 20rpx;
}

.search-input {
  flex: 1;
  height: 80rpx;
  font-size: 28rpx;
  color: #333333;
}

.placeholder-style {
  color: #999999;
  font-size: 28rpx;
}

.search-btn {
  padding-left: 20rpx;
  padding-right: 10rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn-text {
  font-size: 28rpx;
  color: #1890FF;
  font-weight: 500;
}

.banner-section {
  margin: 20rpx 30rpx;
  background: linear-gradient(135deg, #1890FF, #40A9FF);
  border-radius: 12rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.2);
}

.banner-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.banner-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12rpx;
}

.banner-subtitle {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
}

.category-section {
  margin: 20rpx 30rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
}

.section-title {
  margin-bottom: 30rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.category-item {
  width: 31%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
}

.category-icon-wrapper {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background-color: #E6F7FF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.category-icon {
  color: #1890FF;
}

.category-name {
  font-size: 26rpx;
  color: #333333;
  text-align: center;
}
</style>
