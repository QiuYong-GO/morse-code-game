<script setup lang="ts">
defineProps<{
  code: string;
  fixedSpacing?: boolean;
}>();
</script>

<template>
  <div class="morse-renderer" :class="{ 'fixed-spacing': fixedSpacing }">
    <div v-for="(char, index) in code" :key="index" class="symbol-wrapper">
      <div v-if="char === '.'" class="symbol dot"></div>
      <div v-else-if="char === '-'" class="symbol dash"></div>
    </div>
  </div>
</template>

<style scoped>
.morse-renderer {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 20px;
}

.morse-renderer.fixed-spacing {
  gap: 4px; /* 稍微增加间距 */
}

.symbol-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fixed-spacing .symbol-wrapper {
  width: 24px; /* 缩小占用宽度 (原32px -> 24px) */
}

.symbol {
  background-color: currentColor;
  display: inline-block;
  box-shadow: 0 0 2px currentColor;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dash {
  width: 20px; /* 缩小横杠宽度 (原32px -> 20px) */
  height: 4px;
  border-radius: 2px;
}
</style>
