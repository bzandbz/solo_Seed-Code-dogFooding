export const incomeTypes = [
  { id: 1, name: '工资', icon: '💰' },
  { id: 2, name: '奖金', icon: '🎁' },
  { id: 3, name: '理财收益', icon: '📈' },
  { id: 4, name: '兼职收入', icon: '💼' },
  { id: 5, name: '其他收入', icon: '💵' }
]

export const expenseTypes = [
  { id: 1, name: '餐饮', icon: '🍔' },
  { id: 2, name: '交通', icon: '🚗' },
  { id: 3, name: '购物', icon: '🛒' },
  { id: 4, name: '娱乐', icon: '🎮' },
  { id: 5, name: '医疗', icon: '🏥' },
  { id: 6, name: '教育', icon: '📚' },
  { id: 7, name: '住房', icon: '🏠' },
  { id: 8, name: '其他支出', icon: '💸' }
]

export const initialRecords = [
  {
    id: 1,
    type: 'expense',
    category: '餐饮',
    amount: 35.50,
    remark: '午餐 - 麦当劳',
    createTime: '2026-04-24 12:30:00'
  },
  {
    id: 2,
    type: 'income',
    category: '工资',
    amount: 15000.00,
    remark: '4月份工资',
    createTime: '2026-04-20 09:00:00'
  },
  {
    id: 3,
    type: 'expense',
    category: '交通',
    amount: 50.00,
    remark: '打车去机场',
    createTime: '2026-04-19 18:00:00'
  },
  {
    id: 4,
    type: 'expense',
    category: '购物',
    amount: 299.00,
    remark: '购买新衣服',
    createTime: '2026-04-18 15:30:00'
  },
  {
    id: 5,
    type: 'income',
    category: '理财收益',
    amount: 520.00,
    remark: '基金收益',
    createTime: '2026-04-17 10:00:00'
  },
  {
    id: 6,
    type: 'expense',
    category: '娱乐',
    amount: 89.00,
    remark: '电影票 + 爆米花',
    createTime: '2026-04-16 20:00:00'
  },
  {
    id: 7,
    type: 'expense',
    category: '餐饮',
    amount: 156.00,
    remark: '朋友聚餐',
    createTime: '2026-04-15 19:00:00'
  },
  {
    id: 8,
    type: 'income',
    category: '奖金',
    amount: 3000.00,
    remark: '季度奖金',
    createTime: '2026-04-14 10:30:00'
  },
  {
    id: 9,
    type: 'expense',
    category: '医疗',
    amount: 120.00,
    remark: '感冒药',
    createTime: '2026-04-13 14:00:00'
  },
  {
    id: 10,
    type: 'expense',
    category: '交通',
    amount: 12.00,
    remark: '地铁 + 公交',
    createTime: '2026-04-12 08:30:00'
  },
  {
    id: 11,
    type: 'expense',
    category: '购物',
    amount: 899.00,
    remark: '购买电子产品',
    createTime: '2026-04-11 16:00:00'
  },
  {
    id: 12,
    type: 'income',
    category: '兼职收入',
    amount: 2000.00,
    remark: '兼职项目收入',
    createTime: '2026-04-10 11:00:00'
  }
]
