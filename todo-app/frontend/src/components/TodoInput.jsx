import { useState } from 'react';
import DatePicker from './DatePicker';

const PRIORITIES = ['높음', '보통', '낮음'];

const priorityStyle = {
  높음: 'text-red-500 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700',
  보통: 'text-amber-500 border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700',
  낮음: 'text-green-500 border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700',
};

export default function TodoInput({ onAdd, loading }) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState('보통');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd({ title: value.trim(), priority, dueDate: dueDate || null });
    setValue('');
    setPriority('보통');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="새로운 할 일을 입력하세요..."
          disabled={loading}
          className="
            flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-800
            text-slate-800 dark:text-slate-100
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
            transition-all duration-200
            disabled:opacity-60
          "
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="
            px-5 py-3 rounded-xl font-semibold text-sm
            bg-violet-600 hover:bg-violet-700 active:bg-violet-800
            text-white
            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200
            shadow-sm hover:shadow-md
          "
        >
          추가
        </button>
      </div>

      {/* 우선순위 + 마감일 */}
      <div className="flex gap-2">
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                ${priority === p
                  ? `bg-white dark:bg-slate-700 shadow-sm border ${priorityStyle[p]}`
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}
              `}
            >
              {p}
            </button>
          ))}
        </div>

        <DatePicker value={dueDate} onChange={setDueDate} />
      </div>
    </form>
  );
}
