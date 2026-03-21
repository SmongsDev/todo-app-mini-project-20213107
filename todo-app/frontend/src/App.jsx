import { useState, useEffect, useCallback } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, clearCompleted } from './api';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('전체');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // 다크모드 적용
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // 목록 불러오기
  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const { data } = await getTodos();
      setTodos(data);
    } catch {
      setError('서버에 연결할 수 없습니다. 백엔드가 실행 중인지 확인하세요.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  // Todo 추가
  const handleAdd = async (todoData) => {
    try {
      const { data } = await createTodo(todoData);
      setTodos((prev) => [data, ...prev]);
    } catch {
      setError('추가에 실패했습니다.');
    }
  };

  // 완료 토글
  const handleToggle = async (id, completed) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed } : t))
    );
    try {
      await updateTodo(id, { completed });
    } catch {
      fetchTodos(); // 실패 시 서버 상태로 롤백
    }
  };

  // 제목/우선순위/마감일 수정
  const handleEdit = async (id, fields) => {
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, ...fields } : t))
    );
    try {
      await updateTodo(id, fields);
    } catch {
      fetchTodos();
    }
  };

  // 삭제
  const handleDelete = async (id) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await deleteTodo(id);
    } catch {
      fetchTodos();
    }
  };

  // 완료 항목 전체 삭제
  const handleClearCompleted = async () => {
    const prev = todos;
    setTodos((t) => t.filter((item) => !item.completed));
    try {
      await clearCompleted();
    } catch {
      setTodos(prev);
    }
  };

  // 필터된 목록
  const filtered = todos.filter((t) => {
    if (filter === '진행 중') return !t.completed;
    if (filter === '완료') return t.completed;
    return true;
  });

  // 필터별 카운트
  const counts = {
    전체: todos.length,
    '진행 중': todos.filter((t) => !t.completed).length,
    완료: todos.filter((t) => t.completed).length,
  };

  const completedCount = counts['완료'];
  const progress = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              할 일 목록
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {todos.length > 0
                ? `총 ${todos.length}개 중 ${completedCount}개 완료`
                : '새로운 할 일을 추가하세요'}
            </p>
          </div>
          <button
            onClick={() => setDarkMode((d) => !d)}
            aria-label="다크모드 토글"
            className="
              p-2.5 rounded-xl border border-slate-200 dark:border-slate-700
              bg-white dark:bg-slate-800
              text-slate-500 dark:text-slate-400
              hover:bg-slate-50 dark:hover:bg-slate-700
              transition-all duration-200 shadow-sm
            "
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        {/* 진행률 바 */}
        {todos.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              <span>진행률</span>
              <span className="font-semibold text-violet-600 dark:text-violet-400">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* 입력 폼 */}
        <div className="mb-4">
          <TodoInput onAdd={handleAdd} loading={loading} />
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2 animate-fade-in">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {/* 필터 탭 */}
        <div className="mb-4">
          <FilterBar current={filter} onChange={setFilter} counts={counts} />
        </div>

        {/* Todo 목록 */}
        <div className="space-y-2">
          {loading ? (
            /* 스켈레톤 로딩 */
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-14 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 animate-pulse"
              />
            ))
          ) : filtered.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            filtered.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>

        {/* 하단 액션 */}
        {completedCount > 0 && (
          <div className="mt-5 flex justify-end animate-fade-in">
            <button
              onClick={handleClearCompleted}
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              완료된 항목 모두 삭제 ({completedCount}개)
            </button>
          </div>
        )}

        {/* 푸터 */}
        <p className="text-center text-xs text-slate-300 dark:text-slate-700 mt-12">
          Todo App · React + Express + MongoDB
        </p>
      </div>
    </div>
  );
}
