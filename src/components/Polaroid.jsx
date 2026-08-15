export default function Polaroid({ caption, rotate = 0, seed, edge, className = "", style }) {
  const cls = ["polaroid", edge === "torn" ? "polaroid-torn" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} style={{ "--rot": `${rotate}deg`, ...style }}>
      <div className="photo">
        <img src={`https://picsum.photos/seed/${seed}/500/650`} alt={caption || seed} loading="lazy" />
      </div>
      {caption && <p className="caption script">{caption}</p>}
    </div>
  );
}
