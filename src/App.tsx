import { type FC, useState, useEffect, useRef } from "react";
import useGameStateStore from "./store/main";

function App() {
  const {
    interval,
    speed,
    snake,
    menu,
    currentTick,
    setCurTick,
    increaseTick,
    setInter,
    reset,
    toggleMenu,
  } = useGameStateStore();
  // 1 - up, 2 - right, 3 - down, 4 - left
  const [direction, setDirection] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);
  }, []);

  useEffect(() => {}, [menu]);

  useEffect(() => {
    if (currentTick >= 10 / speed) {
      move();
      setCurTick(0);
    }
  }, [currentTick]);

  function keyHandler(ev: KeyboardEvent) {
    if (ev.code === "KeyW") {
      setDirection(1);
    }
    if (ev.code === "KeyD") {
      setDirection(2);
    }
    if (ev.code === "KeyS") {
      setDirection(3);
    }
    if (ev.code === "KeyA") {
      setDirection(4);
    }
    if (ev.code === "Escape") {
      stop();
    }
  }

  function move() {
    const curX = snake[0][0];
    const curY = snake[0][1];
    let newY = 0;
    let newX = 0;

    switch (direction) {
      case 1:
        newY = curY + 1;
        if (newY > 20) {
          end();
          return null;
        }
        snake.unshift([curX, newY]);
        break;
      case 2:
        newX = curX + 1;
        if (newX > 20) {
          end();
          return null;
        }
        snake.unshift([newX, curY]);
        break;
      case 3:
        newY = curY - 1;
        if (newY < 0) {
          end();
          return null;
        }
        snake.unshift([curX, newY]);
        break;
      default:
        newX = curX - 1;
        if (newX < 0) {
          end();
          return null;
        }
        snake.unshift([newX, curY]);
        break;
    }
    snake.pop();
  }

  function start() {
    setDirection(1);
    reset();
    toggleMenu();
    setInter(
      setInterval(() => {
        increaseTick();
      }, 100)
    );
  }

  function stop() {
    clearInterval(interval);
    setInter(0);
  }

  const Snake: FC = () => {
    let cords = snake[0];
    let x = cords[0];
    let y = cords[1];
    let left = x * 20;
    let bot = y * 20;

    return (
      <div
        style={{ left: left, bottom: bot }}
        className={`absolute h-[20px] w-[20px] bg-slate-50`}
      ></div>
    );
  };

  function end() {
    toggleMenu();
    stop();
  }

  const Menu: FC<{
    className?: string;
    children?: JSX.Element[] | JSX.Element;
  }> = ({ children, className }) => {
    return (
      <div
        className={`absolute h-full w-full bg-gray-800 bg-opacity-95 ${className}`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 align-middle">
          {children && children}
        </div>
      </div>
    );
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
        <Snake />
        {menu && (
          <Menu>
            <Button title="Start" action={start} />
          </Menu>
        )}
      </div>
    </div>
  );
}

export default App;
