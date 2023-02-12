import { type FC, useState, useEffect } from "react";
import useGameStateStore from "./store/main";

function App() {
  const {
    interval,
    speed,
    snake,
    menu,
    score,
    food,
    currentEaten,
    currentTick,
    setCurTick,
    increaseTick,
    increaseScore,
    increaseSpeed,
    resetEaten,
    increaseEaten,
    getSnake,
    setInter,
    reset,
    toggleMenu,
    addPosition,
    addFood,
  } = useGameStateStore();

  // 1 - up, 2 - right, 3 - down, 4 - left
  const [direction, setDirection] = useState<1 | 2 | 3 | 4>(1);
  const [showScore, setShowSore] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);
  }, []);

  useEffect(() => {
    if (currentTick >= 100 / speed) {
      move();
      setCurTick(0);
    }
  }, [currentTick]);

  function start() {
    setDirection(1);
    reset();
    toggleMenu();
    addFood();
    addFood();
    setInter(
      setInterval(() => {
        increaseTick();
      }, 10)
    );
  }

  function stop() {
    clearInterval(interval);
    setInter(0);
  }

  function end() {
    toggleMenu();
    stop();
    setShowSore(true);
  }

  function checkBackwards(direction: 1 | 2 | 3 | 4) {
    let updatedSnake = getSnake();
    let x = updatedSnake[0][0];
    let y = updatedSnake[0][1];
    let sx = 99;
    let sy = 99;
    if (updatedSnake[1]) {
      sx = updatedSnake[1][0];
      sy = updatedSnake[1][1];
    }
    if (direction === 1 && y + 1 === sy) {
      return true;
    }
    if (direction === 2 && x + 1 === sx) {
      return true;
    }
    if (direction === 3 && y - 1 === sy) {
      return true;
    }
    if (direction === 4 && x - 1 === sx) {
      return true;
    }
    return false;
  }

  function keyHandler(ev: KeyboardEvent) {
    if (ev.code === "KeyW") {
      if (checkBackwards(1)) {
        return;
      }
      setDirection(1);
    }
    if (ev.code === "KeyD") {
      if (checkBackwards(2)) {
        return;
      }
      setDirection(2);
    }
    if (ev.code === "KeyS") {
      if (checkBackwards(3)) {
        return;
      }
      setDirection(3);
    }
    if (ev.code === "KeyA") {
      if (checkBackwards(4)) {
        return;
      }
      setDirection(4);
    }
  }

  function makeMove(x: number, y: number) {
    if (x < 0 || x > 20 || y < 0 || y > 20) {
      end();
      return null;
    }
    if (snake.find((e) => e[0] === x && e[1] === y)) {
      end();
    }
    let eaten = false;
    if (food.find((e) => e[0] === x && e[1] === y)) {
      eaten = true;
      addFood();
      increaseScore(1);
      increaseEaten();
      if (currentEaten > 2) {
        resetEaten();
        increaseSpeed();
      }
    }
    addPosition(x, y, eaten);
  }

  function move() {
    const curX = snake[0][0];
    const curY = snake[0][1];
    let newY = 0;
    let newX = 0;

    switch (direction) {
      case 1:
        newX = curX;
        newY = curY + 1;
        break;
      case 2:
        newX = curX + 1;
        newY = curY;
        break;
      case 3:
        newX = curX;
        newY = curY - 1;
        break;
      default:
        newX = curX - 1;
        newY = curY;
        break;
    }
    makeMove(newX, newY);
  }

  const Snake: FC<{ x: number; y: number }> = ({ x, y }) => {
    let left = x * 20;
    let bot = y * 20;

    return (
      <div
        style={{ left: left, bottom: bot }}
        className={`absolute z-10 h-[20px]  w-[20px] bg-slate-50`}
      ></div>
    );
  };

  const Food: FC<{ x: number; y: number }> = ({ x, y }) => {
    let left = x * 20;
    let bot = y * 20;
    return (
      <div
        style={{ left: left, bottom: bot }}
        className={`absolute z-0 h-[20px] w-[20px] bg-green-500`}
      ></div>
    );
  };

  const Menu: FC<{
    className?: string;
    children?: JSX.Element[] | JSX.Element;
  }> = ({ children, className }) => {
    return (
      <div
        className={`absolute z-20 h-full w-full bg-gray-800 bg-opacity-95 ${className}`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 align-middle">
          {children && children}
        </div>
      </div>
    );
  };

  const Score: FC = () => {
    if (showScore) {
      return <div className="text-xl text-gray-200">Score: {score}</div>;
    }
    return null;
  };

  const Button: FC<{ title: string; action?: () => void }> = ({
    title,
    action,
  }) => {
    return (
      <button
        onClick={action}
        className=" rounded-md bg-slate-500 py-1 px-3 text-slate-200"
      >
        {title}
      </button>
    );
  };

  return (
    <div className="flex h-full w-full items-center justify-center align-middle">
      <div className="relative h-[420px] w-[420px] bg-slate-900">
        {snake &&
          snake.map((el, key) => {
            return <Snake key={key} x={el[0]} y={el[1]} />;
          })}

        {food &&
          food.map((el, key) => {
            return <Food key={key} x={el[0]} y={el[1]} />;
          })}
        {menu && (
          <Menu>
            <Score />
            <Button title="Start" action={start} />
          </Menu>
        )}
      </div>
    </div>
  );
}

export default App;
