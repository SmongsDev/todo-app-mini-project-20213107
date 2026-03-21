export default function EmptyState({ filter }) {
  const messages = {
    '전체': { icon: '📋', text: '할 일을 추가해보세요!' },
    '진행 중': { icon: '✅', text: '모든 할 일을 완료했어요!' },
    '완료': { icon: '🎯', text: '아직 완료된 항목이 없어요' },
  };
  const { icon, text } = messages[filter] || messages['전체'];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-600 animate-fade-in">
      <span className="text-5xl mb-4">{icon}</span>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
