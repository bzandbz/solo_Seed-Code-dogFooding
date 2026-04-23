const venues = [
  {
    id: 'venue_001',
    name: '阳光篮球馆',
    type: '篮球馆',
    typeKey: 'basketball',
    price: 80,
    distance: '1.2km',
    address: '北京市朝阳区建国路88号',
    description: '专业室内篮球场，配备木地板和空调，环境舒适，适合团队训练和比赛使用。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=indoor%20basketball%20court%20with%20wooden%20floor%20and%20hoops&image_size=square'
  },
  {
    id: 'venue_002',
    name: '星空篮球馆',
    type: '篮球馆',
    typeKey: 'basketball',
    price: 100,
    distance: '2.5km',
    address: '北京市海淀区中关村大街100号',
    description: '高端篮球馆，拥有国际标准场地，配备专业灯光和音响设备，定期举办赛事活动。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20indoor%20basketball%20court%20with%20bright%20lighting&image_size=square'
  },
  {
    id: 'venue_003',
    name: '飞羽羽毛球馆',
    type: '羽毛球馆',
    typeKey: 'badminton',
    price: 60,
    distance: '0.8km',
    address: '北京市西城区德胜门外大街50号',
    description: '8片专业羽毛球场地，地面采用PVC运动地板，配备专业教练团队。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=indoor%20badminton%20courts%20with%20nets%20and%20lighting&image_size=square'
  },
  {
    id: 'venue_004',
    name: '巅峰羽毛球馆',
    type: '羽毛球馆',
    typeKey: 'badminton',
    price: 75,
    distance: '1.8km',
    address: '北京市东城区体育馆路20号',
    description: '12片标准羽毛球场地，空气流通好，设施完善，提供球拍租赁服务。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20indoor%20badminton%20arena%20multiple%20courts&image_size=square'
  },
  {
    id: 'venue_005',
    name: '精英乒乓球馆',
    type: '乒乓球馆',
    typeKey: 'tabletennis',
    price: 40,
    distance: '1.5km',
    address: '北京市丰台区丰台路66号',
    description: '20张乒乓球台，专业训练场地，适合各水平爱好者，提供陪练服务。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=table%20tennis%20tables%20in%20indoor%20facility&image_size=square'
  },
  {
    id: 'venue_006',
    name: '国球乒乓球馆',
    type: '乒乓球馆',
    typeKey: 'tabletennis',
    price: 50,
    distance: '2.1km',
    address: '北京市石景山古城大街8号',
    description: '国家级标准乒乓球训练基地，配备国际比赛级球台，提供专业教练培训课程。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20table%20tennis%20training%20center&image_size=square'
  },
  {
    id: 'venue_007',
    name: '金典网球场',
    type: '网球场',
    typeKey: 'tennis',
    price: 120,
    distance: '3.0km',
    address: '北京市朝阳区奥运村路15号',
    description: '4片室外网球场和2片室内网球场，硬地场地，配备专业照明系统。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=outdoor%20tennis%20courts%20with%20nets&image_size=square'
  },
  {
    id: 'venue_008',
    name: '阳光网球场',
    type: '网球场',
    typeKey: 'tennis',
    price: 150,
    distance: '4.2km',
    address: '北京市顺义区天竺镇府前一街',
    description: '高端室内网球场馆，红土场地，提供私人教练服务，环境优美。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=indoor%20tennis%20court%20clay%20surface&image_size=square'
  },
  {
    id: 'venue_009',
    name: '碧波游泳馆',
    type: '游泳馆',
    typeKey: 'swimming',
    price: 50,
    distance: '1.0km',
    address: '北京市海淀区中关村南大街',
    description: '50米标准泳池，8条泳道，水质清澈，水温恒定28度。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=indoor%20swimming%20pool%20olympic%20size&image_size=square'
  },
  {
    id: 'venue_010',
    name: '水立方游泳馆',
    type: '游泳馆',
    typeKey: 'swimming',
    price: 80,
    distance: '2.8km',
    address: '北京市朝阳区北辰东路8号',
    description: '奥运级游泳馆，25米短池和50米长池，提供儿童戏水区。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20indoor%20olympic%20swimming%20pool&image_size=square'
  },
  {
    id: 'venue_011',
    name: '力健健身房',
    type: '健身房',
    typeKey: 'gym',
    price: 100,
    distance: '0.6km',
    address: '北京市朝阳区光华路9号',
    description: '专业健身器材齐全，配备专业私人教练，有氧区、力量区、瑜伽室。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20gym%20fitness%20equipment&image_size=square'
  },
  {
    id: 'venue_012',
    name: '星锐健身房',
    type: '健身房',
    typeKey: 'gym',
    price: 120,
    distance: '1.9km',
    address: '北京市海淀区五道口路16号',
    description: '24小时营业，高端健身器械，游泳池、桑拿房、动感单车教室。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20gym%20interior%20design&image_size=square'
  }
]

export default venues
