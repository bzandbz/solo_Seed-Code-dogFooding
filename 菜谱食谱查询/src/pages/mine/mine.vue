<template>
    <view class="mine-page">
        <!-- 用户信息头部 -->
        <view class="user-header">
            <view class="header-bg">
                <view class="bg-gradient"></view>
            </view>
            <view class="user-info">
                <view class="avatar-wrapper">
                    <image :src="userInfo.avatar" class="user-avatar" mode="aspectFill" />
                    <view class="vip-badge" v-if="userInfo.isVip">
                        <text class="vip-text">VIP</text>
                    </view>
                </view>
                <view class="user-detail">
                    <view class="name-row">
                        <text class="user-name">{{ userInfo.nickname }}</text>
                        <view class="level-tag">
                            <text class="level-icon">{{ userInfo.levelIcon }}</text>
                            <text class="level-text">{{ userInfo.level }}</text>
                        </view>
                    </view>
                    <text class="user-phone">{{ userInfo.phone }}</text>
                    <view class="sign-info" v-if="userInfo.signInDays > 0">
                        <text class="sign-text">已连续签到 {{ userInfo.signInDays }} 天</text>
                        <text class="sign-btn" @click="onSignClick">立即签到</text>
                    </view>
                </view>
                <view class="edit-btn" @click="onEditClick">
                    <text class="edit-icon">⚙️</text>
                </view>
            </view>

            <!-- 数据统计 -->
            <view class="stats-card">
                <view class="stat-item" @click="onStatClick('following')">
                    <text class="stat-number">{{ userInfo.following }}</text>
                    <text class="stat-label">关注</text>
                </view>
                <view class="stat-divider"></view>
                <view class="stat-item" @click="onStatClick('followers')">
                    <text class="stat-number">{{ userInfo.followers }}</text>
                    <text class="stat-label">粉丝</text>
                </view>
                <view class="stat-divider"></view>
                <view class="stat-item" @click="onStatClick('likes')">
                    <text class="stat-number">{{ formatNumber(userInfo.likes) }}</text>
                    <text class="stat-label">获赞</text>
                </view>
                <view class="stat-divider"></view>
                <view class="stat-item" @click="onStatClick('points')">
                    <text class="stat-number">{{ formatNumber(userInfo.points) }}</text>
                    <text class="stat-label">积分</text>
                </view>
            </view>
        </view>

        <!-- 功能入口区 -->
        <view class="function-section">
            <view class="section-header">
                <text class="section-title">常用功能</text>
            </view>
            <view class="function-grid">
                <view class="function-item" @click="onFunctionClick('collection')">
                    <view class="function-icon-wrapper" style="background: linear-gradient(135deg, #FF6B6B, #FF8E8E);">
                        <text class="function-icon">❤️</text>
                        <view class="badge" v-if="userInfo.collections > 0">
                            <text class="badge-text">{{ userInfo.collections }}</text>
                        </view>
                    </view>
                    <text class="function-name">我的收藏</text>
                </view>
                <view class="function-item" @click="onFunctionClick('history')">
                    <view class="function-icon-wrapper" style="background: linear-gradient(135deg, #4ECDC4, #6EE7DE);">
                        <text class="function-icon">📝</text>
                    </view>
                    <text class="function-name">浏览历史</text>
                </view>
                <view class="function-item" @click="onFunctionClick('works')">
                    <view class="function-icon-wrapper" style="background: linear-gradient(135deg, #FF9F1C, #FFB84D);">
                        <text class="function-icon">🍳</text>
                    </view>
                    <text class="function-name">我的作品</text>
                </view>
                <view class="function-item" @click="onFunctionClick('draft')">
                    <view class="function-icon-wrapper" style="background: linear-gradient(135deg, #9B59B6, #B07BD1);">
                        <text class="function-icon">📋</text>
                    </view>
                    <text class="function-name">草稿箱</text>
                </view>
            </view>
        </view>

        <!-- 菜单列表 -->
        <view class="menu-section">
            <view class="section-header">
                <text class="section-title">更多服务</text>
            </view>
            <view class="menu-list">
                <view class="menu-item" v-for="item in menuList" :key="item.id" @click="onMenuClick(item)">
                    <view class="menu-left">
                        <text class="menu-icon">{{ item.icon }}</text>
                        <view class="menu-content">
                            <text class="menu-title">{{ item.title }}</text>
                            <text class="menu-desc">{{ item.desc }}</text>
                        </view>
                    </view>
                    <view class="menu-right">
                        <text class="menu-badge" v-if="item.badge > 0">{{ item.badge }}</text>
                        <text class="menu-arrow">›</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 底部版权 -->
        <view class="footer">
            <text class="footer-text">菜谱食谱 v1.0.0</text>
        </view>

        <!-- 底部留白 -->
        <view class="bottom-space"></view>
    </view>
</template>

<script>
import { userInfo, mineMenuList } from '@/data/index.js'

export default {
    data() {
        return {
            userInfo: {},
            menuList: []
        }
    },
    onLoad() {
        this.initData()
    },
    methods: {
        initData() {
            this.userInfo = userInfo
            this.menuList = mineMenuList
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
        onEditClick() {
            uni.showToast({
                title: '编辑个人信息',
                icon: 'none'
            })
        },
        onSignClick() {
            uni.showToast({
                title: '签到成功！',
                icon: 'success'
            })
        },
        onStatClick(type) {
            const typeMap = {
                following: '关注列表',
                followers: '粉丝列表',
                likes: '获赞记录',
                points: '积分详情'
            }
            uni.showToast({
                title: typeMap[type] || '查看详情',
                icon: 'none'
            })
        },
        onFunctionClick(type) {
            const typeMap = {
                collection: '我的收藏',
                history: '浏览历史',
                works: '我的作品',
                draft: '草稿箱'
            }
            uni.showToast({
                title: typeMap[type] || '功能开发中',
                icon: 'none'
            })
        },
        onMenuClick(item) {
            uni.showToast({
                title: '点击了：' + item.title,
                icon: 'none'
            })
        }
    }
}
</script>

<style scoped>
.mine-page {
    min-height: 100vh;
    background-color: #F8F8F8;
}

/* 用户头部 */
.user-header {
    position: relative;
    padding-bottom: 60rpx;
}

.header-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400rpx;
    overflow: hidden;
}

.bg-gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 50%, #FFB3B3 100%);
}

.user-info {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    padding: 60rpx 32rpx 24rpx;
}

.avatar-wrapper {
    position: relative;
    flex-shrink: 0;
}

.user-avatar {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    border: 6rpx solid #FFFFFF;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
}

.vip-badge {
    position: absolute;
    bottom: 8rpx;
    right: -8rpx;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(255, 165, 0, 0.4);
}

.vip-text {
    font-size: 20rpx;
    color: #FFFFFF;
    font-weight: bold;
}

.user-detail {
    flex: 1;
    margin-left: 24rpx;
    padding-top: 8rpx;
}

.name-row {
    display: flex;
    align-items: center;
    margin-bottom: 8rpx;
}

.user-name {
    font-size: 40rpx;
    font-weight: bold;
    color: #FFFFFF;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.level-tag {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.25);
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
    margin-left: 16rpx;
}

.level-icon {
    font-size: 24rpx;
    margin-right: 4rpx;
}

.level-text {
    font-size: 22rpx;
    color: #FFFFFF;
}

.user-phone {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 16rpx;
    display: block;
}

.sign-info {
    display: flex;
    align-items: center;
}

.sign-text {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.9);
}

.sign-btn {
    font-size: 24rpx;
    color: #FFFFFF;
    background-color: rgba(255, 255, 255, 0.25);
    padding: 6rpx 20rpx;
    border-radius: 20rpx;
    margin-left: 16rpx;
}

.edit-btn {
    width: 64rpx;
    height: 64rpx;
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.edit-icon {
    font-size: 32rpx;
}

/* 数据统计卡片 */
.stats-card {
    position: relative;
    z-index: 1;
    background-color: #FFFFFF;
    margin: 0 24rpx;
    border-radius: 20rpx;
    padding: 32rpx 0;
    display: flex;
    align-items: center;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
    margin-top: -40rpx;
}

.stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-number {
    font-size: 40rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 8rpx;
}

.stat-label {
    font-size: 24rpx;
    color: #999999;
}

.stat-divider {
    width: 1rpx;
    height: 60rpx;
    background-color: #F0F0F0;
}

/* 区块头部 */
.section-header {
    padding: 32rpx 24rpx 16rpx;
}

.section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
}

/* 功能入口区 */
.function-section {
    background-color: #FFFFFF;
    margin: 0 24rpx;
    margin-bottom: 24rpx;
    border-radius: 20rpx;
    overflow: hidden;
}

.function-grid {
    display: flex;
    padding: 0 16rpx 32rpx;
}

.function-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16rpx 8rpx;
}

.function-icon-wrapper {
    position: relative;
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.function-icon {
    font-size: 44rpx;
}

.badge {
    position: absolute;
    top: -8rpx;
    right: -8rpx;
    min-width: 36rpx;
    height: 36rpx;
    padding: 0 10rpx;
    background-color: #FF6B6B;
    border-radius: 18rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2rpx 8rpx rgba(255, 107, 107, 0.4);
}

.badge-text {
    font-size: 20rpx;
    color: #FFFFFF;
    font-weight: bold;
}

.function-name {
    font-size: 26rpx;
    color: #333333;
}

/* 菜单列表 */
.menu-section {
    background-color: #FFFFFF;
    margin: 0 24rpx;
    margin-bottom: 24rpx;
    border-radius: 20rpx;
    overflow: hidden;
}

.menu-list {
    padding: 0 24rpx;
}

.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28rpx 0;
    border-bottom: 1rpx solid #F5F5F5;
}

.menu-item:last-child {
    border-bottom: none;
}

.menu-left {
    display: flex;
    align-items: center;
}

.menu-icon {
    font-size: 40rpx;
    margin-right: 20rpx;
}

.menu-content {
    display: flex;
    flex-direction: column;
}

.menu-title {
    font-size: 30rpx;
    color: #333333;
    margin-bottom: 4rpx;
}

.menu-desc {
    font-size: 22rpx;
    color: #999999;
}

.menu-right {
    display: flex;
    align-items: center;
}

.menu-badge {
    font-size: 22rpx;
    color: #FFFFFF;
    background-color: #FF6B6B;
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
    margin-right: 12rpx;
}

.menu-arrow {
    font-size: 40rpx;
    color: #CCCCCC;
}

/* 底部版权 */
.footer {
    display: flex;
    justify-content: center;
    padding: 40rpx 0;
}

.footer-text {
    font-size: 24rpx;
    color: #CCCCCC;
}

/* 底部留白 */
.bottom-space {
    height: 40rpx;
}
</style>