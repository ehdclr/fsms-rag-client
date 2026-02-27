import React, { useState } from 'react';

interface ChatInputProps {
  onSubmit: (msg: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-2 pl-4 transition-all focus-within:ring-2 focus-within:ring-primary/20 dark:bg-slate-800/50 dark:border-slate-700"
      >
        <span className="material-icons-round text-slate-400">psychology</span>
        <input
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-inherit"
          placeholder={
            isLoading ? '답변을 기다리는 중...' : '질문을 입력하세요...'
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-slate-900 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-opacity hover:opacity-90 dark:bg-primary"
          disabled={isLoading}
        >
          <span className="text-sm font-semibold">전송</span>
          <span className="material-icons-round text-sm">send</span>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
