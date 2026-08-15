export default function Stamp({ children, rotate = 6, className = "", style }) {
  return (
    <div className={`stamp ${className}`} style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      {children}
    </div>
  );
}
