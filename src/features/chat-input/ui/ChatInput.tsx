import React, { useState, useRef, useCallback } from 'react';

interface ChatInputProps {
  onSubmit: (msg: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = '0';
      el.style.height = el.scrollHeight + 'px';
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    onSubmit(inputValue);
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="z-10 max-w-5xl mx-auto w-full">
      <div className="glass border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-lg dark:shadow-xl p-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <form className="flex items-end gap-2" onSubmit={handleSubmit}>
          <div className="flex-1 flex flex-col">
            <textarea
              ref={textareaRef}
              className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 resize-none py-3 px-4 custom-scrollbar text-sm"
              placeholder={
                isLoading
                  ? '답변을 기다리는 중...'
                  : '모니터링 질문을 입력하세요...'
              }
              rows={1}
              style={{ maxHeight: '200px' }}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                autoResize();
              }}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2 p-1">
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <span className="material-icons-round">attach_file</span>
            </button>
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <span className="material-icons-round">mic</span>
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md shadow-primary/30"
              disabled={isLoading}
            >
              <span className="material-icons-round">send</span>
            </button>
          </div>
        </form>
      </div>
      <p className="text-[10px] text-center text-slate-400 mt-3 dark:text-slate-500">
        FSMS IoT AI는 데이터를 기반으로 답변하며 분석 결과에 차이가 있을 수
        있습니다.
      </p>
    </div>
  );
};

export default ChatInput;
