import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const [deleting, setDeleting] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editValue.trim()) return;
    onEdit(todo._id, editValue.trim());
    setIsEditing(false);
  };

  const handleDelete = () => {
    setDeleting(true);
    onDelete(todo._id);
  };

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
        <form onSubmit={handleEditSubmit} className="flex-1 flex gap-2">
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
            className="
              flex-1 px-2 py-0.5 rounded-lg border border-violet-400
              bg-white dark:bg-slate-700
              text-slate-800 dark:text-slate-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-violet-500
            "
          />
          <button
            type="submit"
            className="text-xs px-3 py-1 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            저장
          </button>
        </form>
      ) : (
        <span
          className={`
            flex-1 text-sm leading-relaxed select-none
            line-through-animated
            ${todo.completed ? 'done text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}
          `}
        >
          {todo.title}
        </span>
      )}

      {/* 액션 버튼 (hover 시 표시) */}
      {!isEditing && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
