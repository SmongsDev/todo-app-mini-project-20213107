export const FILTERS = ['전체', '진행 중', '완료'];

export default function FilterBar({ current, onChange, counts }) {
  return (
    <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`
            flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
            ${
              current === f
                ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }
          `}
        >
          {f}
          {counts[f] > 0 && (
            <span
              className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                current === f
                  ? 'bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              {counts[f]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
