import { useEffect, useRef, useState } from "react";

const WIDTH = 800;
const HEIGHT = 220;
const GROUND_Y = 170;
const TURTLE_X = 60;
const TURTLE_W = 34;
const TURTLE_H = 24;
const GRAVITY = 0.9;
const JUMP_VELOCITY = -13;

interface Obstacle {
  x: number;
  width: number;
  height: number;
}

type GameState = "ready" | "playing" | "gameover";

export default function TurtleRunGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>("ready");
  const [, forceRender] = useState(0);

  const turtleY = useRef(0);
  const velocity = useRef(0);
  const obstacles = useRef<Obstacle[]>([]);
  const speed = useRef(5);
  const distance = useRef(0);
  const frame = useRef(0);
  const nextSpawn = useRef(60);
  const bestScore = useRef(0);
  const rafId = useRef<number | null>(null);

  const resetGame = () => {
    turtleY.current = 0;
    velocity.current = 0;
    obstacles.current = [];
    speed.current = 2.5;
    distance.current = 0;
    frame.current = 0;
    nextSpawn.current = 60;
  };

  const jump = () => {
    if (stateRef.current === "ready") {
      stateRef.current = "playing";
      resetGame();
      forceRender((n) => n + 1);
    } else if (stateRef.current === "gameover") {
      stateRef.current = "playing";
      resetGame();
      forceRender((n) => n + 1);
    } else if (stateRef.current === "playing" && turtleY.current === 0) {
      velocity.current = JUMP_VELOCITY;
    }
  };

  const onCanvasKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
      e.preventDefault();
      jump();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    const ink = `hsl(${getComputedStyle(document.documentElement).getPropertyValue("--ink")})`;

    const drawTurtle = (y: number, running: boolean) => {
      const baseY = GROUND_Y - TURTLE_H - y;
      ctx.fillStyle = ink;
      ctx.fillRect(TURTLE_X, baseY + 6, TURTLE_W, TURTLE_H - 10);
      ctx.fillRect(TURTLE_X + 4, baseY, TURTLE_W - 10, 10);
      ctx.fillRect(TURTLE_X + TURTLE_W - 4, baseY + 4, 8, 8);
      const legUp = running && Math.floor(frame.current / 6) % 2 === 0;
      ctx.fillRect(TURTLE_X + 2, baseY + TURTLE_H - 4, 6, legUp ? 2 : 6);
      ctx.fillRect(TURTLE_X + TURTLE_W - 12, baseY + TURTLE_H - 4, 6, legUp ? 6 : 2);
    };

    const drawObstacle = (o: Obstacle) => {
      ctx.fillStyle = ink;
      ctx.fillRect(o.x, GROUND_Y - o.height, o.width, o.height);
    };

    const tick = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      ctx.strokeStyle = ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(WIDTH, GROUND_Y);
      ctx.stroke();

      if (stateRef.current === "playing") {
        frame.current += 1;
        velocity.current += GRAVITY;
        turtleY.current = Math.max(0, turtleY.current - velocity.current);
        if (turtleY.current <= 0) {
          turtleY.current = 0;
          velocity.current = 0;
        }

        distance.current += speed.current * 0.06;
        speed.current = Math.min(6, 2.5 + distance.current * 0.015);

        nextSpawn.current -= 1;
        if (nextSpawn.current <= 0) {
          const h = 18 + Math.floor(Math.random() * 22);
          obstacles.current.push({ x: WIDTH, width: 14 + Math.floor(Math.random() * 10), height: h });
          nextSpawn.current = 70 + Math.floor(Math.random() * 40) - Math.min(20, distance.current * 0.3);
        }

        obstacles.current.forEach((o) => (o.x -= speed.current));
        obstacles.current = obstacles.current.filter((o) => o.x + o.width > 0);

        const turtleTop = GROUND_Y - TURTLE_H - turtleY.current;
        for (const o of obstacles.current) {
          const hit =
            TURTLE_X + TURTLE_W - 6 > o.x &&
            TURTLE_X + 6 < o.x + o.width &&
            turtleTop + TURTLE_H - 4 > GROUND_Y - o.height;
          if (hit) {
            stateRef.current = "gameover";
            bestScore.current = Math.max(bestScore.current, Math.floor(distance.current));
            forceRender((n) => n + 1);
          }
        }
      }

      obstacles.current.forEach(drawObstacle);
      drawTurtle(turtleY.current, stateRef.current === "playing");

      ctx.fillStyle = ink;
      ctx.font = "16px 'Space Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText(String(Math.floor(distance.current)).padStart(5, "0"), WIDTH - 10, 24);

      if (stateRef.current === "ready") {
        ctx.textAlign = "center";
        ctx.fillText("PRESS SPACE OR TAP TO START", WIDTH / 2, HEIGHT / 2);
      } else if (stateRef.current === "gameover") {
        ctx.textAlign = "center";
        ctx.font = "bold 18px 'Space Mono', monospace";
        ctx.fillText("GAME OVER", WIDTH / 2, HEIGHT / 2 - 12);
        ctx.font = "14px 'Space Mono', monospace";
        ctx.fillText(`score ${Math.floor(distance.current)} — best ${bestScore.current}`, WIDTH / 2, HEIGHT / 2 + 12);
        ctx.fillText("press space or tap to retry", WIDTH / 2, HEIGHT / 2 + 34);
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={(e) => {
        e.currentTarget.focus();
        jump();
      }}
      onKeyDown={onCanvasKeyDown}
      onTouchStart={(e) => {
        e.preventDefault();
        jump();
      }}
      style={{ width: "100%", maxWidth: WIDTH, height: HEIGHT, touchAction: "manipulation" }}
      className="border-2 border-stroke bg-surface cursor-pointer"
      tabIndex={0}
      role="application"
      aria-label="Turtle run mini-game: press space, tap, or click to jump over obstacles"
    />
  );
}
