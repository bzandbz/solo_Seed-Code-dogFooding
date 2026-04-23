const reviews = [
  {
    id: 'review_001',
    venueId: 'venue_001',
    userName: '张三',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20male%20portrait&image_size=square',
    rating: 5,
    content: '场地非常棒，木地板质量很好，光线也很充足，下次还会来！',
    createTime: '2026-04-20 19:30',
    images: []
  },
  {
    id: 'review_002',
    venueId: 'venue_001',
    userName: '李四',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20female%20portrait&image_size=square',
    rating: 4,
    content: '场地不错，就是周末人有点多，建议提前预约。价格合理，环境整洁。',
    createTime: '2026-04-18 15:00',
    images: []
  },
  {
    id: 'review_003',
    venueId: 'venue_001',
    userName: '王五',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20young%20male&image_size=square',
    rating: 5,
    content: '周末和朋友一起来打球，体验非常好！场地宽敞，设施齐全，更衣室也很干净。',
    createTime: '2026-04-15 21:00',
    images: []
  },
  {
    id: 'review_011',
    venueId: 'venue_001',
    userName: '赵小明',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20teen%20male&image_size=square',
    rating: 5,
    content: '作为一个篮球爱好者，我每周都会来这里打球。场地维护得非常好，篮筐高度标准，三分线也很清晰。强烈推荐给所有篮球爱好者！',
    createTime: '2026-04-22 18:45',
    images: []
  },
  {
    id: 'review_012',
    venueId: 'venue_001',
    userName: '李美丽',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20young%20female&image_size=square',
    rating: 4,
    content: '带孩子来上篮球课，场地环境不错，教练也很专业。就是停车场有点小，周末停车不太方便。总体来说还是很满意的。',
    createTime: '2026-04-21 10:20',
    images: []
  },
  {
    id: 'review_013',
    venueId: 'venue_001',
    userName: '王大力',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20muscle%20male&image_size=square',
    rating: 5,
    content: '公司团建租了整个场馆，玩得非常开心！场地够大，我们20多个人同时打也不拥挤。管理员服务态度很好，还帮我们准备了饮用水。下次团建还来这里！',
    createTime: '2026-04-20 22:00',
    images: []
  },
  {
    id: 'review_014',
    venueId: 'venue_001',
    userName: '陈小雨',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20high%20school%20male&image_size=square',
    rating: 5,
    content: '高中生一枚，周末经常和同学一起来打球。价格对学生来说稍微有点贵，但场地质量确实值这个价。希望能推出学生优惠套餐！',
    createTime: '2026-04-19 17:30',
    images: []
  },
  {
    id: 'review_015',
    venueId: 'venue_001',
    userName: '刘大爷',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20elderly%20male&image_size=square',
    rating: 4,
    content: '退休后喜欢来这里活动活动筋骨。早上人不多，场地很安静。就是早上开门时间能不能再早点？7点开门的话就更方便了。',
    createTime: '2026-04-18 09:15',
    images: []
  },
  {
    id: 'review_016',
    venueId: 'venue_001',
    userName: '周教练',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20professional%20coach%20male&image_size=square',
    rating: 5,
    content: '作为一名篮球教练，我经常带学员来这里训练。场地非常专业，地板防滑效果好，灯光柔和不刺眼。学员们都很喜欢这里，训练效果也很好。',
    createTime: '2026-04-17 14:00',
    images: []
  },
  {
    id: 'review_017',
    venueId: 'venue_001',
    userName: '吴小姐',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20office%20lady%20female&image_size=square',
    rating: 5,
    content: '偶然发现的宝藏场地！本来是陪男朋友来打球的，结果自己也喜欢上了这里。环境很干净，休息区也很舒适。推荐给所有喜欢运动的朋友！',
    createTime: '2026-04-16 20:45',
    images: []
  },
  {
    id: 'review_018',
    venueId: 'venue_001',
    userName: '郑同学',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20college%20student%20male&image_size=square',
    rating: 4,
    content: '大学生，周末经常和室友组队来打球。场地不错，就是周末有时候会被包场。建议在预约系统上显示包场信息，这样我们可以避开高峰时段。',
    createTime: '2026-04-15 16:30',
    images: []
  },
  {
    id: 'review_019',
    venueId: 'venue_001',
    userName: '孙先生',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20business%20man%20male&image_size=square',
    rating: 5,
    content: '出差住在附近，晚上过来打了会儿球。场地非常专业，和我家乡的专业场馆有的一比。如果下次还来这边出差，一定还会来！',
    createTime: '2026-04-14 21:15',
    images: []
  },
  {
    id: 'review_020',
    venueId: 'venue_001',
    userName: '马大姐',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20middle%20age%20female&image_size=square',
    rating: 4,
    content: '带儿子来打球，儿子很喜欢。场地很安全，没有什么尖锐的边角。更衣室有热水淋浴，打完球可以洗个澡再回家，很方便。',
    createTime: '2026-04-13 18:30',
    images: []
  },
  {
    id: 'review_021',
    venueId: 'venue_001',
    userName: '林小哥',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20hip%20hop%20male&image_size=square',
    rating: 5,
    content: '潮男必来！场地装修风格很现代，拍照特别好看。打完球还能在休息区打会儿游戏，简直是周末放松的好去处！',
    createTime: '2026-04-12 22:00',
    images: []
  },
  {
    id: 'review_022',
    venueId: 'venue_001',
    userName: '何医生',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20doctor%20male&image_size=square',
    rating: 5,
    content: '作为一名骨科医生，我很关注运动场地的安全性。这个场馆的地板缓冲效果很好，能有效减少关节损伤。推荐给所有注重健康的运动爱好者！',
    createTime: '2026-04-11 19:45',
    images: []
  },
  {
    id: 'review_004',
    venueId: 'venue_002',
    userName: '赵六',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20professional%20male&image_size=square',
    rating: 5,
    content: '高端场地，国际标准，灯光音响都很专业，适合举办赛事活动。',
    createTime: '2026-04-19 10:30',
    images: []
  },
  {
    id: 'review_005',
    venueId: 'venue_002',
    userName: '孙七',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20sports%20female&image_size=square',
    rating: 4,
    content: '场地确实很专业，但价格稍微有点贵，偶尔来一次还可以。',
    createTime: '2026-04-16 14:00',
    images: []
  },
  {
    id: 'review_006',
    venueId: 'venue_003',
    userName: '周八',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20middle%20aged%20male&image_size=square',
    rating: 5,
    content: '羽毛球场地非常专业，PVC地板脚感很好，教练也很耐心。',
    createTime: '2026-04-17 20:00',
    images: []
  },
  {
    id: 'review_007',
    venueId: 'venue_003',
    userName: '吴九',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20elder%20female&image_size=square',
    rating: 4,
    content: '环境不错，就是周末场地比较紧张，需要提前几天预约。',
    createTime: '2026-04-14 16:30',
    images: []
  },
  {
    id: 'review_008',
    venueId: 'venue_009',
    userName: '郑十',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20swimmer%20male&image_size=square',
    rating: 5,
    content: '泳池水质很清澈，水温也很舒适，标准50米泳道，游泳体验很好。',
    createTime: '2026-04-18 09:00',
    images: []
  },
  {
    id: 'review_009',
    venueId: 'venue_009',
    userName: '钱十一',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20fitness%20female&image_size=square',
    rating: 4,
    content: '泳池不错，但更衣室有点小，高峰期需要排队。总体还是满意的。',
    createTime: '2026-04-13 18:00',
    images: []
  },
  {
    id: 'review_010',
    venueId: 'venue_011',
    userName: '冯十二',
    userAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%20gym%20trainer%20male&image_size=square',
    rating: 5,
    content: '健身房器械很全，环境干净整洁，私教也很专业，强烈推荐！',
    createTime: '2026-04-21 20:30',
    images: []
  }
]

export default reviews
