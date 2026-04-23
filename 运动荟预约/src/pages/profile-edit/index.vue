<template>
  <view class="edit-container">
    <view class="form-section">
      <view class="avatar-section">
        <image class="avatar-preview" :src="formData.avatar" mode="aspectFill" @click="changeAvatar" />
        <text class="avatar-tip">点击更换头像</text>
      </view>

      <view class="form-item">
        <view class="form-label">
          <text class="label-text">姓名</text>
          <text class="label-required">*</text>
        </view>
        <input 
          class="form-input" 
          type="text" 
          v-model="formData.name" 
          placeholder="请输入姓名"
          placeholder-class="input-placeholder"
        />
      </view>

      <view class="form-item">
        <view class="form-label">
          <text class="label-text">手机号</text>
          <text class="label-required">*</text>
        </view>
        <input 
          class="form-input" 
          type="number" 
          v-model="formData.phone" 
          placeholder="请输入手机号"
          placeholder-class="input-placeholder"
          maxlength="11"
        />
      </view>

      <view class="form-item">
        <view class="form-label">
          <text class="label-text">邮箱</text>
        </view>
        <input 
          class="form-input" 
          type="text" 
          v-model="formData.email" 
          placeholder="请输入邮箱"
          placeholder-class="input-placeholder"
        />
      </view>

      <view class="form-item">
        <view class="form-label">
          <text class="label-text">性别</text>
        </view>
        <view class="gender-options">
          <view 
            class="gender-option" 
            :class="{ active: formData.gender === '男' }"
            @click="selectGender('男')"
          >
            <view class="radio-circle" :class="{ checked: formData.gender === '男' }">
              <view class="radio-dot" v-if="formData.gender === '男'"></view>
            </view>
            <text class="gender-text">男</text>
          </view>
          <view 
            class="gender-option" 
            :class="{ active: formData.gender === '女' }"
            @click="selectGender('女')"
          >
            <view class="radio-circle" :class="{ checked: formData.gender === '女' }">
              <view class="radio-dot" v-if="formData.gender === '女'"></view>
            </view>
            <text class="gender-text">女</text>
          </view>
          <view 
            class="gender-option" 
            :class="{ active: formData.gender === '保密' }"
            @click="selectGender('保密')"
          >
            <view class="radio-circle" :class="{ checked: formData.gender === '保密' }">
              <view class="radio-dot" v-if="formData.gender === '保密'"></view>
            </view>
            <text class="gender-text">保密</text>
          </view>
        </view>
      </view>
    </view>

    <view class="action-section">
      <button class="cancel-btn" @click="goBack">
        <text class="cancel-text">取消</text>
      </button>
      <button class="save-btn" @click="saveProfile">
        <text class="save-text">保存修改</text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import userData from '@/static/data/user.js'

interface User {
  id: string
  avatar: string
  name: string
  phone: string
  email: string
  gender: string
  memberLevel: string
  points: number
  createTime: string
}

const user = ref<User>(userData as User)

const formData = reactive({
  avatar: user.value.avatar,
  name: user.value.name,
  phone: user.value.phone.replace(/\*/g, '0'),
  email: user.value.email,
  gender: user.value.gender
})

onLoad(() => {
  uni.setNavigationBarTitle({ title: '编辑个人信息' })
})

const selectGender = (gender: string) => {
  formData.gender = gender
}

const changeAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.avatar = res.tempFilePaths[0]
    }
  })
}

const validateForm = (): boolean => {
  if (!formData.name.trim()) {
    uni.showToast({
      title: '请输入姓名',
      icon: 'none'
    })
    return false
  }

  if (!formData.phone.trim()) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
    return false
  }

  if (!/^1[3-9]\d{9}$/.test(formData.phone.replace(/\*/g, '0'))) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return false
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    uni.showToast({
      title: '请输入正确的邮箱格式',
      icon: 'none'
    })
    return false
  }

  return true
}

const saveProfile = () => {
  if (!validateForm()) return

  uni.showLoading({ title: '保存中...' })

  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1500
    })

    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 800)
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped>
.edit-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40rpx;
}

.form-section {
  background-color: #ffffff;
  margin: 24rpx;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 0 40rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  margin-bottom: 32rpx;
}

.avatar-preview {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 4rpx solid #e6f7ff;
}

.avatar-tip {
  font-size: 24rpx;
  color: #999999;
  margin-top: 16rpx;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 32rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.form-item:last-child {
  border-bottom: none;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 4rpx;
  width: 160rpx;
  flex-shrink: 0;
}

.label-text {
  font-size: 28rpx;
  color: #333333;
}

.label-required {
  font-size: 28rpx;
  color: #ff4d4f;
}

.form-input {
  flex: 1;
  height: 60rpx;
  font-size: 28rpx;
  color: #333333;
  text-align: right;
}

.input-placeholder {
  color: #cccccc;
  text-align: right;
}

.gender-options {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  gap: 40rpx;
}

.gender-option {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.radio-circle {
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #cccccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-circle.checked {
  border-color: #1890ff;
}

.radio-dot {
  width: 20rpx;
  height: 20rpx;
  background-color: #1890ff;
  border-radius: 50%;
}

.gender-text {
  font-size: 28rpx;
  color: #333333;
}

.action-section {
  padding: 40rpx 24rpx;
  display: flex;
  flex-direction: row;
  gap: 24rpx;
}

.save-btn, .cancel-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.save-btn {
  background: linear-gradient(135deg, #1890FF, #40A9FF);
}

.cancel-btn {
  background-color: #ffffff;
  border: 2rpx solid #e0e0e0;
}

.save-text {
  font-size: 30rpx;
  color: #ffffff;
  font-weight: 500;
}

.cancel-text {
  font-size: 30rpx;
  color: #666666;
}

.save-btn::after, .cancel-btn::after {
  border: none;
}
</style>
