<template>
  <view class="mine-container">
    <!-- 用户信息头部 -->
    <view class="user-header">
      <view class="user-info">
        <image class="user-avatar" :src="userInfo.avatar" mode="aspectFill" />
        <view class="user-text">
          <view class="user-top-row">
            <text class="nickname">{{ userInfo.nickname }}</text>
            <view class="level-tag">
              <text class="level-text">{{ userInfo.level }}</text>
            </view>
          </view>
          <text class="phone">{{ userInfo.phone }}</text>
        </view>
        <text class="setting-icon" @click="goToSetting">⚙️</text>
      </view>
    </view>

    <!-- 账户信息卡片 -->
    <view class="account-card">
      <view class="account-item" @click="showDetail('积分')">
        <text class="account-value">{{ userInfo.points }}</text>
        <text class="account-label">积分</text>
      </view>
      <view class="account-divider"></view>
      <view class="account-item" @click="showDetail('余额')">
        <text class="account-value">¥{{ userInfo.balance }}</text>
        <text class="account-label">余额</text>
      </view>
      <view class="account-divider"></view>
      <view class="account-item" @click="showDetail('优惠券')">
        <text class="account-value">3</text>
        <text class="account-label">优惠券</text>
      </view>
    </view>

    <!-- 订单入口 -->
    <view class="order-section">
      <view class="section-header">
        <text class="section-title">我的订单</text>
        <view class="see-all" @click="goToOrderList">
          <text class="see-all-text">全部订单</text>
          <text class="arrow">›</text>
        </view>
      </view>
      <view class="order-icons">
        <view class="order-icon-item" @click="goToOrder('待付款')">
          <view class="icon-wrapper">
            <text class="icon-text">💳</text>
            <view v-if="true" class="badge">
              <text class="badge-text">2</text>
            </view>
          </view>
          <text class="icon-label">待付款</text>
        </view>
        <view class="order-icon-item" @click="goToOrder('待发货')">
          <view class="icon-wrapper">
            <text class="icon-text">📦</text>
            <view v-if="false" class="badge">
              <text class="badge-text">1</text>
            </view>
          </view>
          <text class="icon-label">待发货</text>
        </view>
        <view class="order-icon-item" @click="goToOrder('待收货')">
          <view class="icon-wrapper">
            <text class="icon-text">🚚</text>
            <view v-if="true" class="badge">
              <text class="badge-text">1</text>
            </view>
          </view>
          <text class="icon-label">待收货</text>
        </view>
        <view class="order-icon-item" @click="goToOrder('待评价')">
          <view class="icon-wrapper">
            <text class="icon-text">⭐</text>
            <view v-if="false" class="badge">
              <text class="badge-text">3</text>
            </view>
          </view>
          <text class="icon-label">待评价</text>
        </view>
        <view class="order-icon-item" @click="goToOrder('售后')">
          <view class="icon-wrapper">
            <text class="icon-text">🔄</text>
          </view>
          <text class="icon-label">售后</text>
        </view>
      </view>
    </view>

    <!-- 功能菜单列表 -->
    <view class="menu-section">
      <view class="menu-item" v-for="(item, index) in menuList" :key="item.id" @click="clickMenu(item)">
        <view class="menu-left">
          <text class="menu-icon">{{ item.icon }}</text>
          <text class="menu-name">{{ item.name }}</text>
        </view>
        <text class="menu-arrow">›</text>
      </view>
    </view>

    <!-- 底部占位 -->
    <view class="bottom-placeholder"></view>
  </view>
</template>

<script>
import { userInfo, menuList } from '@/static/data/mockData.js'

export default {
  data() {
    return {
      userInfo: userInfo,
      menuList: menuList
    }
  },
  onLoad() {
    console.log('个人中心加载')
  },
  methods: {
    goToSetting() {
      uni.showToast({
        title: '进入设置',
        icon: 'none'
      })
    },
    showDetail(type) {
      uni.showToast({
        title: '查看' + type,
        icon: 'none'
      })
    },
    goToOrderList() {
      uni.showToast({
        title: '查看全部订单',
        icon: 'none'
      })
    },
    goToOrder(status) {
      uni.showToast({
        title: '查看' + status + '订单',
        icon: 'none'
      })
    },
    clickMenu(item) {
      uni.showToast({
        title: '点击了: ' + item.name,
        icon: 'none'
      })
    }
  }
}
</script>

<style scoped>
.mine-container {
  background-color: #F5F5F5;
  min-height: 100vh;
  padding-bottom: 20rpx;
}

/* 用户信息头部 */
.user-header {
  background: linear-gradient(180deg, #FF6B6B 0%, #FF8E8E 100%);
  padding: 40rpx 30rpx;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.5);
}

.user-text {
  flex: 1;
  margin-left: 24rpx;
  display: flex;
  flex-direction: column;
}

.user-top-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.nickname {
  font-size: 36rpx;
  font-weight: bold;
  color: #FFFFFF;
  margin-right: 16rpx;
}

.level-tag {
  background-color: rgba(255, 255, 255, 0.25);
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.level-text {
  font-size: 22rpx;
  color: #FFFFFF;
}

.phone {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
}

.setting-icon {
  font-size: 40rpx;
  padding: 10rpx;
}

/* 账户信息卡片 */
.account-card {
  background-color: #FFFFFF;
  margin: -30rpx 30rpx 0;
  border-radius: 20rpx;
  padding: 30rpx 0;
  display: flex;
  align-items: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 10;
}

.account-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.account-value {
  font-size: 40rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8rpx;
}

.account-label {
  font-size: 24rpx;
  color: #999999;
}

.account-divider {
  width: 2rpx;
  height: 60rpx;
  background-color: #EEEEEE;
}

/* 订单入口 */
.order-section {
  background-color: #FFFFFF;
  margin: 30rpx;
  border-radius: 20rpx;
  padding: 24rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
}

.see-all {
  display: flex;
  align-items: center;
}

.see-all-text {
  font-size: 26rpx;
  color: #999999;
  margin-right: 4rpx;
}

.arrow {
  font-size: 28rpx;
  color: #999999;
}

.order-icons {
  display: flex;
  justify-content: space-between;
}

.order-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrapper {
  position: relative;
  width: 88rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
}

.icon-text {
  font-size: 48rpx;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #FF4D4F;
  min-width: 32rpx;
  height: 32rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8rpx;
}

.badge-text {
  font-size: 20rpx;
  color: #FFFFFF;
}

.icon-label {
  font-size: 24rpx;
  color: #666666;
}

/* 功能菜单列表 */
.menu-section {
  background-color: #FFFFFF;
  margin: 0 30rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
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

.menu-name {
  font-size: 28rpx;
  color: #333333;
}

.menu-arrow {
  font-size: 32rpx;
  color: #CCCCCC;
}

/* 底部占位 */
.bottom-placeholder {
  height: 40rpx;
}
</style>
