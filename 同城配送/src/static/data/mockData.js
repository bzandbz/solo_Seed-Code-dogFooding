export const categories = [
  {
    id: 1,
    name: '超市百货',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=supermarket%20shopping%20cart%20icon%20simple%20flat%20design%20colorful&image_size=square',
    children: [
      { id: 101, name: '零食饮料' },
      { id: 102, name: '日用百货' },
      { id: 103, name: '粮油调味' },
      { id: 104, name: '酒水冲调' }
    ]
  },
  {
    id: 2,
    name: '水果生鲜',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20fruits%20apple%20orange%20banana%20simple%20flat%20icon&image_size=square',
    children: [
      { id: 201, name: '新鲜水果' },
      { id: 202, name: '时令蔬菜' },
      { id: 203, name: '肉类海鲜' },
      { id: 204, name: '蛋类奶类' }
    ]
  },
  {
    id: 3,
    name: '鲜花绿植',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20flowers%20bouquet%20simple%20flat%20icon%20colorful&image_size=square',
    children: [
      { id: 301, name: '鲜花速递' },
      { id: 302, name: '盆栽绿植' },
      { id: 303, name: '花卉种子' }
    ]
  },
  {
    id: 4,
    name: '蛋糕甜点',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=birthday%20cake%20with%20candles%20simple%20flat%20icon&image_size=square',
    children: [
      { id: 401, name: '生日蛋糕' },
      { id: 402, name: '甜品点心' },
      { id: 403, name: '面包烘焙' }
    ]
  },
  {
    id: 5,
    name: '医药健康',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=medicine%20pill%20capsule%20healthcare%20simple%20flat%20icon&image_size=square',
    children: [
      { id: 501, name: '感冒发烧' },
      { id: 502, name: '肠胃用药' },
      { id: 503, name: '维生素保健' },
      { id: 504, name: '医疗器械' }
    ]
  },
  {
    id: 6,
    name: '美妆个护',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cosmetics%20lipstick%20makeup%20simple%20flat%20icon&image_size=square',
    children: [
      { id: 601, name: '面部护肤' },
      { id: 602, name: '彩妆香水' },
      { id: 603, name: '个护清洁' }
    ]
  },
  {
    id: 7,
    name: '母婴用品',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=baby%20diaper%20milk%20bottle%20simple%20flat%20icon&image_size=square',
    children: [
      { id: 701, name: '奶粉辅食' },
      { id: 702, name: '尿裤湿巾' },
      { id: 703, name: '玩具童装' }
    ]
  },
  {
    id: 8,
    name: '宠物生活',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20dog%20cat%20pet%20simple%20flat%20icon&image_size=square',
    children: [
      { id: 801, name: '宠物主粮' },
      { id: 802, name: '零食玩具' },
      { id: 803, name: '日用清洁' }
    ]
  }
]

export const hotProducts = [
  {
    id: 1,
    name: '新鲜红富士苹果 500g',
    price: 9.9,
    originalPrice: 15.9,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20red%20fuji%20apples%20in%20basket%20realistic%20product%20photo&image_size=square',
    sales: 2345,
    discount: '限时特惠'
  },
  {
    id: 2,
    name: '蒙牛纯牛奶 250ml*12盒',
    price: 35.9,
    originalPrice: 45.9,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mengniu%20pure%20milk%20boxes%20product%20photo%20white%20packaging&image_size=square',
    sales: 1876,
    discount: '新人专享'
  },
  {
    id: 3,
    name: '乐事薯片 原味 104g',
    price: 8.9,
    originalPrice: 12.9,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lays%20potato%20chips%20original%20flavor%20bag&image_size=square',
    sales: 3210,
    discount: '爆款热销'
  },
  {
    id: 4,
    name: '进口车厘子 J级 500g',
    price: 59.9,
    originalPrice: 89.9,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20red%20cherries%20in%20bowl%20product%20photo&image_size=square',
    sales: 987,
    discount: '限时特惠'
  },
  {
    id: 5,
    name: '康师傅红烧牛肉面 5包',
    price: 12.5,
    originalPrice: 18.5,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kangshifu%20instant%20noodles%20beef%20flavor%20packs&image_size=square',
    sales: 4532,
    discount: '爆款热销'
  },
  {
    id: 6,
    name: '东北大米 5kg 粳米',
    price: 39.9,
    originalPrice: 59.9,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=northeast%20china%20rice%20bag%20packaging%20product&image_size=square',
    sales: 2156,
    discount: '新人专享'
  },
  {
    id: 7,
    name: '可口可乐 330ml*6罐',
    price: 14.9,
    originalPrice: 19.9,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coca%20cola%20cans%206%20pack%20product%20photo&image_size=square',
    sales: 5678,
    discount: '爆款热销'
  },
  {
    id: 8,
    name: '新鲜草莓 300g',
    price: 25.9,
    originalPrice: 35.9,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20strawberries%20in%20white%20bowl%20product%20photo&image_size=square',
    sales: 1234,
    discount: '限时特惠'
  }
]

export const categoryProducts = {
  1: [
    { id: 1001, name: '奥利奥夹心饼干 97g', price: 9.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=oreo%20biscuit%20pack%20product%20photo', sales: 1234 },
    { id: 1002, name: '德芙巧克力 43g', price: 12.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dove%20chocolate%20bar%20product%20photo', sales: 876 },
    { id: 1003, name: '康师傅冰红茶 1L', price: 4.5, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kangshifu%20ice%20tea%20bottle%20product', sales: 2345 },
    { id: 1004, name: '金龙鱼调和油 1.8L', price: 35.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cooking%20oil%20bottle%20product%20photo', sales: 567 }
  ],
  2: [
    { id: 2001, name: '新鲜香蕉 500g', price: 5.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20yellow%20bananas%20product%20photo', sales: 3456 },
    { id: 2002, name: '有机西兰花 300g', price: 8.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=organic%20broccoli%20fresh%20product', sales: 1234 },
    { id: 2003, name: '猪五花肉 500g', price: 29.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20pork%20belly%20meat%20product', sales: 876 },
    { id: 2004, name: '土鸡蛋 10枚', price: 15.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=farm%20fresh%20eggs%20in%20carton%20product', sales: 2345 }
  ],
  3: [
    { id: 3001, name: '红玫瑰花束 11朵', price: 99.0, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=red%20roses%20bouquet%2011%20flowers', sales: 567 },
    { id: 3002, name: '多肉盆栽 多肉植物', price: 29.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=succulent%20plant%20in%20pot%20product', sales: 1234 },
    { id: 3003, name: '向日葵花束', price: 49.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sunflower%20bouquet%20bright%20product', sales: 876 }
  ],
  4: [
    { id: 4001, name: '生日蛋糕 8寸', price: 168.0, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=birthday%20cake%208%20inch%20cream%20fruit', sales: 234 },
    { id: 4002, name: '提拉米苏', price: 35.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tiramisu%20cake%20slice%20product', sales: 567 },
    { id: 4003, name: '牛角面包', price: 8.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20croissant%20bread%20product', sales: 1234 }
  ],
  5: [
    { id: 5001, name: '999感冒灵颗粒', price: 15.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20medicine%20cold%20granules%20box', sales: 876 },
    { id: 5002, name: '健胃消食片', price: 12.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=digestive%20tablets%20medicine%20box', sales: 567 },
    { id: 5003, name: '维生素C片', price: 29.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vitamin%20c%20tablets%20bottle%20product', sales: 1234 }
  ],
  6: [
    { id: 6001, name: '欧莱雅洗面奶', price: 59.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=face%20cleanser%20tube%20product', sales: 1567 },
    { id: 6002, name: '口红 保湿面膜 5片装', price: 39.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=facial%20mask%20pack%205%20sheet', sales: 2345 },
    { id: 6003, name: '洗发水 沐浴露', price: 45.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shampoo%20bottle%20product', sales: 1876 }
  ],
  7: [
    { id: 7001, name: '婴儿配方奶粉 3段', price: 198.0, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=baby%20milk%20formula%20can%20product', sales: 345 },
    { id: 7002, name: '婴儿纸尿裤 L码', price: 89.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=baby%20diaper%20package%20product', sales: 1234 },
    { id: 7003, name: '儿童玩具 积木', price: 59.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=building%20blocks%20toy%20colorful', sales: 876 }
  ],
  8: [
    { id: 8001, name: '狗粮 2.5kg', price: 79.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dog%20food%20bag%20product', sales: 567 },
    { id: 8002, name: '猫砂 10kg', price: 49.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cat%20litter%20bag%20product', sales: 876 },
    { id: 8003, name: '宠物零食 牛肉粒', price: 25.9, image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pet%20treats%20beef%20snacks', sales: 1234 }
  ]
}

export const userInfo = {
  id: 1,
  nickname: '配送小达人',
  avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20avatar%20young%20person%20friendly%20face&image_size=square',
  phone: '138****8888',
  level: 'VIP3',
  points: 1280,
  balance: 88.5
}

export const menuList = [
  { id: 1, name: '我的订单', icon: '📋', path: '' },
  { id: 2, name: '收货地址', icon: '📍', path: '' },
  { id: 3, name: '我的优惠券', icon: '🎫', path: '' },
  { id: 4, name: '积分商城', icon: '🎁', path: '' },
  { id: 5, name: '帮助中心', icon: '❓', path: '' },
  { id: 6, name: '联系客服', icon: '💬', path: '' },
  { id: 7, name: '关于我们', icon: 'ℹ️', path: '' },
  { id: 8, name: '设置', icon: '⚙️', path: '' }
]
