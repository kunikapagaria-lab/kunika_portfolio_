export default function Pin({ color = "red", rotate = 0, className = "", style }) {
  return (
    <span
      className={`pin pin-${color} ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    />
  );
}
