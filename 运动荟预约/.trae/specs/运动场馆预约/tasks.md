# 运动场馆预约软件 - 实现计划

## [x] Task 1: 初始化uni-app项目
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 使用uni-app官方模板创建新项目
  - 选择Vue3版本（推荐）
  - 配置项目基础结构
  - 安装依赖并验证项目可正常运行
- **Acceptance Criteria Addressed**: [AC-8, AC-9]
- **Test Requirements**:
  - `programmatic` TR-1.1: 运行 `npm install` 无错误
  - `programmatic` TR-1.2: 运行 `npm run dev:h5` 构建成功
  - `human-judgement` TR-1.3: 浏览器打开后能看到uni-app默认页面
- **Notes**: 使用 HBuilderX 或 vite-uni-app 模板创建

## [x] Task 2: 配置TabBar和路由
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 在 pages.json 中配置3个TabBar页面
  - TabBar 1: 首页 (pages/home/index)
  - TabBar 2: 场馆列表 (pages/venue-list/index)
  - TabBar 3: 我的预约 (pages/my-bookings/index)
  - 配置非TabBar页面路由：场馆详情、预约详情
  - 准备TabBar图标（使用uni-icons或简单图标）
- **Acceptance Criteria Addressed**: [AC-1, AC-8, AC-9]
- **Test Requirements**:
  - `programmatic` TR-2.1: pages.json 中包含3个tabBar配置
  - `human-judgement` TR-2.2: 应用启动后底部显示3个TabBar
  - `human-judgement` TR-2.3: 点击TabBar可正常切换页面
- **Notes**: TabBar图标建议使用内置图标或简单SVG

## [x] Task 3: 创建静态数据文件
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 创建 `static/data/venues.js` 场馆数据
  - 场馆数据字段：id, name, type, price, distance, address, description, image
  - 创建 `static/data/bookings.js` 预约数据
  - 预约数据字段：id, venueId, venueName, venueAddress, bookingTime, status
  - 创建 `static/data/categories.js` 场馆分类数据
  - 分类：羽毛球馆、篮球馆、乒乓球馆、网球场、游泳馆、健身房
- **Acceptance Criteria Addressed**: [FR-2, FR-4, FR-6, FR-7]
- **Test Requirements**:
  - `programmatic` TR-3.1: 数据文件存在且可被正确 import/require
  - `programmatic` TR-3.2: 场馆数据至少包含3种类型，每种至少2个场馆
  - `programmatic` TR-3.3: 预约数据至少包含2条记录
- **Notes**: 数据格式保持简单，便于后续维护

## [/] Task 4: 开发首页页面
- **Priority**: P0
- **Depends On**: Task 2, Task 3
- **Description**: 
  - 顶部搜索框：输入场馆名称，点击搜索按钮触发搜索
  - 搜索逻辑：模糊匹配场馆名称，找到后跳转到场馆详情页
  - 场馆分类网格：展示6个分类入口（图标+文字）
  - 点击分类跳转到场馆列表页，并带上分类type参数
  - 简单的Banner或欢迎区域
- **Acceptance Criteria Addressed**: [AC-2, AC-3, FR-2, FR-3]
- **Test Requirements**:
  - `human-judgement` TR-4.1: 页面有搜索框和分类入口
  - `programmatic` TR-4.2: 输入存在的场馆名称搜索，成功跳转详情页
  - `programmatic` TR-4.3: 输入不存在的名称，显示友好提示
  - `programmatic` TR-4.4: 点击"篮球馆"分类，跳转到列表页且参数正确
- **Notes**: 搜索使用 `uni.navigateTo` 传参，找不到时用 `uni.showToast`

## [/] Task 5: 开发场馆列表页面
- **Priority**: P0
- **Depends On**: Task 2, Task 3
- **Description**: 
  - 从静态数据读取场馆列表
  - 如果有路由参数 type，则按类型过滤场馆
  - 以卡片形式展示每个场馆：名称、价格、距离、图片
  - 点击卡片跳转到场馆详情页（携带venueId）
  - 简单的列表样式，支持滚动
- **Acceptance Criteria Addressed**: [AC-4, AC-5, FR-4, FR-5]
- **Test Requirements**:
  - `human-judgement` TR-5.1: 每个场馆卡片显示名称、金额、距离
  - `programmatic` TR-5.2: 带type参数进入时，列表只显示对应类型场馆
  - `programmatic` TR-5.3: 点击卡片成功跳转到详情页，参数正确
  - `human-judgement` TR-5.4: 列表可正常滚动
- **Notes**: 卡片样式简洁美观，价格显示"¥XX/小时"格式

## [x] Task 6: 开发场馆详情页面
- **Priority**: P1
- **Depends On**: Task 5
- **Description**: 
  - 从路由参数获取venueId
  - 根据id从静态数据获取场馆详情
  - 展示：场馆图片、名称、价格、距离、地址、简介
  - 显示可用时段（静态模拟）
  - "立即预约"按钮：点击后显示提示（模拟预约成功），不实际提交
- **Acceptance Criteria Addressed**: [AC-5, FR-5]
- **Test Requirements**:
  - `human-judgement` TR-6.1: 页面展示场馆名称、地址、价格等完整信息
  - `programmatic` TR-6.2: 根据不同venueId显示对应场馆信息
  - `human-judgement` TR-6.3: 点击预约按钮有反馈（弹窗或提示）
- **Notes**: 可用时段可使用固定数据，如"09:00-10:00, 14:00-15:00"

## [x] Task 7: 开发我的预约列表页面
- **Priority**: P0
- **Depends On**: Task 2, Task 3
- **Description**: 
  - 从静态预约数据读取预约列表
  - 以列表形式展示：场馆名称、预约时间、状态
  - 点击列表项跳转到预约详情页（携带bookingId）
  - 空状态处理（虽然数据至少2条，但仍需考虑）
- **Acceptance Criteria Addressed**: [AC-6, FR-6]
- **Test Requirements**:
  - `human-judgement` TR-7.1: 页面显示预约列表，至少2条数据
  - `programmatic` TR-7.2: 点击列表项跳转到预约详情页，参数正确
  - `human-judgement` TR-7.3: 列表样式清晰，信息易读
- **Notes**: 状态显示如"已预约"、"已完成"等

## [x] Task 8: 开发预约详情页面
- **Priority**: P0
- **Depends On**: Task 7
- **Description**: 
  - 从路由参数获取bookingId
  - 根据id从静态数据获取预约详情
  - 展示：场馆名称、场馆地址、预约时间
  - 可选补充：预约状态、价格信息
- **Acceptance Criteria Addressed**: [AC-7, FR-7]
- **Test Requirements**:
  - `human-judgement` TR-8.1: 页面展示场馆名称、场馆地址、预约时间
  - `programmatic` TR-8.2: 不同bookingId显示对应预约信息
  - `human-judgement` TR-8.3: 信息布局清晰美观
- **Notes**: 预约时间格式如"2026-04-25 14:00-16:00"

## [/] Task 9: 统一UI样式和优化
- **Priority**: P1
- **Depends On**: Task 4, Task 5, Task 7
- **Description**: 
  - 统一颜色主题（主色、辅助色）
  - 统一字体大小、间距
  - TabBar图标和文字样式统一
  - 添加简单的页面过渡效果
  - 检查各页面在不同屏幕尺寸下的适配
- **Acceptance Criteria Addressed**: [NFR-2, NFR-3]
- **Test Requirements**:
  - `human-judgement` TR-9.1: 各页面视觉风格一致
  - `human-judgement` TR-9.2: 在不同屏幕尺寸下无明显布局问题
  - `human-judgement` TR-9.3: 页面切换流畅，无卡顿
- **Notes**: 建议主色使用运动感的颜色，如蓝色、橙色

## [x] Task 10: H5端自测验证
- **Priority**: P0
- **Depends On**: Task 1-9
- **Description**: 
  - 运行 `npm run dev:h5`
  - 验证所有TabBar页面正常显示
  - 验证首页搜索功能（正常+异常场景）
  - 验证分类跳转和列表过滤
  - 验证场馆列表->详情跳转
  - 验证我的预约列表->详情跳转
  - 记录测试结果和问题
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8]
- **Test Requirements**:
  - `programmatic` TR-10.1: H5构建成功，无控制台错误
  - `human-judgement` TR-10.2: 所有页面正常显示，无空白页
  - `programmatic` TR-10.3: 搜索"阳光篮球馆"成功跳转对应详情页
  - `programmatic` TR-10.4: 点击篮球馆分类，列表只显示篮球馆
  - `programmatic` TR-10.5: 所有页面跳转功能正常
- **Notes**: 这是核心验收环节，必须确保所有功能正常

## [x] Task 11: 小程序兼容性检查
- **Priority**: P1
- **Depends On**: Task 10
- **Description**: 
  - 运行 `npm run dev:mp-weixin` 生成小程序代码
  - 检查代码结构是否符合小程序规范
  - 检查是否使用了H5特有API（如document、window等）
  - 确保所有uni API使用正确
- **Acceptance Criteria Addressed**: [AC-9, NFR-1]
- **Test Requirements**:
  - `programmatic` TR-11.1: 小程序构建成功
  - `programmatic` TR-11.2: 代码中未使用H5特有API
  - `human-judgement` TR-11.3: pages.json 配置符合小程序规范
- **Notes**: 不强制要求开发者工具中运行，但代码结构必须兼容
