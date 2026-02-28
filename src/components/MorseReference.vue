<script setup lang="ts">
import MorseRenderer from './MorseRenderer.vue';

const morseCodeMap = [
  { num: 1, code: '.----' },
  { num: 2, code: '..---' },
  { num: 3, code: '...--' },
  { num: 4, code: '....-' },
  { num: 5, code: '.....' },
  { num: 6, code: '-....' },
  { num: 7, code: '--...' },
  { num: 8, code: '---..' },
  { num: 9, code: '----.' },
  { num: 0, code: '-----' },
];
</script>

<template>
  <div class="reference-section panel-box p-4">
    <div class="section-header">
      <span class="dot-icon"></span>
      <span class="header-text">密码破译线索</span>
    </div>

    <div class="grid-layout">
      <div v-for="item in morseCodeMap" :key="item.num" class="grid-item">
        <!-- 启用 fixed-spacing 模式 -->
        <MorseRenderer :code="item.code" :fixed-spacing="true" class="code-renderer" />
        <span class="digit">{{ item.num }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reference-section {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
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

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 1rem;
  flex: 1;
}

.grid-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid transparent;
  transition: all 0.2s;
}

.grid-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.code-renderer {
  color: var(--color-text-dim);
  /* Scale down more because fixed spacing takes up more width */
  transform: scale(0.6);
  transform-origin: left center;
}

.grid-item:hover .code-renderer {
  color: var(--color-highlight);
}

.digit {
  color: var(--color-text);
  font-weight: bold;
  font-size: 1.3rem;
  line-height: 1;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}
</style>
