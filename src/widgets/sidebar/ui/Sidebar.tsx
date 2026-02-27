import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-72 bg-white dark:bg-sidebar-dark border-r border-slate-200 dark:border-slate-800 flex-col hidden lg:flex">
      <div className="p-4">
        <button className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
          <span className="material-icons-round text-sm">add</span>
          새 대화 시작
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-6">
        <div>
          <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
            오늘의 기록
          </h3>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 bg-primary-light dark:bg-slate-800 rounded-lg text-sm font-medium text-primary dark:text-slate-100"
            >
              <span className="material-icons-round text-slate-500 text-sm">
                chat_bubble_outline
              </span>
              <span className="truncate">센서 배터리 상태 점검</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm transition-colors text-slate-600 dark:text-slate-400"
            >
              <span className="material-icons-round text-slate-500 text-sm">
                chat_bubble_outline
              </span>
              <span className="truncate">이상 진동 구역 분석</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
            어제
          </h3>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm transition-colors text-slate-600 dark:text-slate-400"
            >
              <span className="material-icons-round text-slate-500 text-sm">
                history
              </span>
              <span className="truncate">균열 발생 위치 리스트</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
            모니터링 자산
          </h3>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500">
              <span className="material-icons-round text-green-500 text-[8px]">
                circle
              </span>
              <span>A-01 교량 센서군</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500">
              <span className="material-icons-round text-green-500 text-[8px]">
                circle
              </span>
              <span>B-04 터널 계측기</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500">
              <span className="material-icons-round text-red-500 text-[8px]">
                circle
              </span>
              <span>C-12 옹벽 센서</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-icons-round text-blue-500 text-sm">
              info
            </span>
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              시스템 상태
            </span>
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-500">
            모든 센서가 정상적으로 데이터를 수집 중입니다.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
