<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import MorseReference from './MorseReference.vue';
import PuzzleScreen from './PuzzleScreen.vue';
import SecurityKeypad from './SecurityKeypad.vue';
import { useGameLogic } from '../composables/useGameLogic';
import { useSound } from '../composables/useSound';

const { puzzleMorse, currentIndex, userInputs, gameStatus, initGame, validateDigit } = useGameLogic();
const { playClick, playSuccess, playError } = useSound();

const isErrorState = ref(false);
const showFinalSuccess = ref(false);
const decryptionProgress = ref(0);

onMounted(() => {
  initGame();
});

const handleKeypadInput = (digit: number) => {
  if (isErrorState.value || showFinalSuccess.value || decryptionProgress.value > 0) return; 
  
  playClick();
  
  const isValid = validateDigit(digit);
  
  if (isValid) {
    // Check if game is won
    if (gameStatus.value === 'success') {
      startDecryptionSequence();
    }
  } else {
    // Error handling
    playError();
    isErrorState.value = true;
    
    // Reset error state after animation
    setTimeout(() => {
      isErrorState.value = false;
    }, 500);
  }
};

const startDecryptionSequence = () => {
  // Start fast progress bar animation
  let progress = 0;
  const duration = 1500; // 1.5 seconds
  const interval = 20; // update every 20ms
  const steps = duration / interval;
  const increment = 100 / steps;
  
  const timer = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      playSuccess();
      setTimeout(() => {
        showFinalSuccess.value = true;
      }, 200);
    }
    decryptionProgress.value = progress;
  }, interval);
};

const handleRestart = () => {
  playClick();
  initGame();
  isErrorState.value = false;
  showFinalSuccess.value = false;
  decryptionProgress.value = 0;
};

const displayProgress = computed(() => {
  if (gameStatus.value === 'success') {
    return Math.floor(decryptionProgress.value);
  }
  return Math.floor((currentIndex.value / 3) * 100);
});
</script>

<template>
  <div class="game-wrapper">
    <div class="vignette"></div>
    
    <div class="main-terminal">
      <!-- Header / Title Bar -->
      <div class="terminal-header">
        请找到摩斯密码对应的数字
        <span class="version-tag">0.7.1 - V30.8</span>
      </div>

      <div class="content-grid">
        <!-- Left Column -->
        <div class="left-col">
          <PuzzleScreen 
            :puzzleCodes="puzzleMorse" 
            :activeIndex="currentIndex" 
          />
          <MorseReference />
        </div>

        <!-- Right Column -->
        <div class="right-col">
          <SecurityKeypad 
            :userInputs="userInputs"
            :activeIndex="currentIndex"
            :disabled="gameStatus !== 'playing'"
            :isError="isErrorState"
            @input="handleKeypadInput"
          />
        </div>
      </div>

      <!-- Footer / Status Bar -->
      <div class="terminal-footer">
        <div class="status-text">
          >> {{ gameStatus === 'success' ? '正在执行最终解密...' : '自动解锁同步进行中...' }}
        </div>
        <div class="progress-bar-container">
          <div class="progress-fill" :style="{ width: displayProgress + '%' }"></div>
        </div>
        <div class="percentage">{{ displayProgress }}%</div>
      </div>
      
      <!-- Decryption Animation Overlay -->
      <div v-if="gameStatus === 'success' && !showFinalSuccess" class="decryption-overlay">
        <div class="decryption-content">
          <div class="tech-spinner"></div>
          <div class="decryption-text">破译中... {{ Math.floor(decryptionProgress) }}%</div>
          <div class="decryption-bar">
             <div class="decryption-fill" :style="{ width: decryptionProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Final Success Overlay -->
      <div v-if="showFinalSuccess" class="success-overlay" @click="handleRestart">
        <div class="success-msg">
          <div class="success-icon"></div>
          <h1>解锁成功</h1>
          <p>点击屏幕重置</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.main-terminal {
  width: 900px;
  height: 550px;
  background: var(--color-bg);
  border: 1px solid var(--color-panel-border);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  position: relative;
  z-index: 10;
  box-shadow: 0 0 50px rgba(0,0,0,0.5);
}

/* Header */
.terminal-header {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-dim);
  border-bottom: 1px solid var(--color-panel-border);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

/* Content Grid */
.content-grid {
  display: flex;
  gap: 1rem;
  flex: 1;
  min-height: 0;
}

.left-col {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.right-col {
  flex: 1;
}

/* Footer */
.terminal-footer {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-text-dim);
  font-size: 0.8rem;
  border-top: 1px solid var(--color-panel-border);
  padding-top: 0.8rem;
}

.status-text {
  white-space: nowrap;
  min-width: 150px;
}

.progress-bar-container {
  flex: 1;
  height: 8px;
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--color-panel-border);
  position: relative;
}

.progress-fill {
  height: 100%;
  background: var(--color-text);
  width: 0%;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(255,255,255,0.2);
}

/* Decryption Overlay */
.decryption-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.decryption-content {
  width: 60%;
  text-align: center;
  color: var(--color-highlight);
}

.decryption-text {
  font-size: 1.5rem;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  font-weight: bold;
}

.decryption-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.decryption-fill {
  height: 100%;
  background: var(--color-highlight);
  box-shadow: 0 0 20px var(--color-highlight);
}

/* Final Success Overlay */
.success-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 30;
  animation: fadeIn 0.3s;
}

.success-msg {
  background: rgba(10, 20, 15, 0.95);
  border: 1px solid var(--color-success);
  padding: 3rem 5rem;
  text-align: center;
  color: var(--color-success);
  box-shadow: 0 0 50px rgba(16, 185, 129, 0.2);
  position: relative;
}

.success-msg::before, .success-msg::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-success);
  transition: all 0.3s ease;
}

.success-msg::before { top: -2px; left: -2px; border-width: 2px 0 0 2px; }
.success-msg::after { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; }

.success-msg h1 { 
  margin: 0 0 1rem 0; 
  font-size: 2.5rem;
  letter-spacing: 4px;
  text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
}

.success-msg p {
  color: var(--color-text-dim);
  letter-spacing: 2px;
  font-size: 0.9rem;
  text-transform: uppercase;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
