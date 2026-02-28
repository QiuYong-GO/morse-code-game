<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  userInputs: (number | null)[]; // Array of 3
  activeIndex: number;
  disabled: boolean;
  isError: boolean; // Prop to trigger error animation
}>();

const emit = defineEmits<{
  (e: 'input', value: number): void;
}>();

const handlePress = (num: number) => {
  if (props.disabled) return;
  emit('input', num);
};
</script>

<template>
  <div class="keypad-section panel-box">
    <!-- Top Display Area -->
    <div class="display-area">
      <div class="display-header">请输入密码_ _ _</div>
      <div class="input-boxes">
        <div 
          v-for="(val, index) in 3" 
          :key="index"
          class="input-box"
          :class="{ 
            active: index === activeIndex && !disabled, 
            filled: userInputs[index] !== null,
            error: isError && index === activeIndex 
          }"
        >
          <div class="brackets left">[</div>
          <span class="value">{{ userInputs[index] !== null ? userInputs[index] : '' }}</span>
          <div class="brackets right">]</div>
        </div>
      </div>
    </div>

    <!-- Keypad Area -->
    <div class="keys-grid">
      <button v-for="n in 9" :key="n" @click="handlePress(n)" :disabled="disabled" class="key-btn">
        {{ n }}
      </button>
      <div class="empty-cell"></div>
      <button @click="handlePress(0)" :disabled="disabled" class="key-btn">0</button>
      <div class="empty-cell"></div>
    </div>
  </div>
</template>

<style scoped>
.keypad-section {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Display Area Styles */
.display-area {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-panel-border);
  background: rgba(0, 0, 0, 0.1);
}

.display-header {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: var(--color-text);
  opacity: 0.8;
}

.input-boxes {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.input-box {
  flex: 1;
  aspect-ratio: 1;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-panel-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-highlight);
  position: relative;
  transition: all 0.2s;
}

.input-box.active {
  border-color: var(--color-highlight);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.input-box.error {
  border-color: var(--color-danger);
  color: var(--color-danger);
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

.brackets {
  position: absolute;
  font-weight: 300;
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.brackets.left { left: 5px; }
.brackets.right { right: 5px; }

.input-box.active .brackets { opacity: 1; }

/* Keypad Styles */
.keys-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--color-panel-border); /* Grid lines color */
  padding: 1px; /* Outer border */
}

.key-btn {
  background: var(--color-panel-bg);
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: background 0.1s;
}

.key-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
}

.key-btn:active:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.key-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-cell {
  background: var(--color-panel-bg);
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
