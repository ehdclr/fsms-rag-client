import React, { type ReactNode } from 'react';

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <main className="flex-1 flex flex-col relative overflow-hidden">
      {/* Decorative blur circles */}
      <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 z-10 max-w-5xl mx-auto w-full">
        {children}
      </div>
    </main>
  );
};

export default ChatLayout;
