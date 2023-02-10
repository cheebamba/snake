import { create } from "zustand";

interface GameState {
  speed: number;
  currentTick: number;
  interval: number;
  snake: number[][];
  menu: boolean;
  reset: () => void;
  toggleMenu: () => void;
  setCurTick: (ref: number) => void;
  increaseTick: () => void;
  setInter: (ref: number) => void;
  increaseSpeed: (by: number) => void;
}

const initState = {
  currentTick: 0,
  // speed
  speed: 3,
  // interval ref
  interval: 0,
  menu: true,
  // starting snake
  snake: [[10, 2]],
};

const useGameStateStore = create<GameState>()((set) => ({
  ...initState,
  reset: () =>
    set((state) => ({
      currentTick: 0,
      // speed
      speed: 3,
      // interval ref
      interval: 0,
      menu: true,
      // starting snake
      snake: [[10, 2]],
    })),
  toggleMenu: () => set((state) => ({ menu: !state.menu })),
  setCurTick: (tick: number) => set((state) => ({ currentTick: tick })),
  increaseTick: () => set((state) => ({ currentTick: state.currentTick + 1 })),
  setInter: (ref: number) => set((state) => ({ interval: ref })),
  increaseSpeed: (by: number) => set((state) => ({ speed: state.speed + by })),
}));

export default useGameStateStore;
