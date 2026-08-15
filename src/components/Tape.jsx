export default function Tape({ pattern = "check", size, rotate = -12, top, left, right, bottom, style }) {
  const cls = ["tape", pattern === "dot" ? "tape-dot" : "tape-check", size].filter(Boolean).join(" ");
  return (
    <span
      className={cls}
      style={{
        top,
        left,
        right,
        bottom,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    />
  );
}
