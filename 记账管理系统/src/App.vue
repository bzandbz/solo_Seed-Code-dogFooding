<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">💳</span>
          <h1 class="page-title">记账管理系统</h1>
        </div>
        <p class="header-subtitle">轻松记录每一笔收支</p>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <Statistics :refresh-key="refreshKey" />
        
        <div class="content-layout">
          <aside class="form-section">
            <RecordForm @success="handleFormSuccess" />
          </aside>
          
          <section class="list-section">
            <RecordList :refresh-key="refreshKey" />
          </section>
        </div>
      </div>
    </main>

    <footer class="app-footer">
      <div class="container">
        <p>Vue3 记账管理系统 &copy; 2026</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import Statistics from './components/Statistics.vue'

const refreshKey = ref(0)

const handleFormSuccess = () => {
  refreshKey.value++
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 0;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.header-content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 10px;
}

.logo-icon {
  font-size: 36px;
}

.app-header .page-title {
  color: white;
  margin: 0;
  font-size: 28px;
}

.header-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.main-content {
  flex: 1;
  padding: 30px 0;
}

.content-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 24px;
}

.form-section {
  grid-column: 1;
}

.list-section {
  grid-column: 2;
}

.app-footer {
  background-color: #303133;
  color: #909399;
  padding: 20px 0;
  text-align: center;
  font-size: 14px;
}

@media (max-width: 1200px) {
  .content-layout {
    grid-template-columns: 340px 1fr;
    gap: 20px;
  }
}

@media (max-width: 900px) {
  .content-layout {
    grid-template-columns: 1fr;
  }
  
  .form-section,
  .list-section {
    grid-column: 1;
  }
}

@media (max-width: 768px) {
  .app-header {
    padding: 20px 0;
  }
  
  .logo-icon {
    font-size: 28px;
  }
  
  .app-header .page-title {
    font-size: 22px;
  }
  
  .header-subtitle {
    font-size: 14px;
  }
  
  .content-layout {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .main-content {
    padding: 20px 0;
  }
}
</style>
