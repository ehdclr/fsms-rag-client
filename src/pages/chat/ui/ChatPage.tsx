import React, { useRef, useEffect } from 'react';
import ChatLayout from '../../../widgets/chat-layout/ui/ChatLayout';
import Sidebar from '../../../widgets/sidebar/ui/Sidebar';
import Header from '../../../widgets/header/ui/Header';
import ChatInput from '../../../features/chat-input/ui/ChatInput';
import SuggestionList from '../../../features/suggestion-list/ui/SuggestionList';
import { useChatStore } from '../../../shared/store/useChatStore';
import type { ChatMessage } from '../../../shared/store/useChatStore';
import ChatBubble from '../../../shared/ui/ChatBubble';

const welcomeSuggestions = [
  { text: '오늘 이벤트 가장 많은 장치는?', color: 'bg-red-500' },
  { text: '배터리 부족한 장치 알려줘', color: 'bg-amber-500' },
  { text: '오늘 데이터 안 온 장치', color: 'bg-blue-500' },
  { text: '오늘 현황 요약해줘', color: 'bg-slate-400' },
];

const ChatPage: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChatStore();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <ChatLayout>
          {messages.length === 0 ? (
            <>
              {/* Welcome message */}
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
                    <p className="mb-3 font-medium text-slate-900 dark:text-white">
                      안녕하세요! FSMS 센서 모니터링 챗봇입니다.
                    </p>
                    <p>
                      실시간으로 수집되는 센서 상태, 이벤트, 알람 정보를 분석해
                      드립니다. 궁금하신 내용을 질문해보세요.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {welcomeSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary rounded-full text-xs font-medium transition-all text-slate-600 dark:text-slate-300 shadow-sm"
                        onClick={() => sendMessage(item.text)}
                      >
                        <span
                          className={`w-1.5 h-1.5 ${item.color} rounded-full`}
                        />
                        {item.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {messages.map((msg: ChatMessage) => (
                <ChatBubble
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  time={msg.timestamp}
                  isStreaming={msg.isStreaming}
                  relatedQuestions={msg.relatedQuestions}
                  onRelatedClick={sendMessage}
                />
              ))}
              <div ref={endOfMessagesRef} />
            </>
          )}
        </ChatLayout>
        <SuggestionList onSuggestionClick={sendMessage} />
      </div>
      <div className="p-6 pt-2 z-10 bg-bg-light dark:bg-bg-dark">
        <ChatInput onSubmit={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatPage;
