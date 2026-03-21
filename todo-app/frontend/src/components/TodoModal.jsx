import { useState, useEffect } from 'react';
import DatePicker from './DatePicker';

const PRIORITIES = ['높음', '보통', '낮음'];

const priorityStyle = {
  높음: 'text-red-500 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700',
  보통: 'text-amber-500 border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700',
  낮음: 'text-green-500 border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700',
};

export default function TodoModal({ onAdd, onClose }) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState('보통');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd({ title: value.trim(), priority, dueDate: dueDate || null });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full sm:max-w-md bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 animate-slide-up">
        {/* 핸들 (모바일) */}
        <div className="w-10 h-1 bg-slate-200 dark:bg-slate-600 rounded-full mx-auto mb-5 sm:hidden" />

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">새 할 일</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            autoFocus
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="무엇을 해야 하나요?"
            className="
              w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700
              bg-slate-50 dark:bg-slate-700/50
              text-slate-800 dark:text-slate-100
              placeholder:text-slate-400 dark:placeholder:text-slate-500
              focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
              transition-all duration-200 text-sm
            "
          />

          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">우선순위</p>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`
                    flex-1 py-2 rounded-xl text-xs font-medium border transition-all duration-200
                    ${priority === p
                      ? priorityStyle[p]
                      : 'text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}
                  `}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">마감일</p>
            <DatePicker value={dueDate} onChange={setDueDate} />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!value.trim()}
              className="
                flex-1 py-3 rounded-xl text-sm font-semibold
                bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200 shadow-sm
              "
            >
              추가하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
