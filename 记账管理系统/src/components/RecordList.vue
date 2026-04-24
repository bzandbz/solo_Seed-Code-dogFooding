<template>
  <div class="card">
    <div class="list-header">
      <h3 class="section-title">全部账单记录</h3>
      
      <div class="filter-section">
        <div class="filter-item">
          <label class="filter-label">账单类型</label>
          <div class="type-filter-buttons">
            <button 
              class="type-btn" 
              :class="{ active: tempFilterType === 'all' }"
              @click="tempFilterType = 'all'"
            >
              全部
            </button>
            <button 
              class="type-btn" 
              :class="{ active: tempFilterType === 'income' }"
              @click="tempFilterType = 'income'"
            >
              收入
            </button>
            <button 
              class="type-btn" 
              :class="{ active: tempFilterType === 'expense' }"
              @click="tempFilterType = 'expense'"
            >
              支出
            </button>
          </div>
        </div>
        <div class="filter-item">
          <label class="filter-label">开始日期</label>
          <input 
            type="date" 
            v-model="tempFilterStartDate" 
            class="form-input filter-input"
          />
        </div>
        <div class="filter-item">
          <label class="filter-label">结束日期</label>
          <input 
            type="date" 
            v-model="tempFilterEndDate" 
            class="form-input filter-input"
          />
        </div>
        <button 
          class="btn btn-primary filter-btn" 
          @click="handleSearch"
        >
          搜索
        </button>
        <button 
          class="btn btn-secondary" 
          @click="handleClearFilter"
          :disabled="!hasActiveFilter"
        >
          清除筛选
        </button>
      </div>
    </div>
    
    <div v-if="records.length === 0" class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
      </svg>
      <p>{{ hasActiveFilter ? '该时间段内暂无账单记录' : '暂无账单记录' }}</p>
    </div>

    <div v-else>
      <div class="record-table-container">
        <table class="table">
          <thead>
            <tr>
              <th 
                class="col-header col-index"
                :style="getColumnStyle('index')"
              >
                <div class="header-content">
                  <span>序号</span>
                  <div 
                    class="resize-handle"
                    @mousedown="startResize('index', $event)"
                  ></div>
                </div>
              </th>
              <th 
                class="col-header col-type"
                :style="getColumnStyle('type')"
              >
                <div class="header-content">
                  <span>类型</span>
                  <div 
                    class="resize-handle"
                    @mousedown="startResize('type', $event)"
                  ></div>
                </div>
              </th>
              <th 
                class="col-header col-category"
                :style="getColumnStyle('category')"
              >
                <div class="header-content">
                  <span>分类</span>
                  <div 
                    class="resize-handle"
                    @mousedown="startResize('category', $event)"
                  ></div>
                </div>
              </th>
              <th 
                class="col-header col-amount"
                :style="getColumnStyle('amount')"
              >
                <div class="header-content">
                  <span>金额</span>
                  <div 
                    class="resize-handle"
                    @mousedown="startResize('amount', $event)"
                  ></div>
                </div>
              </th>
              <th 
                class="col-header col-remark"
              >
                <div class="header-content">
                  <span>备注</span>
                  <div 
                    class="resize-handle"
                    @mousedown="startResize('remark', $event)"
                  ></div>
                </div>
              </th>
              <th 
                class="col-header col-time"
                :style="getColumnStyle('time')"
              >
                <div class="header-content">
                  <span>时间</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in records" :key="record.id">
              <td 
                class="index-cell"
                :style="getColumnStyle('index')"
              >
                {{ getRowIndex(index) }}
              </td>
              <td 
                :style="getColumnStyle('type')"
              >
                <span 
                  class="tag"
                  :class="record.type === 'income' ? 'tag-income' : 'tag-expense'"
                >
                  {{ record.type === 'income' ? '收入' : '支出' }}
                </span>
              </td>
              <td 
                class="category-cell"
                :style="getColumnStyle('category')"
              >
                <span class="category-text">
                  <span class="category-icon">{{ getCategoryIcon(record) }}</span>
                  {{ record.category }}
                </span>
              </td>
              <td 
                :style="getColumnStyle('amount')"
              >
                <span :class="record.type === 'income' ? 'text-income' : 'text-expense'">
                  {{ record.type === 'income' ? '+' : '-' }}¥{{ record.amount.toFixed(2) }}
                </span>
              </td>
              <td 
                class="remark-cell"
                :title="record.remark || ''"
              >
                <span class="remark-text">{{ record.remark || '-' }}</span>
              </td>
              <td 
                class="time-cell"
                :style="getColumnStyle('time')"
              >
                {{ record.createTime }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <button 
          class="pagination-btn" 
          :disabled="!hasPrevPage"
          @click="goToPrevPage"
        >
          上一页
        </button>
        
        <div class="page-numbers">
          <template v-if="totalPages <= 7">
            <button
              v-for="page in totalPages"
              :key="page"
              class="pagination-btn"
              :class="{ active: page === currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </template>
          <template v-else>
            <button
              class="pagination-btn"
              :class="{ active: currentPage === 1 }"
              @click="goToPage(1)"
            >
              1
            </button>
            
            <span v-if="currentPage > 4" class="pagination-ellipsis">...</span>
            
            <template v-for="page in visiblePages" :key="page">
              <button
                class="pagination-btn"
                :class="{ active: page === currentPage }"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </template>
            
            <span v-if="currentPage < totalPages - 3" class="pagination-ellipsis">...</span>
            
            <button
              class="pagination-btn"
              :class="{ active: currentPage === totalPages }"
              @click="goToPage(totalPages)"
            >
              {{ totalPages }}
            </button>
          </template>
        </div>

        <button 
          class="pagination-btn" 
          :disabled="!hasNextPage"
          @click="goToNextPage"
        >
          下一页
        </button>
        
        <span class="pagination-info">
          共 {{ totalRecords }} 条，第 {{ currentPage }} / {{ totalPages }} 页
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue'
import recordStore from '../store/recordStore.js'

const props = defineProps({
  refreshKey: {
    type: Number,
    default: 0
  }
})

const tempFilterStartDate = ref('')
const tempFilterEndDate = ref('')
const tempFilterType = ref('all')

const columnWidths = reactive({
  index: 70,
  type: 90,
  category: 140,
  amount: 180,
  remark: 250,
  time: 180
})

const minColumnWidths = {
  index: 50,
  type: 70,
  category: 100,
  amount: 120,
  remark: 120,
  time: 140
}

const resizingColumn = ref(null)
const startX = ref(0)
const startWidth = ref(0)

const startResize = (column, event) => {
  resizingColumn.value = column
  startX.value = event.clientX
  startWidth.value = columnWidths[column]
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const handleMouseMove = (event) => {
  if (resizingColumn.value) {
    const diff = event.clientX - startX.value
    let newWidth = startWidth.value + diff
    const minWidth = minColumnWidths[resizingColumn.value]
    if (newWidth < minWidth) newWidth = minWidth
    columnWidths[resizingColumn.value] = newWidth
  }
}

const handleMouseUp = () => {
  if (resizingColumn.value) {
    resizingColumn.value = null
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})

const getColumnStyle = (column) => {
  if (column === 'remark') {
    return {
      minWidth: `${columnWidths[column]}px`
    }
  }
  return {
    width: `${columnWidths[column]}px`,
    minWidth: `${columnWidths[column]}px`,
    maxWidth: `${columnWidths[column]}px`
  }
}

const records = computed(() => {
  props.refreshKey
  return recordStore.getPaginatedRecords()
})

const currentPage = computed(() => recordStore.getCurrentPage())
const totalPages = computed(() => recordStore.getTotalPages())
const totalRecords = computed(() => recordStore.getTotalRecords())
const hasPrevPage = computed(() => currentPage.value > 1)
const hasNextPage = computed(() => currentPage.value < totalPages.value)
const hasActiveFilter = computed(() => 
  recordStore.getFilterStartDate() || 
  recordStore.getFilterEndDate() || 
  recordStore.getFilterType() !== 'all'
)

const visiblePages = computed(() => {
  const pages = []
  let start = Math.max(2, currentPage.value - 2)
  let end = Math.min(totalPages.value - 1, currentPage.value + 2)
  
  if (currentPage.value <= 4) {
    end = Math.min(totalPages.value - 1, 5)
  }
  if (currentPage.value >= totalPages.value - 3) {
    start = Math.max(2, totalPages.value - 4)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const getRowIndex = (index) => {
  return (currentPage.value - 1) * recordStore.getPageSize() + index + 1
}

const handleSearch = () => {
  recordStore.setFilterType(tempFilterType.value)
  recordStore.setFilterStartDate(tempFilterStartDate.value)
  recordStore.setFilterEndDate(tempFilterEndDate.value)
}

const handleClearFilter = () => {
  tempFilterType.value = 'all'
  tempFilterStartDate.value = ''
  tempFilterEndDate.value = ''
  recordStore.clearTypeFilter()
  recordStore.clearDateFilter()
}

const goToPage = (page) => {
  recordStore.setCurrentPage(page)
}

const goToPrevPage = () => {
  recordStore.goToPrevPage()
}

const goToNextPage = () => {
  recordStore.goToNextPage()
}

const getCategoryIcon = (record) => {
  const types = record.type === 'income' 
    ? recordStore.getIncomeTypes() 
    : recordStore.getExpenseTypes()
  const type = types.find(t => t.name === record.category)
  return type ? type.icon : ''
}
</script>

<style scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-title {
  margin: 0;
}

.filter-section {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 13px;
  color: #606266;
  font-weight: 500;
}

.filter-input {
  width: 150px;
  padding: 8px 12px;
  font-size: 14px;
}

.filter-btn {
  padding: 8px 20px;
  font-size: 14px;
}

.type-filter-buttons {
  display: flex;
  gap: 4px;
}

.type-btn {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: white;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-btn:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.type-btn.active {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}

.type-btn.active:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.btn-secondary {
  background-color: #f5f7fa;
  color: #606266;
  border: 1px solid #dcdfe6;
  padding: 8px 16px;
  font-size: 14px;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #ecf5ff;
  color: #409eff;
  border-color: #c6e2ff;
}

.btn-secondary:disabled {
  background-color: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
}

.record-table-container {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

.table th,
.table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.table th {
  font-weight: 600;
  color: #606266;
  background-color: #fafafa;
  padding: 0;
  position: relative;
  white-space: nowrap;
}

.table td {
  white-space: nowrap;
}

.col-header {
  position: relative;
}

.col-index {
  width: 70px;
}

.col-type {
  width: 90px;
}

.col-category {
  width: 140px;
}

.col-amount {
  width: 180px;
}

.col-remark {
  width: auto;
  min-width: 250px;
}

.col-time {
  width: 180px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  height: 100%;
}

.resize-handle {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  cursor: col-resize;
  background: transparent;
  transition: background-color 0.2s;
  z-index: 1;
}

.resize-handle:hover {
  background-color: #409eff;
}

.index-cell {
  text-align: center;
  color: #909399;
  font-weight: 500;
}

.time-cell {
  font-size: 14px;
  color: #606266;
}

.category-cell {
}

.category-text {
  display: flex;
  align-items: center;
  gap: 5px;
}

.category-icon {
  font-size: 16px;
}

.remark-cell {
  position: relative;
  max-width: 0;
  cursor: help;
}

.remark-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #909399;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.pagination-btn {
  padding: 6px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: white;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  color: #409eff;
  border-color: #409eff;
}

.pagination-btn:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.pagination-btn.active {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}

.page-numbers {
  display: flex;
  gap: 5px;
  align-items: center;
}

.pagination-ellipsis {
  padding: 6px 8px;
  color: #909399;
  user-select: none;
}

.pagination-info {
  color: #606266;
  font-size: 14px;
}

@media (max-width: 900px) {
  .list-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-section {
    width: 100%;
  }
  
  .filter-input {
    width: 100%;
  }
  
  .filter-item {
    flex: 1;
    min-width: 120px;
  }
}

@media (max-width: 600px) {
  .table {
    font-size: 13px;
  }
  
  .table th,
  .table td {
    padding: 8px 10px;
  }
  
  .pagination-info {
    display: none;
  }
  
  .page-numbers {
    display: none;
  }
  
  .filter-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-item {
    width: 100%;
  }
  
  .btn-secondary,
  .filter-btn {
    width: 100%;
  }
  
  .resize-handle {
    display: none;
  }
  
  .col-remark {
    min-width: 120px;
  }
}
</style>
