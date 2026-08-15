export default function Tag({ children, rotate = -6, className = "", style }) {
  return (
    <div className={`tag-label ${className}`} style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <span className="tag-label-hole" />
      <span className="tag-label-text hand">{children}</span>
    </div>
  );
}
