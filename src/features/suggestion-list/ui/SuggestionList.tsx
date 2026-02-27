import React from 'react';

interface SuggestionListProps {
  onSuggestionClick: (text: string) => void;
}

const tagStyles: Record<string, string> = {
  이벤트:
    'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  배터리: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  수신율: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  구조물:
    'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  종합:
    'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
};

const SuggestionList: React.FC<SuggestionListProps> = ({
  onSuggestionClick,
}) => {
  const suggestions = [
    { text: '오늘 이벤트 가장 많은 장치는?', tag: '이벤트' },
    { text: '오늘 알람 있어?', tag: '이벤트' },
    { text: '배터리 부족한 장치 알려줘', tag: '배터리' },
    { text: '오늘 데이터 안 온 장치', tag: '수신율' },
    { text: '균열 발견된 곳 있어?', tag: '구조물' },
    { text: '문제 있는 장치 전부 보여줘', tag: '종합' },
  ];

  return (
    <aside className="w-80 bg-white dark:bg-sidebar-dark border-l border-slate-200 dark:border-slate-800 flex-col hidden xl:flex">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-1">
          추천 질문
        </h2>
        <p className="text-xs text-slate-500">
          자주 묻는 질문을 확인해보세요.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            className="w-full text-left bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onSuggestionClick(item.text)}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${tagStyles[item.tag]}`}
              >
                {item.tag}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
              {item.text}
            </p>
          </button>
        ))}
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">
            분석 엔진
          </span>
          <span className="text-[10px] text-green-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Active
          </span>
        </div>
        <div className="text-[10px] text-slate-500 flex flex-col gap-1">
          <div className="flex justify-between">
            <span>모델 버전</span>
            <span>FS-AI v2.4</span>
          </div>
          <div className="flex justify-between">
            <span>마지막 업데이트</span>
            <span>
              {new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SuggestionList;
