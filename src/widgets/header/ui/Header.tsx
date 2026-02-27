import React from 'react';
import { useDarkModeStore } from '../../../shared/store/useDarkModeStore';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <span className="material-icons-round text-primary">sensors</span>
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100">
            FSMS <span className="text-slate-500 font-medium dark:text-slate-400">IoT Sensor Chatbot</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
            High-Risk Facility Management
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors dark:text-slate-400 dark:hover:bg-slate-800"
          onClick={toggleDarkMode}
        >
          <span className="material-icons-round">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center dark:bg-slate-700">
            <span className="material-icons-round text-sm text-slate-500">person</span>
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
