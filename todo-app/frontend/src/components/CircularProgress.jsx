export default function CircularProgress({ value, size = 88, strokeWidth = 6 }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);

  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" style={{ position: 'absolute' }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="currentColor" strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-700"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="currentColor" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="text-violet-500 transition-all duration-700"
        />
      </svg>
      <div className="flex flex-col items-center leading-none">
        <span className="font-bold text-slate-700 dark:text-slate-200" style={{ fontSize: size * 0.2 }}>
          {value}%
        </span>
        <span className="text-slate-400 dark:text-slate-500" style={{ fontSize: size * 0.13 }}>
          완료
        </span>
      </div>
    </div>
  );
}
