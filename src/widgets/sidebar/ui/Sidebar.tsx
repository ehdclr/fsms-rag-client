import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-slate-200 flex flex-col p-4 bg-bg-light dark:border-slate-800 dark:bg-bg-dark max-lg:w-20 max-md:hidden">
      <button className="flex items-center gap-3 w-full p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 mb-8 lg:justify-start max-lg:justify-center">
        <span className="material-icons-round">add</span>
        <span className="font-medium max-lg:hidden">New Chat</span>
      </button>

      <nav className="flex flex-col gap-2 flex-1">
        <div className="px-3 mb-2 max-lg:hidden">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Recent Sessions
          </span>
        </div>
        <a
          href="#"
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 text-primary font-medium dark:bg-slate-800"
        >
          <span className="material-icons-round text-[20px]">chat_bubble_outline</span>
          <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis max-lg:hidden">
            Sensor Status Analysis
          </span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors dark:text-slate-400 dark:hover:bg-slate-800/50"
        >
          <span className="material-icons-round text-[20px]">history</span>
          <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis max-lg:hidden">
            Event Log History
          </span>
        </a>
      </nav>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <a
          href="#"
          className="flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors dark:text-slate-400 dark:hover:bg-slate-800/50"
        >
          <span className="material-icons-round text-[20px]">settings</span>
          <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis max-lg:hidden">
            Settings
          </span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
