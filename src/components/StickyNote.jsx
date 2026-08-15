export default function StickyNote({ children, color = "yellow", rotate = -4, className = "", style }) {
  return (
    <div
      className={`sticky-note sticky-${color} ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      {children}
    </div>
  );
}
