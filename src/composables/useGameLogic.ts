import { ref, computed } from 'vue';

const MORSE_MAP = [
  '-----', // 0
  '.----', // 1
  '..---', // 2
  '...--', // 3
  '....-', // 4
  '.....', // 5
  '-....', // 6
  '--...', // 7
  '---..', // 8
  '----.', // 9
];

export function useGameLogic() {
  const targetCode = ref<number[]>([]);
  const puzzleMorse = ref<string[]>([]);
  const currentIndex = ref(0); // 0, 1, 2
  const gameStatus = ref<'playing' | 'success' | 'fail'>('playing');
  
  // Keep track of user inputs for display
  const userInputs = ref<(number | null)[]>([null, null, null]);

  // Initialize game
  const initGame = () => {
    targetCode.value = [];
    puzzleMorse.value = [];
    currentIndex.value = 0;
    userInputs.value = [null, null, null];
    gameStatus.value = 'playing';

    // Generate 3 random digits
    for (let i = 0; i < 3; i++) {
      const digit = Math.floor(Math.random() * 10);
      targetCode.value.push(digit);
      puzzleMorse.value.push(MORSE_MAP[digit]!);
    }
    
    console.log('Target Code (Debug):', targetCode.value);
  };

  // Verify a single digit entry
  const validateDigit = (inputDigit: number): boolean => {
    if (gameStatus.value !== 'playing') return false;

    const correctDigit = targetCode.value[currentIndex.value];
    
    if (inputDigit === correctDigit) {
      // Correct input
      userInputs.value[currentIndex.value] = inputDigit;
      currentIndex.value++;
      
      // Check win condition
      if (currentIndex.value >= 3) {
        gameStatus.value = 'success';
      }
      return true;
    } else {
      // Incorrect input
      return false;
    }
  };

  return {
    targetCode,
    puzzleMorse,
    currentIndex,
    userInputs,
    gameStatus,
    initGame,
    validateDigit
  };
}
