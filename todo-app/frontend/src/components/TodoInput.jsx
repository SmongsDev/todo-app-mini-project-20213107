import { useState } from 'react';

export default function TodoInput({ onAdd, loading }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
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
        disabled={!value.trim() || loading}
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
    </form>
  );
}
