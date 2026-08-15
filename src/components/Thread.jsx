export default function Thread({ width = 160, rotate = 0, color = "red", className = "", style }) {
  return (
    <span
      className={`thread thread-${color} ${className}`}
      style={{ width, transform: `rotate(${rotate}deg)`, ...style }}
    />
  );
}
