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

  if (isBot) {
    return (
      <div className="flex gap-4">
        <div className="w-9 h-9 rounded-full shrink-0 border border-primary/20 overflow-hidden">
          <img
            src="/sensy.png"
            alt="Sensy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4 max-w-2xl">
          <div className="glass p-5 rounded-2xl rounded-tl-none shadow-sm text-slate-700 dark:text-slate-200 leading-relaxed border border-slate-200/50 dark:border-slate-700/50">
            <p className="text-sm whitespace-pre-wrap">
              {content}
              {isStreaming && (
                <span className="inline-block w-1.5 h-3.5 bg-slate-400 ml-1 animate-blink" />
              )}
            </p>
          </div>
          {relatedQuestions && relatedQuestions.length > 0 && !isStreaming && (
            <div className="flex flex-wrap gap-2">
              {relatedQuestions.map((rq, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary rounded-full text-xs font-medium transition-all text-slate-600 dark:text-slate-300 shadow-sm"
                  onClick={() => onRelatedClick?.(rq.question)}
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {rq.question}
                </button>
              ))}
            </div>
          )}
          <span className="text-[10px] text-slate-400 ml-1">{time}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row-reverse gap-4">
      <div className="w-9 h-9 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 shrink-0 border border-slate-200 dark:border-slate-600">
        <span className="material-icons-round">person</span>
      </div>
      <div className="space-y-2 flex flex-col items-end">
        <div className="p-5 rounded-2xl rounded-tr-none shadow-sm text-slate-800 dark:text-slate-100 leading-relaxed border border-primary/15 dark:border-slate-700/50 max-w-2xl bg-primary-light dark:bg-slate-800/50">
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        <span className="text-[10px] text-slate-400 mr-1">{time}</span>
      </div>
    </div>
  );
};

export default ChatBubble;
