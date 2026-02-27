import React from 'react';

interface SuggestionListProps {
  onSuggestionClick: (text: string) => void;
}

const tagColors: Record<string, string> = {
  이벤트: 'bg-rose-500',
  배터리: 'bg-amber-500',
  수신율: 'bg-blue-500',
  구조물: 'bg-emerald-600',
  종합: 'bg-indigo-500',
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
    { text: '오늘 현황 요약해줘', tag: '종합' },
  ];

  return (
    <aside className="w-80 border-l border-slate-200 bg-white p-6 flex flex-col dark:border-slate-800 dark:bg-slate-900 max-xl:hidden">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-icons-round text-primary text-lg">auto_awesome</span>
        <h3 className="font-bold text-sm tracking-tight text-slate-800 uppercase dark:text-slate-200">
          추천 질문
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            className="w-full text-left p-4 bg-slate-50 border border-slate-100 rounded-2xl transition-all flex flex-col items-start hover:border-primary/30 hover:bg-primary/5 dark:bg-slate-800/40 dark:border-slate-800 group"
            onClick={() => onSuggestionClick(item.text)}
          >
            <span
              className={`inline-block px-2 py-0.5 rounded text-white text-[9px] font-bold uppercase mb-2 ${tagColors[item.tag]}`}
            >
              {item.tag}
            </span>
            <p className="text-sm font-medium text-slate-700 transition-colors group-hover:text-primary dark:text-slate-300">
              {item.text}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30">
        <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
          <span className="material-icons-round text-lg">lightbulb</span>
          <span className="text-xs font-bold uppercase tracking-wider">Quick Tip</span>
        </div>
        <p className="text-xs text-indigo-700 leading-relaxed dark:text-indigo-300">
          구체적인 날짜나 센서 ID를 포함하면 더 정확한 분석 데이터를 얻을 수
          있습니다.
        </p>
      </div>
    </aside>
  );
};

export default SuggestionList;
