<template>
  <div class="statistics-section">
    <div class="statistics-card">
      <div class="stat-item total">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <div class="stat-label">总记录数</div>
          <div class="stat-value">{{ totalRecords }}</div>
        </div>
      </div>
      
      <div class="stat-item income">
        <div class="stat-icon">💵</div>
        <div class="stat-info">
          <div class="stat-label">总收入</div>
          <div class="stat-value">¥{{ totalIncome.toFixed(2) }}</div>
        </div>
      </div>
      
      <div class="stat-item expense">
        <div class="stat-icon">💸</div>
        <div class="stat-info">
          <div class="stat-label">总支出</div>
          <div class="stat-value">¥{{ totalExpense.toFixed(2) }}</div>
        </div>
      </div>
      
      <div class="stat-item balance">
        <div class="stat-icon">💰</div>
        <div class="stat-info">
          <div class="stat-label">结余</div>
          <div class="stat-value" :class="balance >= 0 ? 'positive' : 'negative'">
            {{ balance >= 0 ? '+' : '' }}¥{{ balance.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>

    <div class="monthly-summary-card">
      <h3 class="section-title">月度收支趋势（最近12个月）</h3>
      <div class="monthly-chart-container">
        <canvas ref="chartRef"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import recordStore from '../store/recordStore.js'

Chart.register(...registerables)

const props = defineProps({
  refreshKey: {
    type: Number,
    default: 0
  }
})

const chartRef = ref(null)
let chartInstance = null

const totalRecords = computed(() => {
  props.refreshKey
  return recordStore.getTotalRecords()
})

const totalIncome = computed(() => {
  props.refreshKey
  return recordStore.getFilteredRecords()
    .filter(r => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0)
})

const totalExpense = computed(() => {
  props.refreshKey
  return recordStore.getFilteredRecords()
    .filter(r => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0)
})

const balance = computed(() => totalIncome.value - totalExpense.value)

const getLast12MonthsData = () => {
  const now = new Date()
  const months = []
  const incomeData = []
  const expenseData = []

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthStr = `${date.getMonth() + 1}月`
    months.push(monthStr)

    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    monthEnd.setHours(23, 59, 59, 999)

    let monthIncome = 0
    let monthExpense = 0

    recordStore.state.records.forEach(record => {
      const recordDate = new Date(record.createTime)
      if (recordDate >= monthStart && recordDate <= monthEnd) {
        if (record.type === 'income') {
          monthIncome += record.amount
        } else {
          monthExpense += record.amount
        }
      }
    })

    incomeData.push(monthIncome)
    expenseData.push(monthExpense)
  }

  return { months, incomeData, expenseData }
}

const createChart = () => {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  const { months, incomeData, expenseData } = getLast12MonthsData()

  const ctx = chartRef.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: '收入',
          data: incomeData,
          borderColor: '#67c23a',
          backgroundColor: 'rgba(103, 194, 58, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#67c23a',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: '支出',
          data: expenseData,
          borderColor: '#f56c6c',
          backgroundColor: 'rgba(245, 108, 108, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#f56c6c',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ¥${context.parsed.y.toFixed(2)}`
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '¥' + value
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  })
}

const updateChart = () => {
  if (!chartInstance) return

  const { incomeData, expenseData } = getLast12MonthsData()
  chartInstance.data.datasets[0].data = incomeData
  chartInstance.data.datasets[1].data = expenseData
  chartInstance.update()
}

onMounted(() => {
  createChart()
})

watch(() => props.refreshKey, () => {
  updateChart()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.statistics-section {
  margin-bottom: 24px;
}

.statistics-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-item {
  background: white;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  font-size: 32px;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #909399;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.stat-item.income .stat-value {
  color: #67c23a;
}

.stat-item.expense .stat-value {
  color: #f56c6c;
}

.stat-value.positive {
  color: #67c23a;
}

.stat-value.negative {
  color: #f56c6c;
}

.monthly-summary-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.monthly-chart-container {
  width: 100%;
  height: 300px;
}

@media (max-width: 1200px) {
  .statistics-card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .statistics-card {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .stat-item {
    padding: 16px 18px;
  }
  
  .monthly-summary-card {
    padding: 16px;
  }
  
  .monthly-chart-container {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .statistics-card {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .stat-item {
    padding: 12px 15px;
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .stat-icon {
    font-size: 28px;
  }
  
  .stat-value {
    font-size: 16px;
  }
  
  .monthly-chart-container {
    height: 200px;
  }
}
</style>
