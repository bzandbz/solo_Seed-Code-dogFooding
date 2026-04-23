<template>
  <view class="container">
    <image class="venue-image" :src="venue?.image" mode="aspectFill" v-if="venue" />
    
    <view class="content-wrapper" v-if="venue">
      <view class="info-section">
        <view class="venue-header">
          <text class="venue-name">{{ venue.name }}</text>
          <view class="favorite-btn" @click="toggleFavorite">
            <text class="favorite-icon" :class="{ active: isFavorited }">❤️</text>
          </view>
        </view>
        
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
      
      <view class="rating-section" v-if="ratingStats.total > 0">
        <text class="section-title">用户评价</text>
        <view class="rating-summary">
          <view class="average-rating">
            <text class="rating-value">{{ ratingStats.average.toFixed(1) }}</text>
            <view class="stars">
              <text 
                v-for="i in 5" 
                :key="i"
                class="star"
                :class="{ filled: i <= Math.round(ratingStats.average) }"
              >★</text>
            </view>
            <text class="rating-count">{{ ratingStats.total }}条评价</text>
          </view>
          <view class="rating-distribution">
            <view class="rating-item" v-for="i in [5, 4, 3, 2, 1]" :key="i">
              <text class="rating-label">{{ i }}星</text>
              <view class="rating-bar-container">
                <view 
                  class="rating-bar" 
                  :style="{ width: ratingStats.distribution[i] ? (ratingStats.distribution[i] / ratingStats.total * 100) + '%' : '0%' }"
                ></view>
              </view>
              <text class="rating-count">{{ ratingStats.distribution[i] || 0 }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <view class="review-section">
        <text class="section-title">发表评价</text>
        <view class="review-input-section">
          <view class="rating-select">
            <text class="rating-label">评分：</text>
            <view class="selectable-stars">
              <text 
                v-for="i in 5" 
                :key="i"
                class="star selectable"
                :class="{ filled: i <= userRating }"
                @click="selectRating(i)"
              >★</text>
            </view>
          </view>
          <textarea 
            class="review-textarea" 
            v-model="reviewContent" 
            placeholder="请输入您的评价内容..."
            :maxlength="500"
          />
          <view class="review-actions">
            <text class="char-count">{{ reviewContent.length }}/500</text>
            <button class="submit-btn" @click="submitReview">提交评价</button>
          </view>
        </view>
      </view>
      
      <view class="reviews-list-section" v-if="venueReviews.length > 0">
        <text class="section-title">全部评价 ({{ venueReviews.length }})</text>
        <view class="reviews-list">
          <view class="review-item" v-for="(review, index) in displayedReviews" :key="review.id">
            <view class="review-header">
              <image class="user-avatar" :src="review.userAvatar" mode="aspectFill" />
              <view class="user-info">
                <text class="user-name">{{ review.userName }}</text>
                <view class="review-meta">
                  <view class="stars">
                    <text 
                      v-for="i in 5" 
                      :key="i"
                      class="star small"
                      :class="{ filled: i <= review.rating }"
                    >★</text>
                  </view>
                  <text class="review-time">{{ review.createTime }}</text>
                </view>
              </view>
            </view>
            <text class="review-content">{{ review.content }}</text>
          </view>
        </view>
        
        <view class="view-more-section" v-if="venueReviews.length > 5" @click="goToReviewsList">
          <text class="view-more-text">查看更多 ({{ venueReviews.length - 5 }}条更多评价)</text>
          <text class="view-more-arrow">›</text>
        </view>
      </view>
      
      <view class="empty-reviews" v-else-if="!ratingStats || ratingStats.total === 0">
        <text class="empty-text">暂无评价，快来发表第一条评价吧！</text>
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
import { ref, computed, onMounted } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import venuesData from '@/static/data/venues.js'
import reviewsData from '@/static/data/reviews.js'
import favoritesData from '@/static/data/favorites.js'

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

interface Review {
  id: string
  venueId: string
  userName: string
  userAvatar: string
  rating: number
  content: string
  createTime: string
  images: string[]
}

interface Favorite {
  id: string
  venueId: string
  createTime: string
}

const venues = venuesData as Venue[]
const venue = ref<Venue | null>(null)
const selectedSlot = ref<number | null>(null)
const userRating = ref<number>(0)
const reviewContent = ref<string>('')
const reviews = ref<Review[]>(reviewsData as Review[])
const favorites = ref<Favorite[]>(favoritesData as Favorite[])
const isFavorited = ref<boolean>(false)

const timeSlots = [
  '09:00-10:00',
  '14:00-15:00',
  '16:00-17:00',
  '19:00-20:00'
]

const venueReviews = computed(() => {
  if (!venue.value) return []
  return reviews.value.filter(r => r.venueId === venue.value?.id)
})

const displayedReviews = computed(() => {
  return venueReviews.value.slice(0, 5)
})

const ratingStats = computed(() => {
  const stats = {
    total: 0,
    average: 0,
    distribution: {} as Record<number, number>
  }
  
  if (venueReviews.value.length === 0) return stats
  
  let totalRating = 0
  venueReviews.value.forEach(review => {
    totalRating += review.rating
    stats.distribution[review.rating] = (stats.distribution[review.rating] || 0) + 1
  })
  
  stats.total = venueReviews.value.length
  stats.average = totalRating / venueReviews.value.length
  
  return stats
})

onLoad((options) => {
  uni.setNavigationBarTitle({ title: '场馆详情' })
  
  if (options && options.id) {
    const venueId = options.id as string
    venue.value = venues.find(v => v.id === venueId) || null
  }
})

onShow(() => {
  checkFavoriteStatus()
})

const checkFavoriteStatus = () => {
  if (venue.value) {
    const favorite = favorites.value.find(f => f.venueId === venue.value?.id)
    isFavorited.value = !!favorite
  }
}

const toggleFavorite = () => {
  if (!venue.value) return
  
  if (isFavorited.value) {
    const index = favorites.value.findIndex(f => f.venueId === venue.value?.id)
    if (index !== -1) {
      favorites.value.splice(index, 1)
    }
    uni.showToast({
      title: '已取消收藏',
      icon: 'none'
    })
  } else {
    const newFavorite: Favorite = {
      id: `favorite_${Date.now()}`,
      venueId: venue.value.id,
      createTime: formatDate(new Date())
    }
    favorites.value.unshift(newFavorite)
    uni.showToast({
      title: '收藏成功',
      icon: 'success'
    })
  }
  isFavorited.value = !isFavorited.value
}

const selectSlot = (index: number) => {
  selectedSlot.value = selectedSlot.value === index ? null : index
}

const selectRating = (rating: number) => {
  userRating.value = userRating.value === rating ? 0 : rating
}

const submitReview = () => {
  if (userRating.value === 0) {
    uni.showToast({
      title: '请先选择评分',
      icon: 'none'
    })
    return
  }
  
  if (!reviewContent.value.trim()) {
    uni.showToast({
      title: '请输入评价内容',
      icon: 'none'
    })
    return
  }
  
  if (!venue.value) return
  
  const newReview: Review = {
    id: `review_${Date.now()}`,
    venueId: venue.value.id,
    userName: '游客用户',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=default%20user%20avatar&image_size=square',
    rating: userRating.value,
    content: reviewContent.value,
    createTime: formatDate(new Date()),
    images: []
  }
  
  reviews.value.unshift(newReview)
  
  reviewContent.value = ''
  userRating.value = 0
  
  uni.showToast({
    title: '评价提交成功',
    icon: 'success'
  })
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}

const goToReviewsList = () => {
  if (!venue.value) return
  
  uni.navigateTo({
    url: `/pages/reviews-list/index?id=${venue.value.id}`
  })
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

.venue-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.venue-name {
  font-size: 36rpx;
  font-weight: 700;
  color: #333333;
  display: block;
}

.favorite-btn {
  padding: 8rpx 16rpx;
}

.favorite-icon {
  font-size: 40rpx;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.favorite-icon.active {
  opacity: 1;
  color: #ff4d4f;
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

.rating-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.rating-summary {
  display: flex;
  flex-direction: column;
}

.average-rating {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.rating-value {
  font-size: 48rpx;
  font-weight: 700;
  color: #ff9500;
  margin-right: 16rpx;
}

.stars {
  display: flex;
  margin-right: 16rpx;
}

.star {
  font-size: 32rpx;
  color: #e0e0e0;
  margin-right: 4rpx;
}

.star.filled {
  color: #ff9500;
}

.star.small {
  font-size: 24rpx;
}

.star.selectable {
  cursor: pointer;
  font-size: 40rpx;
}

.rating-count {
  font-size: 24rpx;
  color: #999999;
}

.rating-distribution {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.rating-item {
  display: flex;
  align-items: center;
}

.rating-label {
  font-size: 24rpx;
  color: #666666;
  width: 60rpx;
}

.rating-bar-container {
  flex: 1;
  height: 12rpx;
  background-color: #f0f0f0;
  border-radius: 6rpx;
  margin: 0 16rpx;
  overflow: hidden;
}

.rating-bar {
  height: 100%;
  background-color: #ff9500;
  border-radius: 6rpx;
  transition: width 0.3s ease;
}

.review-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.review-input-section {
  display: flex;
  flex-direction: column;
}

.rating-select {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.rating-select .rating-label {
  width: auto;
  font-size: 28rpx;
  color: #333333;
  margin-right: 16rpx;
}

.selectable-stars {
  display: flex;
}

.review-textarea {
  width: 100%;
  min-height: 200rpx;
  padding: 16rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #333333;
  background-color: #fafafa;
  margin-bottom: 16rpx;
}

.review-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  font-size: 24rpx;
  color: #999999;
}

.submit-btn {
  padding: 12rpx 32rpx;
  background-color: #1890ff;
  color: #ffffff;
  border-radius: 8rpx;
  font-size: 28rpx;
  border: none;
}

.submit-btn::after {
  border: none;
}

.reviews-list-section {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.review-item {
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.review-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.user-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.user-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.user-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8rpx;
}

.review-meta {
  display: flex;
  align-items: center;
}

.review-time {
  font-size: 24rpx;
  color: #999999;
  margin-left: 16rpx;
}

.review-content {
  font-size: 28rpx;
  color: #666666;
  line-height: 1.6;
  display: block;
}

.empty-reviews {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 48rpx 24rpx;
  margin-bottom: 24rpx;
  text-align: center;
}

.empty-text {
  font-size: 28rpx;
  color: #999999;
}

.view-more-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 24rpx;
  border-top: 1rpx solid #f0f0f0;
  margin-top: 24rpx;
  cursor: pointer;
}

.view-more-text {
  font-size: 28rpx;
  color: #1890ff;
}

.view-more-arrow {
  font-size: 32rpx;
  color: #1890ff;
  margin-left: 8rpx;
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
