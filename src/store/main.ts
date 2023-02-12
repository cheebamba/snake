import { create } from "zustand";

interface GameState {
  speed: number;
  currentTick: number;
  interval: number;
  currentEaten: number;
  score: number;
  snake: number[][];
  food: number[][];
  menu: boolean;
  reset: () => void;
  toggleMenu: () => void;
  setCurTick: (ref: number) => void;
  increaseTick: () => void;
  setInter: (ref: number) => void;
  increaseSpeed: () => void;
  increaseEaten: () => void;
  getSnake: () => number[][];
  resetEaten: () => void;
  increaseScore: (by: number) => void;
  addPosition: (x: number, y: number, eaten: boolean) => void;
  addFood: () => void;
}

const initState = {
  currentTick: 0,
  speed: 4,
  interval: 0,
  currentEaten: 0,
  score: 0,
  menu: true,
  snake: [[10, 2]],
  food: [],
};

const useGameStateStore = create<GameState>()((set, get) => ({
  ...initState,
  reset: () => set((state) => ({ ...initState })),
  toggleMenu: () => set((state) => ({ menu: !state.menu })),
  setCurTick: (tick) => set((state) => ({ currentTick: tick })),
  increaseTick: () => set((state) => ({ currentTick: state.currentTick + 1 })),
  setInter: (ref) => set((state) => ({ interval: ref })),
  getSnake: () => {
    const snake: number[][] = get().snake;
    return snake;
  },
  increaseSpeed: () =>
    set((state) => {
      return { speed: state.speed + 1 };
    }),
  increaseEaten: () =>
    set((state) => ({ currentEaten: state.currentEaten + 1 })),
  resetEaten: () => set(() => ({ currentEaten: 0 })),
  increaseScore: (by: number) => set((state) => ({ score: state.score + by })),
  addPosition: (x, y, eaten) => {
    set((state) => {
      const [tail, ...rest] = state.snake.reverse();
      let restSnake = rest.reverse();
      if (eaten) {
        state.food.splice(
          state.food.findIndex((e) => e[0] === x && e[1] === y),
          1
        );
        restSnake = [...rest, tail];
      }

      return {
        ...state,
        snake: [[x, y], ...restSnake],
      };
    });
  },
  addFood: () => {
    set((state) => {
      let x = 0;
      let y = 0;
      function randPos() {
        return Math.floor(Math.random() * 20);
      }
      function checkIfValid(x: number, y: number) {
        return !state.snake.find((e) => e[0] === x && e[1] === y);
      }
      function assignNumbers() {
        x = randPos();
        y = randPos();
        if (!checkIfValid(x, y)) {
          assignNumbers();
        }
      }
      assignNumbers();

      return {
        ...state,
        food: [[x, y], ...state.food],
      };
    });
  },
}));

export default useGameStateStore;
