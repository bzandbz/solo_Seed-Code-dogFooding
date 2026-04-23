<template>
  <view class="container">
    <view v-if="bookings.length === 0" class="empty-state">
      <text class="empty-text">暂无预约记录</text>
    </view>
    <view v-else class="booking-list">
      <view
        v-for="booking in bookings"
        :key="booking.id"
        class="booking-item"
        @click="goToDetail(booking.id)"
      >
        <view class="booking-main">
          <view class="booking-left">
            <text class="venue-name">{{ booking.venueName }}</text>
            <text class="booking-time">{{ booking.bookingTime }}</text>
          </view>
          <view class="booking-right">
            <text :class="['status-tag', getStatusClass(booking.status)]">
              {{ booking.status }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import bookingsData from '@/static/data/bookings.js'

const bookings = ref(bookingsData)

const goToDetail = (id: string) => {
  uni.navigateTo({
    url: '/pages/booking-detail/index?id=' + id
  })
}

const getStatusClass = (status: string) => {
  switch (status) {
    case '已预约':
      return 'status-booked'
    case '已完成':
      return 'status-completed'
    default:
      return ''
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 24rpx;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 200rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

.booking-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.booking-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.booking-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.booking-left {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.venue-name {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.booking-time {
  font-size: 26rpx;
  color: #666;
}

.booking-right {
  display: flex;
  align-items: center;
}

.status-tag {
  font-size: 24rpx;
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  color: #fff;
}

.status-booked {
  background-color: #1890FF;
}

.status-completed {
  background-color: #999;
}
</style>
