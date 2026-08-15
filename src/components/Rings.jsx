export default function Rings({ count = 9, className = "" }) {
  return (
    <div className={`rings ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="ring" />
      ))}
    </div>
  );
}
