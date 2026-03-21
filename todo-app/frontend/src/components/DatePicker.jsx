import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addMonths, subMonths, setMonth, setYear } from 'date-fns';
import { ko } from 'date-fns/locale';

const YEARS = Array.from({ length: 11 }, (_, i) => 2020 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

function CustomSelect({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-0.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
      >
        {selected?.label}
        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="
          absolute top-full left-1/2 -translate-x-1/2 mt-1 z-[60]
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-600
          rounded-xl shadow-xl
          max-h-48 overflow-y-auto scrollbar-hide
          py-1 min-w-[5rem]
        ">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={`
                w-full text-center px-3 py-1.5 text-sm whitespace-nowrap transition-colors
                ${o.value === value
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400'}
              `}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Caption({ currentMonth, onMonthChange }) {
  const yearOptions = YEARS.map((y) => ({ value: y, label: `${y}년` }));
  const monthOptions = MONTHS.map((m, i) => ({ value: i, label: m }));

  return (
    <div className="flex items-center justify-center gap-1 mb-3">
      <button
        type="button"
        onClick={() => onMonthChange(subMonths(currentMonth, 1))}
        className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <CustomSelect
        value={currentMonth.getFullYear()}
        options={yearOptions}
        onChange={(y) => onMonthChange(setYear(currentMonth, y))}
      />
      <CustomSelect
        value={currentMonth.getMonth()}
        options={monthOptions}
        onChange={(m) => onMonthChange(setMonth(currentMonth, m))}
      />

      <button
        type="button"
        onClick={() => onMonthChange(addMonths(currentMonth, 1))}
        className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default function DatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const ref = useRef(null);

  const selected = value ? new Date(value + 'T00:00:00') : undefined;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (date) => {
    if (date) onChange(format(date, 'yyyy-MM-dd'));
    setOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="relative flex-1" ref={ref}>
      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm
          border transition-all duration-200
          ${open
            ? 'border-violet-500 ring-2 ring-violet-500/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-violet-400'}
          bg-white dark:bg-slate-800
          text-left
        `}
      >
        <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={selected ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}>
          {selected ? format(selected, 'M월 d일 (EEE)', { locale: ko }) : '날짜 선택'}
        </span>
        {selected && (
          <button
            type="button"
            onClick={handleClear}
            className="ml-auto text-slate-300 hover:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            ✕
          </button>
        )}
      </button>

      {/* 달력 팝오버 */}
      {open && (
        <div className="
          absolute z-[9999] mt-2 right-0
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          rounded-2xl shadow-xl
          p-3
        ">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            locale={ko}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            hideNavigation
            components={{
              MonthCaption: () => (
                <Caption currentMonth={currentMonth} onMonthChange={setCurrentMonth} />
              ),
            }}
            classNames={{
              root: 'text-sm',
              month_caption: '',
              month_grid: 'w-full border-collapse',
              weekday: 'text-center text-xs font-medium text-slate-400 dark:text-slate-500 pb-2 w-9',
              day: 'p-0 text-center',
              day_button: `
                w-9 h-9 rounded-xl text-sm font-medium
                text-slate-700 dark:text-slate-200
                hover:bg-violet-50 dark:hover:bg-violet-900/30
                hover:text-violet-600 dark:hover:text-violet-400
                transition-all duration-150 focus:outline-none
              `,
              selected: '!bg-violet-600 !text-white hover:!bg-violet-700 rounded-xl',
              today: 'text-violet-600 dark:text-violet-400 font-bold',
              outside: 'text-slate-300 dark:text-slate-600',
              disabled: 'text-slate-200 dark:text-slate-700 cursor-not-allowed',
            }}
          />
        </div>
      )}
    </div>
  );
}
