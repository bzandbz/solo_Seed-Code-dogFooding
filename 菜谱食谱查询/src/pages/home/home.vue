<template>
    <view class="home-page">
        <!-- 轮播图 -->
        <view class="banner-section">
            <swiper 
                class="banner-swiper" 
                indicator-dots 
                indicator-color="rgba(255,255,255,0.5)" 
                indicator-active-color="#FFFFFF"
                autoplay 
                circular
                :interval="3000"
                :duration="500"
            >
                <swiper-item v-for="item in bannerList" :key="item.id">
                    <view class="banner-item" @click="onBannerClick(item)">
                        <image :src="item.image" class="banner-image" mode="aspectFill" />
                        <view class="banner-title">{{ item.title }}</view>
                    </view>
                </swiper-item>
            </swiper>
        </view>

        <!-- 热门菜系入口 -->
        <view class="category-section">
            <view class="section-header">
                <text class="section-title">热门菜系</text>
                <text class="section-more" @click="goToCategory">查看全部 ></text>
            </view>
            <view class="category-grid">
                <view 
                    class="category-item" 
                    v-for="item in displayCategories" 
                    :key="item.id"
                    @click="onCategoryClick(item)"
                >
                    <view class="category-icon" :style="{ backgroundColor: item.color + '20' }">
                        <text class="icon-text">{{ item.icon }}</text>
                    </view>
                    <text class="category-name">{{ item.name }}</text>
                </view>
            </view>
        </view>

        <!-- 热门推荐 -->
        <view class="recommend-section">
            <view class="section-header">
                <text class="section-title">热门推荐</text>
                <text class="section-more" @click="goToCategory">更多 ></text>
            </view>
            <view class="recipe-list">
                <view 
                    class="recipe-card" 
                    v-for="item in hotRecipes" 
                    :key="item.id"
                    @click="onRecipeClick(item)"
                >
                    <view class="recipe-image-wrapper">
                        <image :src="item.image" class="recipe-image" mode="aspectFill" />
                        <view class="recipe-badge" v-if="item.isHot">
                            <text class="badge-text">🔥 热门</text>
                        </view>
                    </view>
                    <view class="recipe-info">
                        <text class="recipe-name">{{ item.name }}</text>
                        <view class="recipe-meta">
                            <view class="meta-item">
                                <text class="meta-icon">⏱️</text>
                                <text class="meta-text">{{ item.time }}</text>
                            </view>
                            <view class="meta-item">
                                <text class="meta-icon">📊</text>
                                <text class="meta-text">{{ item.difficulty }}</text>
                            </view>
                            <view class="meta-item">
                                <text class="meta-icon">👁️</text>
                                <text class="meta-text">{{ formatNumber(item.views) }}</text>
                            </view>
                        </view>
                        <view class="recipe-tags">
                            <text class="tag" v-for="tag in item.tags.slice(0, 2)" :key="tag">{{ tag }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 推荐菜谱 -->
        <view class="recommend-section">
            <view class="section-header">
                <text class="section-title">精选推荐</text>
            </view>
            <view class="recipe-grid">
                <view 
                    class="recipe-grid-item" 
                    v-for="item in recommendRecipes" 
                    :key="item.id"
                    @click="onRecipeClick(item)"
                >
                    <view class="grid-image-wrapper">
                        <image :src="item.image" class="grid-image" mode="aspectFill" />
                        <view class="grid-category">
                            <text class="category-text">{{ item.categoryName }}</text>
                        </view>
                    </view>
                    <view class="grid-info">
                        <text class="grid-name">{{ item.name }}</text>
                        <view class="grid-meta">
                            <text class="grid-author">{{ item.author }}</text>
                            <view class="grid-stats">
                                <text class="stat-item">❤️ {{ formatNumber(item.likes) }}</text>
                                <text class="stat-item">⭐ {{ formatNumber(item.collections) }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 底部留白 -->
        <view class="bottom-space"></view>
    </view>
</template>

<script>
import { bannerList, categoryList, getHotRecipes, getRecommendRecipes } from '@/data/index.js'

export default {
    data() {
        return {
            bannerList: [],
            categoryList: [],
            hotRecipes: [],
            recommendRecipes: []
        }
    },
    computed: {
        displayCategories() {
            return this.categoryList.slice(0, 8)
        }
    },
    onLoad() {
        this.initData()
    },
    onPullDownRefresh() {
        this.initData()
        setTimeout(() => {
            uni.stopPullDownRefresh()
        }, 1000)
    },
    methods: {
        initData() {
            this.bannerList = bannerList
            this.categoryList = categoryList
            this.hotRecipes = getHotRecipes()
            this.recommendRecipes = getRecommendRecipes()
        },
        formatNumber(num) {
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + 'w'
            }
            if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'k'
            }
            return num
        },
        onBannerClick(item) {
            uni.showToast({
                title: '点击了轮播图：' + item.title,
                icon: 'none'
            })
        },
        onCategoryClick(item) {
            uni.switchTab({
                url: '/pages/category/category'
            })
        },
        onRecipeClick(item) {
            uni.showToast({
                title: '点击了：' + item.name,
                icon: 'none'
            })
        },
        goToCategory() {
            uni.switchTab({
                url: '/pages/category/category'
            })
        }
    }
}
</script>

<style scoped>
.home-page {
    min-height: 100vh;
    background-color: #F8F8F8;
    padding-bottom: 20rpx;
}

/* 轮播图 */
.banner-section {
    margin: 24rpx;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.banner-swiper {
    height: 360rpx;
}

.banner-item {
    position: relative;
    width: 100%;
    height: 100%;
}

.banner-image {
    width: 100%;
    height: 100%;
}

.banner-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24rpx;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
    color: #FFFFFF;
    font-size: 32rpx;
    font-weight: bold;
}

/* 区块头部 */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    padding-bottom: 16rpx;
}

.section-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
}

.section-more {
    font-size: 26rpx;
    color: #999999;
}

/* 热门菜系 */
.category-section {
    background-color: #FFFFFF;
    margin: 0 24rpx;
    margin-bottom: 24rpx;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.category-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 0 16rpx 16rpx;
}

.category-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16rpx 8rpx;
}

.category-icon {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12rpx;
}

.icon-text {
    font-size: 48rpx;
}

.category-name {
    font-size: 26rpx;
    color: #333333;
}

/* 热门推荐列表 */
.recommend-section {
    background-color: #FFFFFF;
    margin: 0 24rpx;
    margin-bottom: 24rpx;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.recipe-list {
    padding: 0 24rpx;
}

.recipe-card {
    display: flex;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #F0F0F0;
}

.recipe-card:last-child {
    border-bottom: none;
}

.recipe-image-wrapper {
    position: relative;
    width: 200rpx;
    height: 160rpx;
    border-radius: 12rpx;
    overflow: hidden;
    flex-shrink: 0;
}

.recipe-image {
    width: 100%;
    height: 100%;
}

.recipe-badge {
    position: absolute;
    top: 8rpx;
    left: 8rpx;
    background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
}

.badge-text {
    font-size: 20rpx;
    color: #FFFFFF;
}

.recipe-info {
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.recipe-name {
    font-size: 30rpx;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.recipe-meta {
    display: flex;
    align-items: center;
    margin-top: 8rpx;
}

.meta-item {
    display: flex;
    align-items: center;
    margin-right: 20rpx;
}

.meta-icon {
    font-size: 24rpx;
    margin-right: 4rpx;
}

.meta-text {
    font-size: 24rpx;
    color: #999999;
}

.recipe-tags {
    display: flex;
    margin-top: 8rpx;
}

.tag {
    font-size: 22rpx;
    color: #FF6B6B;
    background-color: rgba(255, 107, 107, 0.1);
    padding: 4rpx 12rpx;
    border-radius: 4rpx;
    margin-right: 8rpx;
}

/* 精选推荐网格 */
.recipe-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 0 16rpx 16rpx;
}

.recipe-grid-item {
    width: 50%;
    padding: 0 8rpx;
    margin-bottom: 24rpx;
}

.grid-image-wrapper {
    position: relative;
    width: 100%;
    height: 240rpx;
    border-radius: 12rpx;
    overflow: hidden;
}

.grid-image {
    width: 100%;
    height: 100%;
}

.grid-category {
    position: absolute;
    top: 12rpx;
    right: 12rpx;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
}

.category-text {
    font-size: 22rpx;
    color: #FFFFFF;
}

.grid-info {
    margin-top: 12rpx;
}

.grid-name {
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.grid-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8rpx;
}

.grid-author {
    font-size: 24rpx;
    color: #999999;
}

.grid-stats {
    display: flex;
}

.stat-item {
    font-size: 22rpx;
    color: #999999;
    margin-left: 12rpx;
}

/* 底部留白 */
.bottom-space {
    height: 40rpx;
}
</style>