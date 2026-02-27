import React from 'react';
import { useDarkModeStore } from '../../../shared/store/useDarkModeStore';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();

  return (
    <header className="bg-header-light dark:bg-header-dark text-slate-800 dark:text-white h-14 flex items-center px-6 shrink-0 z-20 shadow-sm dark:shadow-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2">
        <span className="material-icons-round text-primary">sensors</span>
        <h1 className="font-bold text-lg tracking-tight">
          FSMS{' '}
          <span className="font-light text-slate-500 dark:text-slate-400 text-sm ml-1">
            IoT Monitoring Chatbot
          </span>
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
          onClick={toggleDarkMode}
        >
          <span className="material-icons-round text-sm text-slate-600 dark:text-slate-300">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <div className="h-6 w-px bg-slate-200 dark:bg-white/20 mx-1" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
            JD
          </div>
          <span className="text-sm font-medium">관리자</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
