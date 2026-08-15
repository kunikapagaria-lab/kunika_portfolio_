export default function ArrowNote({ children, rotate = 0, className = "", style }) {
  return (
    <div className={`arrow-note ${className}`} style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <svg className="arrow-note-svg" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6c14 2 30 10 34 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M30 24c2 4 4 6 8 8m-8-8c-4 1-7 1-10 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="script arrow-note-text">{children}</span>
    </div>
  );
}
