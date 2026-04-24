<template>
    <view class="category-page">
        <!-- 分类标签栏 -->
        <view class="tab-bar">
            <scroll-view class="tab-scroll" scroll-x show-scrollbar="false">
                <view class="tab-list">
                    <view 
                        class="tab-item" 
                        :class="{ active: currentTab === item.key }"
                        v-for="item in categoryTabs" 
                        :key="item.id"
                        @click="onTabClick(item)"
                    >
                        <text class="tab-text">{{ item.name }}</text>
                        <view class="tab-indicator" v-if="currentTab === item.key"></view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 菜谱列表 -->
        <view class="content-section">
            <view class="list-header">
                <text class="list-title">共 {{ filteredRecipes.length }} 道菜谱</text>
                <view class="sort-options">
                    <text 
                        class="sort-item" 
                        :class="{ active: sortType === 'default' }"
                        @click="onSortClick('default')"
                    >默认</text>
                    <text 
                        class="sort-item" 
                        :class="{ active: sortType === 'hot' }"
                        @click="onSortClick('hot')"
                    >最热</text>
                    <text 
                        class="sort-item" 
                        :class="{ active: sortType === 'new' }"
                        @click="onSortClick('new')"
                    >最新</text>
                </view>
            </view>

            <view class="recipe-grid" v-if="filteredRecipes.length > 0">
                <view 
                    class="recipe-card" 
                    v-for="item in sortedRecipes" 
                    :key="item.id"
                    @click="onRecipeClick(item)"
                >
                    <view class="card-image-wrapper">
                        <image :src="item.image" class="card-image" mode="aspectFill" />
                        <view class="card-badge" v-if="item.isHot">
                            <text class="badge-icon">🔥</text>
                        </view>
                        <view class="card-time">
                            <text class="time-text">{{ item.time }}</text>
                        </view>
                    </view>
                    <view class="card-info">
                        <text class="card-name">{{ item.name }}</text>
                        <view class="card-meta">
                            <view class="meta-left">
                                <text class="category-tag">{{ item.categoryName }}</text>
                                <text class="difficulty-tag">{{ item.difficulty }}</text>
                            </view>
                            <view class="meta-right">
                                <text class="stat-item">👁️ {{ formatNumber(item.views) }}</text>
                            </view>
                        </view>
                        <view class="card-tags">
                            <text class="mini-tag" v-for="tag in item.tags.slice(0, 3)" :key="tag">{{ tag }}</text>
                        </view>
                        <view class="card-footer">
                            <view class="author-info">
                                <image :src="item.authorAvatar" class="author-avatar" mode="aspectFill" />
                                <text class="author-name">{{ item.author }}</text>
                            </view>
                            <view class="action-info">
                                <text class="action-item">❤️ {{ formatNumber(item.likes) }}</text>
                                <text class="action-item">⭐ {{ formatNumber(item.collections) }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 空状态 -->
            <view class="empty-state" v-else>
                <view class="empty-icon">🍽️</view>
                <text class="empty-text">暂无相关菜谱</text>
                <text class="empty-desc">换个分类试试吧</text>
            </view>
        </view>

        <!-- 底部留白 -->
        <view class="bottom-space"></view>
    </view>
</template>

<script>
import { categoryTabs, getRecipesByCategory } from '@/data/index.js'

export default {
    data() {
        return {
            categoryTabs: [],
            currentTab: 'all',
            sortType: 'default',
            allRecipes: []
        }
    },
    computed: {
        filteredRecipes() {
            return getRecipesByCategory(this.currentTab)
        },
        sortedRecipes() {
            let recipes = [...this.filteredRecipes]
            switch (this.sortType) {
                case 'hot':
                    recipes.sort((a, b) => b.views - a.views)
                    break
                case 'new':
                    recipes.sort((a, b) => b.id - a.id)
                    break
                default:
                    break
            }
            return recipes
        }
    },
    onLoad() {
        this.initData()
    },
    methods: {
        initData() {
            this.categoryTabs = categoryTabs
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
        onTabClick(item) {
            this.currentTab = item.key
        },
        onSortClick(type) {
            this.sortType = type
        },
        onRecipeClick(item) {
            uni.showToast({
                title: '点击了：' + item.name,
                icon: 'none'
            })
        }
    }
}
</script>

<style scoped>
.category-page {
    min-height: 100vh;
    background-color: #F8F8F8;
}

/* 分类标签栏 */
.tab-bar {
    background-color: #FFFFFF;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.tab-scroll {
    white-space: nowrap;
}

.tab-list {
    display: flex;
    padding: 0 16rpx;
}

.tab-item {
    position: relative;
    padding: 24rpx 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tab-text {
    font-size: 28rpx;
    color: #666666;
    transition: all 0.3s ease;
}

.tab-item.active .tab-text {
    color: #FF6B6B;
    font-weight: bold;
}

.tab-indicator {
    position: absolute;
    bottom: 0;
    width: 40rpx;
    height: 6rpx;
    background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
    border-radius: 3rpx;
}

/* 内容区域 */
.content-section {
    padding: 24rpx;
}

.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
}

.list-title {
    font-size: 28rpx;
    color: #666666;
}

.sort-options {
    display: flex;
}

.sort-item {
    font-size: 26rpx;
    color: #999999;
    margin-left: 24rpx;
    padding: 8rpx 16rpx;
    border-radius: 20rpx;
    transition: all 0.3s ease;
}

.sort-item.active {
    color: #FF6B6B;
    background-color: rgba(255, 107, 107, 0.1);
}

/* 菜谱网格 */
.recipe-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -12rpx;
}

.recipe-card {
    width: 50%;
    padding: 0 12rpx;
    margin-bottom: 24rpx;
}

.card-image-wrapper {
    position: relative;
    width: 100%;
    height: 300rpx;
    border-radius: 16rpx;
    overflow: hidden;
}

.card-image {
    width: 100%;
    height: 100%;
}

.card-badge {
    position: absolute;
    top: 12rpx;
    left: 12rpx;
    background-color: rgba(255, 107, 107, 0.9);
    padding: 6rpx 12rpx;
    border-radius: 20rpx;
}

.badge-icon {
    font-size: 24rpx;
}

.card-time {
    position: absolute;
    bottom: 12rpx;
    right: 12rpx;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 6rpx 12rpx;
    border-radius: 20rpx;
}

.time-text {
    font-size: 22rpx;
    color: #FFFFFF;
}

.card-info {
    padding: 16rpx 4rpx 0;
}

.card-name {
    font-size: 30rpx;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
}

.card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12rpx;
}

.meta-left {
    display: flex;
    align-items: center;
}

.category-tag {
    font-size: 22rpx;
    color: #FF6B6B;
    background-color: rgba(255, 107, 107, 0.1);
    padding: 4rpx 12rpx;
    border-radius: 4rpx;
    margin-right: 8rpx;
}

.difficulty-tag {
    font-size: 22rpx;
    color: #FF9F1C;
    background-color: rgba(255, 159, 28, 0.1);
    padding: 4rpx 12rpx;
    border-radius: 4rpx;
}

.meta-right {
    display: flex;
}

.stat-item {
    font-size: 22rpx;
    color: #999999;
}

.card-tags {
    display: flex;
    margin-top: 12rpx;
    flex-wrap: wrap;
}

.mini-tag {
    font-size: 20rpx;
    color: #999999;
    background-color: #F5F5F5;
    padding: 2rpx 8rpx;
    border-radius: 4rpx;
    margin-right: 8rpx;
    margin-bottom: 4rpx;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12rpx;
    padding-top: 12rpx;
    border-top: 1rpx solid #F0F0F0;
}

.author-info {
    display: flex;
    align-items: center;
}

.author-avatar {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    margin-right: 8rpx;
}

.author-name {
    font-size: 22rpx;
    color: #999999;
}

.action-info {
    display: flex;
}

.action-item {
    font-size: 22rpx;
    color: #999999;
    margin-left: 12rpx;
}

/* 空状态 */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
}

.empty-icon {
    font-size: 120rpx;
    margin-bottom: 24rpx;
}

.empty-text {
    font-size: 32rpx;
    color: #333333;
    font-weight: bold;
    margin-bottom: 8rpx;
}

.empty-desc {
    font-size: 26rpx;
    color: #999999;
}

/* 底部留白 */
.bottom-space {
    height: 40rpx;
}
</style>