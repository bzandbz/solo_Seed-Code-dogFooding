<template>
  <view class="profile-container">
    <view class="profile-header">
      <view class="user-info">
        <image class="user-avatar" :src="user.avatar" mode="aspectFill" />
        <view class="user-details">
          <view class="user-name-row">
            <text class="user-name">{{ user.name }}</text>
            <view class="edit-btn" @click="goToEdit">
              <text class="edit-text">编辑</text>
              <text class="edit-arrow">›</text>
            </view>
          </view>
          <text class="user-phone">{{ user.phone }}</text>
          <view class="user-level">
            <text class="level-badge">{{ user.memberLevel }}</text>
            <text class="points-text">积分：{{ user.points }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="menu-section">
      <view class="menu-group">
        <view class="menu-item" @click="goToFavorites">
          <view class="menu-left">
            <text class="menu-icon">❤️</text>
            <text class="menu-title">我的收藏</text>
          </view>
          <view class="menu-right">
            <text class="menu-count">{{ favoritesCount }}</text>
            <text class="menu-arrow">›</text>
          </view>
        </view>

        <view class="menu-item" @click="goToBookings">
          <view class="menu-left">
            <text class="menu-icon">📅</text>
            <text class="menu-title">我的预约</text>
          </view>
          <view class="menu-right">
            <text class="menu-count">{{ bookingsCount }}</text>
            <text class="menu-arrow">›</text>
          </view>
        </view>
      </view>

      <view class="menu-group">
        <view class="menu-item" @click="goToAgreement">
          <view class="menu-left">
            <text class="menu-icon">📄</text>
            <text class="menu-title">用户协议</text>
          </view>
          <view class="menu-right">
            <text class="menu-arrow">›</text>
          </view>
        </view>

        <view class="menu-item" @click="showVersion">
          <view class="menu-left">
            <text class="menu-icon">ℹ️</text>
            <text class="menu-title">关于我们</text>
          </view>
          <view class="menu-right">
            <text class="menu-version">v1.0.0</text>
            <text class="menu-arrow">›</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import userData from '@/static/data/user.js'
import favoritesData from '@/static/data/favorites.js'
import bookingsData from '@/static/data/bookings.js'

interface User {
  id: string
  avatar: string
  name: string
  phone: string
  email: string
  gender: string
  memberLevel: string
  points: number
  createTime: string
}

interface Favorite {
  id: string
  venueId: string
  createTime: string
}

interface Booking {
  id: string
  venueId: string
  venueName: string
  bookingTime: string
  status: string
}

const user = ref<User>(userData as User)
const favorites = ref<Favorite[]>(favoritesData as Favorite[])
const bookings = ref<Booking[]>(bookingsData as Booking[])

const favoritesCount = computed(() => favorites.value.length)
const bookingsCount = computed(() => bookings.value.length)

onShow(() => {
  uni.setNavigationBarTitle({ title: '个人中心' })
})

const goToEdit = () => {
  uni.navigateTo({
    url: '/pages/profile-edit/index'
  })
}

const goToFavorites = () => {
  uni.navigateTo({
    url: '/pages/favorites/index'
  })
}

const goToBookings = () => {
  uni.navigateTo({
    url: '/pages/my-bookings/index'
  })
}

const goToAgreement = () => {
  uni.navigateTo({
    url: '/pages/agreement/index'
  })
}

const showVersion = () => {
  uni.showToast({
    title: '运动荟预约 v1.0.0',
    icon: 'none',
    duration: 2000
  })
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.profile-header {
  background: linear-gradient(135deg, #1890FF, #40A9FF);
  padding: 40rpx 30rpx;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.5);
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  flex: 1;
}

.user-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #ffffff;
}

.user-phone {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
}

.user-level {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-top: 8rpx;
}

.level-badge {
  font-size: 22rpx;
  color: #1890FF;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.points-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.edit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 8rpx 20rpx;
  border-radius: 30rpx;
}

.edit-text {
  font-size: 24rpx;
  color: #ffffff;
}

.edit-arrow {
  font-size: 26rpx;
  color: #ffffff;
}

.menu-section {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.menu-group {
  background-color: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.menu-icon {
  font-size: 36rpx;
}

.menu-title {
  font-size: 30rpx;
  color: #333333;
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.menu-count {
  font-size: 26rpx;
  color: #999999;
}

.menu-version {
  font-size: 26rpx;
  color: #999999;
}

.menu-arrow {
  font-size: 32rpx;
  color: #cccccc;
}
</style>
