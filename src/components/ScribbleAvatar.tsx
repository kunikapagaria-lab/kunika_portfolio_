interface ScribbleAvatarProps {
  className?: string;
}

export default function ScribbleAvatar({ className = "" }: ScribbleAvatarProps) {
  return (
    <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="110" cy="185" rx="70" ry="34" fill="hsl(var(--accent))" />
      <circle cx="110" cy="95" r="4" fill="#111" />
      <path
        d="M95 100c-4 3-4 8 0 10M125 100c4 3 4 8 0 10"
        stroke="#111"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M110 95
           C 60 60, 150 20, 140 75
           C 130 130, 50 110, 65 55
           C 80 5, 170 40, 150 100
           C 130 160, 40 140, 60 80
           C 80 15, 175 55, 145 110
           C 120 155, 60 150, 78 100
           C 92 65, 130 70, 118 95"
        stroke="#111"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
