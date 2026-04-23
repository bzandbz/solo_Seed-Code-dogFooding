<template>
  <view class="container">
    <view class="venue-list">
      <view
        v-for="venue in filteredVenues"
        :key="venue.id"
        class="venue-card"
      >
        <image class="venue-image" :src="venue.image" mode="aspectFill" @click="goToDetail(venue.id)" />
        <view class="venue-info" @click="goToDetail(venue.id)">
          <text class="venue-name">{{ venue.name }}</text>
          <view class="venue-price-row">
            <text class="venue-price">¥{{ venue.price }}</text>
            <text class="price-unit">/小时</text>
          </view>
          <text class="venue-distance">{{ venue.distance }}</text>
        </view>
        <view class="favorite-btn" @click.stop="toggleFavorite(venue.id)">
          <text class="favorite-icon" :class="{ active: isVenueFavorited(venue.id) }">❤️</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import venuesData from '@/static/data/venues.js'
import categoriesData from '@/static/data/categories.js'
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

const venues = venuesData as Venue[]
const categories = categoriesData as Category[]
const favorites = ref<Favorite[]>(favoritesData as Favorite[])

const routeType = ref<string | null>(null)

const getTypeName = (typeKey: string): string => {
  const category = categories.find((c: Category) => c.typeKey === typeKey)
  return category ? category.name : typeKey
}

const setNavigationTitle = (type: string | null) => {
  const title = type ? `${getTypeName(type)}列表` : '全部场馆'
  uni.setNavigationBarTitle({ title })
}

onLoad(() => {
  const storedType = uni.getStorageSync('venueFilterType')
  if (storedType) {
    routeType.value = storedType
    uni.removeStorageSync('venueFilterType')
  }
  setNavigationTitle(routeType.value)
})

onShow(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as { options?: { type?: string } }
  const options = currentPage.options
  
  if (options && options.type) {
    routeType.value = options.type
  } else {
    const storedType = uni.getStorageSync('venueFilterType')
    if (storedType) {
      routeType.value = storedType
      uni.removeStorageSync('venueFilterType')
    } else {
      routeType.value = null
    }
  }
  
  setNavigationTitle(routeType.value)
})

const filteredVenues = computed(() => {
  if (!routeType.value) {
    return venues
  }
  return venues.filter((venue: Venue) => venue.typeKey === routeType.value)
})

const goToDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/venue-detail/index?id=${id}`
  })
}

const isVenueFavorited = (venueId: string): boolean => {
  return favorites.value.some(f => f.venueId === venueId)
}

const toggleFavorite = (venueId: string) => {
  const index = favorites.value.findIndex(f => f.venueId === venueId)
  
  if (index !== -1) {
    favorites.value.splice(index, 1)
    uni.showToast({
      title: '已取消收藏',
      icon: 'none'
    })
  } else {
    const newFavorite: Favorite = {
      id: `favorite_${Date.now()}`,
      venueId: venueId,
      createTime: formatDate(new Date())
    }
    favorites.value.unshift(newFavorite)
    uni.showToast({
      title: '收藏成功',
      icon: 'success'
    })
  }
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.venue-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.venue-card {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 20rpx;
  align-items: center;
}

.venue-image {
  width: 200rpx;
  height: 150rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
}

.venue-info {
  display: flex;
  flex-direction: column;
  margin-left: 24rpx;
  flex: 1;
  justify-content: space-between;
}

.favorite-btn {
  padding: 16rpx;
  flex-shrink: 0;
}

.favorite-icon {
  font-size: 36rpx;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.favorite-icon.active {
  opacity: 1;
  color: #ff4d4f;
}

.venue-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.venue-price-row {
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

.venue-distance {
  font-size: 24rpx;
  color: #999999;
}
</style>
