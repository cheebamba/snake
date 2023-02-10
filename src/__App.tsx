import { FC, useEffect, useState } from "react";
import useGameStateStore from "./store/main";

function App() {
  const snake = useGameStateStore((state) => state.snake);
  const currentTick = useGameStateStore((state) => state.currentTick);
  const increaseTick = useGameStateStore((state) => state.increaseTick);
  const bears = useGameStateStore((state) => state.bears);
  const increasePopulation = useGameStateStore(
    (state) => state.increasePopulation
  );

  const [test, setTest] = useState(2);

  useEffect(() => {
    console.log("bears", bears);
  }, [bears]);

  useState(() => {
    document.addEventListener("keydown", (ev) => {
      if (ev.code === "KeyW") {
        increasePopulation();
        setTest((test) => test + 1);
      }
      if (ev.code === "KeyS") {
      }
      if (ev.code === "Escape") {
      }
      // setInterval(() => {
      //   tick();
      // }, 2000);
    }),
      [];
  });

  function tick() {
    increasePopulation();
    console.log("TICK", bears);
  }

  const Dot: FC = () => {
    let cords = snake[0];
    let x = cords[0];
    let y = cords[1];
    let left = x * 20;
    let bot = y * 20;

    return (
      <div
        style={{ left: left, bottom: bot }}
        className={`absolute w-[20px] h-[20px] bg-slate-50`}
      ></div>
    );
  };

  return (
    <div className='flex justify-center items-center align-middle h-full w-full'>
      <div className='h-[420px] w-[420px] bg-slate-900 relative'>
        <Dot />
      </div>
      <button
        onClick={() => {
          increasePopulation();
        }}
      >
        {bears} {test}
      </button>
    </div>
  );
}

export default App;
