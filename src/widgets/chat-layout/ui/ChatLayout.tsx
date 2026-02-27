import React, { type ReactNode } from 'react';

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <section className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 flex flex-col gap-8 chat-scroll">
        {children}
      </div>
    </section>
  );
};

export default ChatLayout;
