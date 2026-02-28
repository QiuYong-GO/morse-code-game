<script setup lang="ts">
import MorseRenderer from './MorseRenderer.vue';

defineProps<{
  puzzleCodes: string[];
  activeIndex: number;
}>();
</script>

<template>
  <div class="puzzle-section panel-box p-4">
    <div class="section-header">
      <span class="dot-icon"></span>
      <span class="header-text">已获取的密码</span>
    </div>
    
    <div class="codes-container">
      <div 
        v-for="(code, index) in puzzleCodes" 
        :key="index" 
        class="code-slot"
        :class="{ active: index === activeIndex, completed: index < activeIndex }"
      >
        <div class="brackets left">[</div>
        <!-- 启用固定间距，确保宽度可控 -->
        <MorseRenderer :code="code" :fixed-spacing="true" class="morse-content" />
        <div class="brackets right">]</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.puzzle-section {
  width: 100%;
  margin-bottom: 1rem;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.dot-icon {
  width: 6px;
  height: 6px;
  background-color: var(--color-primary);
  margin-right: 8px;
  border-radius: 50%;
}

.header-text {
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.codes-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.code-slot {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid transparent;
  color: var(--color-text-dim);
  transition: all 0.3s ease;
  font-size: 1.5rem;
  letter-spacing: 4px;
  /* 确保每个 slot 宽度一致，不随内容变化 */
  min-width: 0; 
  overflow: hidden;
}

.code-slot.active {
  border-color: var(--color-highlight);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-highlight);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.code-slot.completed {
  color: var(--color-text-dim);
  opacity: 0.5;
}

.brackets {
  font-weight: 300;
  opacity: 0;
  transition: opacity 0.3s;
  margin: 0 5px;
  flex-shrink: 0; /* 防止括号被挤压 */
}

.code-slot.active .brackets {
  opacity: 1;
}

.morse-content {
  /* 缩放以适应容器，避免溢出 */
  transform: scale(0.8); 
  /* 确保即使是5个长符号也能放下 */
  white-space: nowrap;
}
</style>
