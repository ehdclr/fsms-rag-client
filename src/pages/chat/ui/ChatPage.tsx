import React, { useRef, useEffect } from 'react';
import ChatLayout from '../../../widgets/chat-layout/ui/ChatLayout';
import Sidebar from '../../../widgets/sidebar/ui/Sidebar';
import Header from '../../../widgets/header/ui/Header';
import ChatInput from '../../../features/chat-input/ui/ChatInput';
import SuggestionList from '../../../features/suggestion-list/ui/SuggestionList';
import { useChatStore } from '../../../shared/store/useChatStore';
import type { ChatMessage } from '../../../shared/store/useChatStore';
import ChatBubble from '../../../shared/ui/ChatBubble';

const ChatPage: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChatStore();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestionClick = (suggestionText: string) => {
    sendMessage(suggestionText);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <Sidebar />
        <ChatLayout>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center py-10">
              <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mb-6 border border-amber-100 overflow-hidden dark:bg-amber-900/20 dark:border-amber-900/30">
                <img src="/sensy.png" alt="Sensy" className="w-full h-full object-cover" />
              </div>
              <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl dark:bg-amber-900/10 dark:border-amber-900/20">
                <p className="text-amber-800 font-medium leading-relaxed dark:text-amber-200">
                  FSMS 센서 모니터링 챗봇입니다. <br />
                  센서 상태, 이벤트, 알람 등을 질문해보세요.
                </p>
              </div>
            </div>
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
        <SuggestionList onSuggestionClick={handleSuggestionClick} />
      </main>
      <div className="p-6 bg-white border-t border-slate-200 z-10 dark:bg-slate-900 dark:border-slate-800">
        <ChatInput onSubmit={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatPage;
