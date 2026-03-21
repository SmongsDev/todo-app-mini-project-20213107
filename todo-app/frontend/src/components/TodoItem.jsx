import { useState } from 'react';
import DatePicker from './DatePicker';

const PRIORITIES = ['높음', '보통', '낮음'];

const priorityBadge = {
  높음: 'bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400',
  보통: 'bg-amber-100 text-amber-500 dark:bg-amber-900/30 dark:text-amber-400',
  낮음: 'bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400',
};

function getDday(dueDate) {
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));
  if (diff === 0) return { label: 'D-Day', overdue: false, today: true };
  if (diff > 0) return { label: `D-${diff}`, overdue: false, today: false };
  return { label: `D+${Math.abs(diff)}`, overdue: true, today: false };
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const [editPriority, setEditPriority] = useState(todo.priority || '보통');
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
  );
  const [deleting, setDeleting] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editValue.trim()) return;
    onEdit(todo._id, {
      title: editValue.trim(),
      priority: editPriority,
      dueDate: editDueDate || null,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    setDeleting(true);
    onDelete(todo._id);
  };

  const dday = getDday(todo.dueDate);

  return (
    <div
      className={`
        group flex items-center gap-3 px-4 py-3.5
        bg-white dark:bg-slate-800
        border border-slate-100 dark:border-slate-700
        rounded-xl
        transition-all duration-200
        hover:shadow-md hover:border-slate-200 dark:hover:border-slate-600
        animate-slide-in
        ${deleting ? 'opacity-50 scale-95' : ''}
      `}
    >
      {/* 체크박스 */}
      <button
        onClick={() => onToggle(todo._id, !todo.completed)}
        aria-label={todo.completed ? '완료 취소' : '완료로 표시'}
        className={`
          flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${
            todo.completed
              ? 'bg-violet-500 border-violet-500'
              : 'border-slate-300 dark:border-slate-600 hover:border-violet-400'
          }
        `}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
          </svg>
        )}
      </button>

      {/* 텍스트 / 편집 모드 */}
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setIsEditing(false)}
              className="
                flex-1 px-2 py-0.5 rounded-lg border border-violet-400
                bg-white dark:bg-slate-700
                text-slate-800 dark:text-slate-100 text-sm
                focus:outline-none focus:ring-2 focus:ring-violet-500
              "
            />
            <button
              type="submit"
              onMouseDown={(e) => e.preventDefault()}
              className="text-xs px-3 py-1 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              저장
            </button>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setEditPriority(p)}
                  className={`
                    px-2 py-1 rounded-md text-xs font-medium transition-all duration-200
                    ${editPriority === p
                      ? `bg-white dark:bg-slate-600 shadow-sm ${priorityBadge[p]}`
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}
                  `}
                >
                  {p}
                </button>
              ))}
            </div>
            <DatePicker value={editDueDate} onChange={setEditDueDate} />
          </div>
        </form>
      ) : (
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <span
            className={`
              text-sm leading-relaxed select-none break-all
              line-through-animated
              ${todo.completed ? 'done text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}
            `}
          >
            {todo.title}
          </span>
          <div className="flex items-center gap-1.5">
            {/* 우선순위 뱃지 */}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${priorityBadge[todo.priority || '보통']}`}>
              {todo.priority || '보통'}
            </span>
            {/* D-day 뱃지 */}
            {dday && !todo.completed && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  dday.overdue
                    ? 'bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400'
                    : dday.today
                    ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                }`}
              >
                {dday.label}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 액션 버튼 */}
      {!isEditing && (
        <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => { setIsEditing(true); setEditValue(todo.title); }}
            aria-label="수정"
            className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            aria-label="삭제"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h10M6 4V2h4v2M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
