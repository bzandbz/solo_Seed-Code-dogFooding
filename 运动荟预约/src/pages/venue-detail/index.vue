<template>
  <view class="container">
    <image class="venue-image" :src="venue?.image" mode="aspectFill" v-if="venue" />
    
    <view class="content-wrapper" v-if="venue">
      <view class="info-section">
        <text class="venue-name">{{ venue.name }}</text>
        
        <view class="price-row">
          <text class="venue-price">¥{{ venue.price }}</text>
          <text class="price-unit">/小时</text>
        </view>
        
        <text class="venue-distance">{{ venue.distance }}</text>
        
        <view class="address-row">
          <text class="location-icon">📍</text>
          <text class="venue-address">{{ venue.address }}</text>
        </view>
        
        <view class="description-section">
          <text class="section-title">场馆简介</text>
          <text class="venue-description">{{ venue.description }}</text>
        </view>
      </view>
      
      <view class="time-slot-section">
        <text class="section-title">可用时段</text>
        <view class="time-slots">
          <view
            v-for="(slot, index) in timeSlots"
            :key="index"
            class="time-slot-item"
            :class="{ active: selectedSlot === index }"
            @click="selectSlot(index)"
          >
            <text>{{ slot }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="bottom-placeholder"></view>
    
    <view class="booking-button-wrapper">
      <button class="booking-button" @click="handleBooking">立即预约</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import venuesData from '@/static/data/venues.js'

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

const venues = venuesData as Venue[]
const venue = ref<Venue | null>(null)
const selectedSlot = ref<number | null>(null)

const timeSlots = [
  '09:00-10:00',
  '14:00-15:00',
  '16:00-17:00',
  '19:00-20:00'
]

onLoad((options) => {
  uni.setNavigationBarTitle({ title: '场馆详情' })
  
  if (options && options.id) {
    const venueId = options.id as string
    venue.value = venues.find(v => v.id === venueId) || null
  }
})

const selectSlot = (index: number) => {
  selectedSlot.value = selectedSlot.value === index ? null : index
}

const handleBooking = () => {
  if (selectedSlot.value === null) {
    uni.showToast({
      title: '请先选择时段',
      icon: 'none'
    })
    return
  }
  
  uni.showModal({
    title: '预约确认',
    content: `确定预约 ${venue.value?.name} ${timeSlots[selectedSlot.value]} 的场地吗？`,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '预约成功',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.venue-image {
  width: 100%;
  height: 400rpx;
}

.content-wrapper {
  padding: 24rpx;
  flex: 1;
}

.info-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.venue-name {
  font-size: 36rpx;
  font-weight: 700;
  color: #333333;
  display: block;
  margin-bottom: 16rpx;
}

.price-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 12rpx;
}

.venue-price {
  font-size: 40rpx;
  font-weight: 700;
  color: #ff4d4f;
}

.price-unit {
  font-size: 24rpx;
  color: #999999;
  margin-left: 4rpx;
}

.venue-distance {
  font-size: 24rpx;
  color: #999999;
  display: block;
  margin-bottom: 20rpx;
}

.address-row {
  display: flex;
  align-items: center;
  padding: 16rpx 0;
  border-top: 1rpx solid #f0f0f0;
}

.location-icon {
  font-size: 28rpx;
  margin-right: 8rpx;
}

.venue-address {
  font-size: 28rpx;
  color: #666666;
  flex: 1;
}

.description-section {
  padding-top: 20rpx;
  border-top: 1rpx solid #f0f0f0;
  margin-top: 20rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 16rpx;
}

.venue-description {
  font-size: 28rpx;
  color: #666666;
  line-height: 1.8;
  display: block;
}

.time-slot-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
}

.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.time-slot-item {
  padding: 16rpx 24rpx;
  border: 2rpx solid #e0e0e0;
  border-radius: 8rpx;
  background-color: #ffffff;
}

.time-slot-item text {
  font-size: 26rpx;
  color: #666666;
}

.time-slot-item.active {
  border-color: #1890ff;
  background-color: #e6f7ff;
}

.time-slot-item.active text {
  color: #1890ff;
}

.bottom-placeholder {
  height: 120rpx;
}

.booking-button-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 32rpx;
  background-color: #ffffff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.booking-button {
  width: 100%;
  height: 88rpx;
  background-color: #1890ff;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.booking-button::after {
  border: none;
}

.booking-button text {
  font-size: 32rpx;
  font-weight: 600;
  color: #ffffff;
}
</style>
