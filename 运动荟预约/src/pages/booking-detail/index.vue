<template>
  <view class="container">
    <view v-if="booking" class="content">
      <view class="status-section">
        <view :class="['status-tag', getStatusClass(booking.status)]">
          <text>{{ booking.status }}</text>
        </view>
      </view>

      <view class="info-card">
        <view class="card-header">
          <text class="venue-name">{{ booking.venueName }}</text>
        </view>
        <view class="card-body">
          <view class="info-row">
            <text class="info-icon location-icon">📍</text>
            <text class="info-text">{{ booking.venueAddress }}</text>
          </view>
          <view class="info-row">
            <text class="info-icon time-icon">⏰</text>
            <text class="info-text">{{ booking.bookingTime }}</text>
          </view>
        </view>
      </view>

      <view class="price-card">
        <view class="price-section">
          <text class="price-label">预约费用</text>
          <view class="price-value">
            <text class="price-symbol">¥</text>
            <text class="price-amount">{{ booking.price }}</text>
          </view>
        </view>
        <view class="price-detail" v-if="booking.price && booking.bookingTime">
          <text class="detail-text">单价: ¥{{ getUnitPrice(booking.price) }}/小时</text>
          <text class="detail-text">时长: {{ getDuration(booking.bookingTime) }}小时</text>
        </view>
      </view>

      <view class="extra-card">
        <view class="extra-row">
          <text class="extra-label">预约单号</text>
          <text class="extra-value">{{ getBookingNo(booking.id) }}</text>
        </view>
        <view class="extra-row">
          <text class="extra-label">下单时间</text>
          <text class="extra-value">{{ getOrderTime(booking.bookingTime) }}</text>
        </view>
      </view>
    </view>

    <view v-else class="empty-state">
      <text class="empty-text">预约信息不存在</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import bookingsData from '@/static/data/bookings.js'

interface Booking {
  id: string
  venueId: string
  venueName: string
  venueAddress: string
  bookingTime: string
  status: string
  price: number
}

const bookings = bookingsData as Booking[]
const booking = ref<Booking | null>(null)

onLoad((options) => {
  if (options && options.id) {
    const bookingId = options.id as string
    booking.value = bookings.find(b => b.id === bookingId) || null
  }
})

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

const getUnitPrice = (totalPrice: number): number => {
  return Math.floor(totalPrice / 2)
}

const getDuration = (bookingTime: string): string => {
  const match = bookingTime.match(/(\d{2}:\d{2})-(\d{2}:\d{2})/)
  if (match) {
    const startHour = parseInt(match[1].split(':')[0])
    const endHour = parseInt(match[2].split(':')[0])
    return (endHour - startHour).toString()
  }
  return '2'
}

const getBookingNo = (id: string): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const num = id.replace('booking_', '').padStart(3, '0')
  return `BK${year}${month}${day}${num}`
}

const getOrderTime = (bookingTime: string): string => {
  const match = bookingTime.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (match) {
    const year = parseInt(match[1])
    const month = parseInt(match[2])
    const day = parseInt(match[3])
    const orderDate = new Date(year, month - 1, day - 1)
    const orderYear = orderDate.getFullYear()
    const orderMonth = String(orderDate.getMonth() + 1).padStart(2, '0')
    const orderDay = String(orderDate.getDate()).padStart(2, '0')
    return `${orderYear}-${orderMonth}-${orderDay} 10:30:00`
  }
  return '2026-04-22 10:30:00'
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 24rpx;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.status-section {
  display: flex;
  justify-content: flex-start;
  padding: 16rpx 0;
}

.status-tag {
  font-size: 26rpx;
  padding: 12rpx 32rpx;
  border-radius: 30rpx;
  color: #fff;
  font-weight: 500;
}

.status-booked {
  background-color: #1890FF;
}

.status-completed {
  background-color: #999;
}

.info-card,
.price-card,
.extra-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.card-header {
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.venue-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}

.card-body {
  padding-top: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
}

.info-icon {
  font-size: 28rpx;
  line-height: 1.5;
}

.location-icon {
  color: #1890FF;
}

.time-icon {
  color: #666;
}

.info-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
  flex: 1;
}

.price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-label {
  font-size: 28rpx;
  color: #666;
}

.price-value {
  display: flex;
  align-items: baseline;
  gap: 4rpx;
}

.price-symbol {
  font-size: 28rpx;
  color: #1890FF;
  font-weight: 600;
}

.price-amount {
  font-size: 48rpx;
  color: #1890FF;
  font-weight: 600;
}

.price-detail {
  display: flex;
  justify-content: flex-start;
  gap: 32rpx;
  margin-top: 24rpx;
  padding-top: 24rpx;
  border-top: 1rpx solid #f0f0f0;
}

.detail-text {
  font-size: 24rpx;
  color: #999;
}

.extra-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 0;
}

.extra-row:not(:last-child) {
  border-bottom: 1rpx solid #f0f0f0;
}

.extra-label {
  font-size: 28rpx;
  color: #666;
}

.extra-value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 300rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>
