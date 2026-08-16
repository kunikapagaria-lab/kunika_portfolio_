import TurtleRunGame from "../components/TurtleRunGame";

export default function Bonus() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
      <span className="panel-label">05 — bonus</span>
      <h1 className="font-display text-5xl md:text-6xl mt-4 mb-4">You made it to the end.</h1>
      <p className="text-sm md:text-base text-muted leading-relaxed max-w-md mb-8">
        Since you scrolled all the way down here — press space (or tap) to jump.
      </p>
      <TurtleRunGame />
    </div>
  );
}
