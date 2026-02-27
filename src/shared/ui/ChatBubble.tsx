import React from 'react';
import type { RelatedQuestion } from '../../entities/chat/api/chat.api';

interface ChatBubbleProps {
  role: 'user' | 'bot';
  content: string;
  time: string;
  isStreaming?: boolean;
  relatedQuestions?: RelatedQuestion[];
  onRelatedClick?: (question: string) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  content,
  time,
  isStreaming,
  relatedQuestions,
  onRelatedClick,
}) => {
  const isBot = role === 'bot';

  return (
    <div
      className={`flex items-start gap-4 max-w-3xl mb-8 ${
        isBot ? 'self-start' : 'self-end justify-end'
      }`}
    >
      {isBot && (
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-primary overflow-hidden">
          <img src="/sensy.png" alt="Sensy" className="w-full h-full object-cover" />
        </div>
      )}
      <div className={`flex flex-col gap-2 ${!isBot ? 'items-end' : ''}`}>
        <div
          className={`p-4 rounded-2xl break-all ${
            isBot
              ? 'bg-white border border-slate-200 rounded-tl-none shadow-sm dark:bg-slate-800 dark:border-slate-700'
              : 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/20'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {content}
            {isStreaming && (
              <span className="inline-block w-1.5 h-3.5 bg-slate-400 ml-1 animate-blink" />
            )}
          </p>
        </div>
        {isBot && relatedQuestions && relatedQuestions.length > 0 && !isStreaming && (
          <div className="flex flex-col gap-1.5 mt-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider ml-1">
              관련 질문
            </span>
            {relatedQuestions.map((rq, idx) => (
              <button
                key={idx}
                className="text-left text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:border-primary/30 hover:text-primary transition-colors dark:bg-slate-800/40 dark:border-slate-700 dark:text-slate-400 dark:hover:text-primary"
                onClick={() => onRelatedClick?.(rq.question)}
              >
                {rq.question}
              </button>
            ))}
          </div>
        )}
        <span className={`text-[10px] text-slate-400 ${!isBot ? 'mr-1' : 'ml-1'}`}>
          {time}
        </span>
      </div>
      {!isBot && (
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-slate-200 text-slate-500 dark:bg-slate-700">
          <span className="material-icons-round text-sm">person</span>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
