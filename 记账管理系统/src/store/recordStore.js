import { reactive } from 'vue'
import { initialRecords, incomeTypes, expenseTypes } from '../data/staticData.js'

const state = reactive({
  records: [...initialRecords],
  incomeTypes: incomeTypes,
  expenseTypes: expenseTypes,
  currentPage: 1,
  pageSize: 10,
  filterStartDate: '',
  filterEndDate: '',
  filterType: 'all'
})

const getFilteredRecords = () => {
  let filtered = [...state.records]
  
  if (state.filterType !== 'all') {
    filtered = filtered.filter(record => record.type === state.filterType)
  }
  
  if (state.filterStartDate) {
    const startDate = new Date(state.filterStartDate)
    startDate.setHours(0, 0, 0, 0)
    filtered = filtered.filter(record => {
      const recordDate = new Date(record.createTime)
      return recordDate >= startDate
    })
  }
  
  if (state.filterEndDate) {
    const endDate = new Date(state.filterEndDate)
    endDate.setHours(23, 59, 59, 999)
    filtered = filtered.filter(record => {
      const recordDate = new Date(record.createTime)
      return recordDate <= endDate
    })
  }
  
  return filtered
}

const getters = {
  getFilteredRecords() {
    return getFilteredRecords()
  },
  getPaginatedRecords() {
    const filtered = getFilteredRecords()
    const start = (state.currentPage - 1) * state.pageSize
    const end = start + state.pageSize
    return filtered.slice(start, end)
  },
  getTotalPages() {
    const filtered = getFilteredRecords()
    return Math.ceil(filtered.length / state.pageSize)
  },
  getTotalRecords() {
    const filtered = getFilteredRecords()
    return filtered.length
  },
  getCurrentPage() {
    return state.currentPage
  },
  getPageSize() {
    return state.pageSize
  },
  getFilterStartDate() {
    return state.filterStartDate
  },
  getFilterEndDate() {
    return state.filterEndDate
  },
  getFilterType() {
    return state.filterType
  },
  getIncomeTypes() {
    return state.incomeTypes
  },
  getExpenseTypes() {
    return state.expenseTypes
  },
  getAllTypes() {
    return {
      income: state.incomeTypes,
      expense: state.expenseTypes
    }
  }
}

const actions = {
  addRecord(record) {
    const newRecord = {
      id: state.records.length > 0 ? Math.max(...state.records.map(r => r.id)) + 1 : 1,
      ...record,
      createTime: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(/\//g, '-')
    }
    state.records.unshift(newRecord)
    state.currentPage = 1
    return true
  },
  deleteRecord(id) {
    const index = state.records.findIndex(r => r.id === id)
    if (index !== -1) {
      state.records.splice(index, 1)
      return true
    }
    return false
  },
  setCurrentPage(page) {
    if (page >= 1 && page <= getters.getTotalPages()) {
      state.currentPage = page
      return true
    }
    return false
  },
  setPageSize(size) {
    if (size > 0) {
      state.pageSize = size
      state.currentPage = 1
      return true
    }
    return false
  },
  goToNextPage() {
    if (state.currentPage < getters.getTotalPages()) {
      state.currentPage++
      return true
    }
    return false
  },
  goToPrevPage() {
    if (state.currentPage > 1) {
      state.currentPage--
      return true
    }
    return false
  },
  setFilterStartDate(date) {
    state.filterStartDate = date
    state.currentPage = 1
    return true
  },
  setFilterEndDate(date) {
    state.filterEndDate = date
    state.currentPage = 1
    return true
  },
  clearDateFilter() {
    state.filterStartDate = ''
    state.filterEndDate = ''
    state.currentPage = 1
    return true
  },
  setFilterType(type) {
    if (['all', 'income', 'expense'].includes(type)) {
      state.filterType = type
      state.currentPage = 1
      return true
    }
    return false
  },
  clearTypeFilter() {
    state.filterType = 'all'
    state.currentPage = 1
    return true
  }
}

export default {
  state,
  ...getters,
  ...actions
}
