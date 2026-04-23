<template>
  <view class="container">
    <scroll-view 
      class="reviews-scroll" 
      :scroll-y="true"
      :lower-threshold="100"
      @scrolltolower="loadMore"
      :refresher-enabled="true"
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
    >
      <view class="reviews-header">
        <view class="rating-summary">
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
        <view class="rating-distribution" v-if="ratingStats.total > 0">
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
      
      <view class="reviews-list">
        <view class="review-item" v-for="review in displayedReviews" :key="review.id">
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
      
      <view class="loading-status">
        <text v-if="isLoading" class="loading-text">加载中...</text>
        <text v-else-if="hasMore" class="load-more-text">上拉加载更多</text>
        <text v-else class="no-more-text">没有更多了</text>
      </view>
      
      <view class="empty-reviews" v-if="displayedReviews.length === 0 && !isLoading">
        <text class="empty-text">暂无评价</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import reviewsData from '@/static/data/reviews.js'
import venuesData from '@/static/data/venues.js'

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

const PAGE_SIZE = 10

const venueId = ref<string>('')
const reviews = ref<Review[]>(reviewsData as Review[])
const venues = ref<Venue[]>(venuesData as Venue[])
const currentPage = ref<number>(1)
const isLoading = ref<boolean>(false)
const isRefreshing = ref<boolean>(false)
const hasMore = ref<boolean>(true)

const venueReviews = computed(() => {
  if (!venueId.value) return []
  return reviews.value.filter(r => r.venueId === venueId.value)
})

const displayedReviews = computed(() => {
  const endIndex = currentPage.value * PAGE_SIZE
  return venueReviews.value.slice(0, endIndex)
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
  if (options && options.id) {
    venueId.value = options.id as string
    
    const venue = venues.value.find(v => v.id === venueId.value)
    if (venue) {
      uni.setNavigationBarTitle({ title: `${venue.name} - 评价列表` })
    } else {
      uni.setNavigationBarTitle({ title: '评价列表' })
    }
  }
})

const initHasMore = () => {
  hasMore.value = venueReviews.value.length > PAGE_SIZE
}

watch(venueReviews, () => {
  initHasMore()
}, { immediate: true })

const loadMore = () => {
  if (isLoading.value || !hasMore.value) return
  
  isLoading.value = true
  
  setTimeout(() => {
    currentPage.value++
    
    const total = venueReviews.value.length
    const displayed = currentPage.value * PAGE_SIZE
    
    if (displayed >= total) {
      hasMore.value = false
    }
    
    isLoading.value = false
  }, 500)
}

const onRefresh = () => {
  isRefreshing.value = true
  
  setTimeout(() => {
    currentPage.value = 1
    initHasMore()
    isRefreshing.value = false
    
    uni.showToast({
      title: '刷新成功',
      icon: 'success'
    })
  }, 1000)
}
</script>

<style scoped>
.container {
  height: 100vh;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.reviews-scroll {
  flex: 1;
  height: 0;
  min-height: 0;
}

.reviews-header {
  background-color: #ffffff;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.rating-summary {
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

.rating-count {
  font-size: 24rpx;
  color: #999999;
}

.rating-distribution {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid #f0f0f0;
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

.reviews-list {
  background-color: #ffffff;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.review-item {
  padding-bottom: 24rpx;
  margin-bottom: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.review-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
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

.loading-status {
  text-align: center;
  padding: 32rpx;
}

.loading-text,
.load-more-text,
.no-more-text {
  font-size: 26rpx;
  color: #999999;
}

.empty-reviews {
  text-align: center;
  padding: 80rpx 24rpx;
  background-color: #ffffff;
}

.empty-text {
  font-size: 28rpx;
  color: #999999;
}
</style>
