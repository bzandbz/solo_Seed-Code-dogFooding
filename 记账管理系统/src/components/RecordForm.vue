<template>
  <div class="card">
    <h3 class="section-title">新增收支记录</h3>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label">收支类型</label>
        <div class="type-toggle">
          <button
            type="button"
            class="toggle-btn"
            :class="{ active: form.type === 'expense' }"
            @click="form.type = 'expense'"
          >
            支出
          </button>
          <button
            type="button"
            class="toggle-btn"
            :class="{ active: form.type === 'income' }"
            @click="form.type = 'income'"
          >
            收入
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">分类</label>
        <select v-model="form.category" class="form-select" required>
          <option value="">请选择分类</option>
          <option v-for="type in currentTypes" :key="type.id" :value="type.name">
            {{ type.icon }} {{ type.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">金额</label>
        <input
          type="number"
          v-model.number="form.amount"
          class="form-input"
          placeholder="请输入金额"
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label">备注</label>
        <textarea
          v-model="form.remark"
          class="form-textarea"
          placeholder="请输入备注信息（可选）"
          rows="3"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? '提交中...' : '提交记录' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import recordStore from '../store/recordStore.js'

const emit = defineEmits(['success'])

const form = ref({
  type: 'expense',
  category: '',
  amount: null,
  remark: ''
})

const isSubmitting = ref(false)

const currentTypes = computed(() => {
  return form.value.type === 'income' 
    ? recordStore.getIncomeTypes() 
    : recordStore.getExpenseTypes()
})

const handleSubmit = () => {
  if (!form.value.category || !form.value.amount) {
    return
  }

  isSubmitting.value = true

  setTimeout(() => {
    const success = recordStore.addRecord({
      type: form.value.type,
      category: form.value.category,
      amount: form.value.amount,
      remark: form.value.remark
    })

    if (success) {
      form.value = {
        type: 'expense',
        category: '',
        amount: null,
        remark: ''
      }
      emit('success')
    }

    isSubmitting.value = false
  }, 500)
}
</script>

<style scoped>
.type-toggle {
  display: flex;
  gap: 10px;
}

.toggle-btn {
  flex: 1;
  padding: 10px 20px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background: white;
  color: #606266;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.toggle-btn.active {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}

.toggle-btn.active:hover {
  background-color: #66b1ff;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}
</style>
