<template>
  <view class="container">
    <view class="filter-section">
      <picker 
        :value="filterPickerIndex" 
        :range="filterCategories" 
        range-key="name"
        @change="onFilterChange"
      >
        <view class="filter-picker">
          <text class="filter-label">筛选：</text>
          <text class="filter-value">{{ getSelectedFilterName() }}</text>
          <text class="filter-arrow">▼</text>
        </view>
      </picker>
    </view>
    
    <view v-if="displayedFavorites.length === 0 && !isLoading" class="empty-state">
      <text class="empty-text">暂无收藏的场馆</text>
      <text class="empty-hint">去场馆列表看看吧</text>
    </view>
    
    <view v-else class="favorite-list">
      <view
        v-for="favoriteVenue in displayedFavorites"
        :key="favoriteVenue.favoriteId"
        class="favorite-card"
      >
        <image 
          class="venue-image" 
          :src="favoriteVenue.venue?.image" 
          mode="aspectFill" 
          @click="favoriteVenue.venue && goToDetail(favoriteVenue.venue.id)" 
        />
        
        <view class="venue-info" @click="favoriteVenue.venue && goToDetail(favoriteVenue.venue.id)">
          <text class="venue-name">{{ favoriteVenue.venue?.name }}</text>
          <view class="venue-meta">
            <text class="venue-type">{{ favoriteVenue.venue?.type }}</text>
            <text class="venue-distance">{{ favoriteVenue.venue?.distance }}</text>
          </view>
          <view class="price-row">
            <text class="venue-price">¥{{ favoriteVenue.venue?.price }}</text>
            <text class="price-unit">/小时</text>
          </view>
        </view>
        
        <view class="action-buttons">
          <view class="action-btn favorite-btn" @click="removeFavorite(favoriteVenue.favoriteId)">
            <text class="btn-icon">❤️</text>
            <text class="btn-text">取消收藏</text>
          </view>
          <view class="action-btn book-btn" @click="favoriteVenue.venue && quickBook(favoriteVenue.venue)">
            <text class="btn-icon">📅</text>
            <text class="btn-text">快速预约</text>
          </view>
        </view>
      </view>
      
      <view class="loading-status" v-if="isLoading || !hasMore">
        <text class="loading-text" v-if="isLoading">加载中...</text>
        <text class="no-more-text" v-else-if="!hasMore && displayedFavorites.length > 0">没有更多数据了</text>
      </view>
    </view>
    
    <view class="booking-modal" v-if="showBookingModal">
      <view class="modal-overlay" @click="closeBookingModal"></view>
      <view class="modal-content">
        <view class="modal-header">
          <text class="modal-title">快速预约 - {{ selectedVenue?.name }}</text>
          <text class="modal-close" @click="closeBookingModal">×</text>
        </view>
        
        <view class="modal-body">
          <text class="section-title">选择时段</text>
          <view class="time-slots">
            <view
              v-for="(slot, index) in timeSlots"
              :key="index"
              class="time-slot-item"
              :class="{ active: selectedTimeSlot === index }"
              @click="selectTimeSlot(index)"
            >
              <text>{{ slot }}</text>
            </view>
          </view>
        </view>
        
        <view class="modal-footer">
          <button class="cancel-btn" @click="closeBookingModal">取消</button>
          <button class="confirm-btn" @click="confirmBooking">确认预约</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { onShow, onReachBottom } from '@dcloudio/uni-app'
import venuesData from '@/static/data/venues.js'
import categoriesData from '@/static/data/categories.js'
import favoritesData from '@/static/data/favorites.js'
import bookingsData from '@/static/data/bookings.js'

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

interface Category {
  id: string
  name: string
  typeKey: string
  icon: string
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

interface FavoriteVenue {
  favoriteId: string
  venue: Venue | undefined
  createTime: string
}

const venues = venuesData as Venue[]
const categories = categoriesData as Category[]
const favorites = ref<Favorite[]>(favoritesData as Favorite[])
const bookings = ref<Booking[]>(bookingsData as Booking[])

const selectedFilter = ref<string>('all')
const showBookingModal = ref<boolean>(false)
const selectedVenue = ref<Venue | null>(null)
const selectedTimeSlot = ref<number | null>(null)

const currentPage = ref<number>(1)
const pageSize = ref<number>(2)
const hasMore = ref<boolean>(true)
const isLoading = ref<boolean>(false)
const displayedFavorites = ref<FavoriteVenue[]>([])

const filterCategories = computed(() => {
  return [
    { typeKey: 'all' as string, name: '全部' },
    ...categories
  ]
})

const filterPickerIndex = computed(() => {
  return filterCategories.value.findIndex(c => c.typeKey === selectedFilter.value)
})

const timeSlots = [
  '09:00-10:00',
  '14:00-15:00',
  '16:00-17:00',
  '19:00-20:00'
]

const favoriteVenues = computed(() => {
  return favorites.value.map(favorite => {
    const venue = venues.find(v => v.id === favorite.venueId)
    return {
      favoriteId: favorite.id,
      venue: venue,
      createTime: favorite.createTime
    }
  }).filter(item => item.venue !== undefined)
})

const filteredFavorites = computed(() => {
  if (selectedFilter.value === 'all') {
    return favoriteVenues.value
  }
  return favoriteVenues.value.filter(item => 
    item.venue?.typeKey === selectedFilter.value
  )
})

onShow(() => {
  uni.setNavigationBarTitle({ title: '我的收藏' })
  resetAndLoadData()
})

watch(selectedFilter, () => {
  resetAndLoadData()
})

const resetAndLoadData = () => {
  currentPage.value = 1
  displayedFavorites.value = []
  hasMore.value = true
  loadMoreData()
}

const loadMoreData = () => {
  if (isLoading.value || !hasMore.value) return
  
  isLoading.value = true
  
  uni.showLoading({ title: '加载中...' })
  
  setTimeout(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    const newItems = filteredFavorites.value.slice(start, end)
    
    if (newItems.length > 0) {
      displayedFavorites.value = [...displayedFavorites.value, ...newItems]
      currentPage.value++
      
      if (displayedFavorites.value.length >= filteredFavorites.value.length) {
        hasMore.value = false
      }
    } else {
      hasMore.value = false
    }
    
    uni.hideLoading()
    isLoading.value = false
  }, 500)
}

onReachBottom(() => {
  if (hasMore.value && !isLoading.value) {
    loadMoreData()
  }
})

const getSelectedFilterName = (): string => {
  const category = filterCategories.value.find(c => c.typeKey === selectedFilter.value)
  return category ? category.name : '全部'
}

const onFilterChange = (e: { detail: { value: number } }) => {
  const index = e.detail.value
  selectedFilter.value = filterCategories.value[index].typeKey
}

const selectFilter = (typeKey: string) => {
  selectedFilter.value = selectedFilter.value === typeKey ? 'all' : typeKey
}

const goToDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/venue-detail/index?id=${id}`
  })
}

const removeFavorite = (favoriteId: string) => {
  uni.showModal({
    title: '确认取消',
    content: '确定要取消收藏这个场馆吗？',
    success: (res) => {
      if (res.confirm) {
        const index = favorites.value.findIndex(f => f.id === favoriteId)
        if (index !== -1) {
          favorites.value.splice(index, 1)
        }
        uni.showToast({
          title: '已取消收藏',
          icon: 'success'
        })
      }
    }
  })
}

const quickBook = (venue: Venue) => {
  selectedVenue.value = venue
  selectedTimeSlot.value = null
  showBookingModal.value = true
}

const selectTimeSlot = (index: number) => {
  selectedTimeSlot.value = selectedTimeSlot.value === index ? null : index
}

const closeBookingModal = () => {
  showBookingModal.value = false
  selectedVenue.value = null
  selectedTimeSlot.value = null
}

const confirmBooking = () => {
  if (selectedTimeSlot.value === null) {
    uni.showToast({
      title: '请先选择时段',
      icon: 'none'
    })
    return
  }
  
  if (!selectedVenue.value) return
  
  const newBooking: Booking = {
    id: `booking_${Date.now()}`,
    venueId: selectedVenue.value.id,
    venueName: selectedVenue.value.name,
    bookingTime: `${formatDate(new Date())} ${timeSlots[selectedTimeSlot.value]}`,
    status: '已预约'
  }
  
  bookings.value.unshift(newBooking)
  
  uni.showToast({
    title: '预约成功',
    icon: 'success'
  })
  
  closeBookingModal()
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.filter-section {
  margin-bottom: 20rpx;
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
}

.filter-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 24rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  border: 1rpx solid #e0e0e0;
}

.filter-label {
  font-size: 28rpx;
  color: #999999;
}

.filter-value {
  font-size: 28rpx;
  color: #333333;
  font-weight: 500;
}

.filter-arrow {
  font-size: 24rpx;
  color: #999999;
}

.loading-status {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32rpx;
}

.loading-text {
  font-size: 28rpx;
  color: #999999;
}

.no-more-text {
  font-size: 28rpx;
  color: #cccccc;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 200rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #999999;
  margin-bottom: 16rpx;
}

.empty-hint {
  font-size: 26rpx;
  color: #999999;
}

.favorite-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.favorite-card {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.venue-image {
  width: 100%;
  height: 300rpx;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
}

.venue-info {
  margin-bottom: 16rpx;
}

.venue-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 12rpx;
}

.venue-meta {
  display: flex;
  gap: 20rpx;
  margin-bottom: 12rpx;
}

.venue-type {
  font-size: 24rpx;
  color: #1890ff;
  padding: 4rpx 12rpx;
  background-color: #e6f7ff;
  border-radius: 8rpx;
}

.venue-distance {
  font-size: 24rpx;
  color: #999999;
}

.price-row {
  display: flex;
  align-items: baseline;
}

.venue-price {
  font-size: 36rpx;
  font-weight: 700;
  color: #ff4d4f;
}

.price-unit {
  font-size: 24rpx;
  color: #999999;
  margin-left: 4rpx;
}

.action-buttons {
  display: flex;
  gap: 16rpx;
  padding-top: 16rpx;
  border-top: 1rpx solid #f0f0f0;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  padding: 16rpx;
  border-radius: 8rpx;
}

.favorite-btn {
  background-color: #fff2f0;
  border: 1rpx solid #ffccc7;
}

.book-btn {
  background-color: #e6f7ff;
  border: 1rpx solid #91d5ff;
}

.btn-icon {
  font-size: 28rpx;
}

.btn-text {
  font-size: 26rpx;
  color: #333333;
}

.booking-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  width: 100%;
  background-color: #ffffff;
  border-radius: 24rpx 24rpx 0 0;
  padding-bottom: 40rpx;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
}

.modal-close {
  font-size: 40rpx;
  color: #999999;
  padding: 8rpx;
}

.modal-body {
  padding: 24rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 16rpx;
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

.modal-footer {
  display: flex;
  gap: 20rpx;
  padding: 0 24rpx;
  padding-top: 20rpx;
}

.cancel-btn, .confirm-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666666;
}

.confirm-btn {
  background-color: #1890ff;
  color: #ffffff;
}

.cancel-btn::after, .confirm-btn::after {
  border: none;
}
</style>
