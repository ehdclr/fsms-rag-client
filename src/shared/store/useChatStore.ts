import { create } from 'zustand';
import { chatApi } from '../../entities/chat/api/chat.api';
import type {
  ChatRequest,
  SseEvent,
  RelatedQuestion,
} from '../../entities/chat/api/chat.api';

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  relatedQuestions?: RelatedQuestion[];
}

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (text: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,

  sendMessage: (text: string) => {
    if (!text.trim() || get().isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const botMessageId = (Date.now() + 1).toString();
    const botMessage: ChatMessage = {
      id: botMessageId,
      role: 'bot',
      content: '',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isStreaming: true,
    };

    set((state) => ({
      messages: [...state.messages, userMessage, botMessage],
      isLoading: true,
    }));

    const req: ChatRequest = { question: text };

    const updateBotMessage = (
      updater: (msg: ChatMessage) => ChatMessage,
    ) => {
      set((state) => ({
        messages: state.messages.map((m) =>
          m.id === botMessageId ? updater(m) : m,
        ),
      }));
    };

    chatApi.askStream(
      req,
      (event: SseEvent) => {
        switch (event.type) {
          case 'answer_chunk':
            updateBotMessage((m) => ({
              ...m,
              content: m.content + event.content,
            }));
            break;

          case 'suggestion':
            updateBotMessage((m) => ({
              ...m,
              content:
                event.message +
                '\n\n' +
                event.candidates
                  .map((c) => `- ${c.pattern_name}`)
                  .join('\n'),
            }));
            break;

          case 'no_match':
            updateBotMessage((m) => ({
              ...m,
              content: event.message,
            }));
            break;

          case 'related_questions':
            updateBotMessage((m) => ({
              ...m,
              relatedQuestions: event.suggestions,
            }));
            break;

          case 'error':
            updateBotMessage((m) => ({
              ...m,
              content: `오류: ${event.message}`,
              isStreaming: false,
            }));
            break;

          case 'done':
            updateBotMessage((m) => ({
              ...m,
              isStreaming: false,
            }));
            set({ isLoading: false });
            break;
        }
      },
      () => {
        // Stream closed - ensure state is clean
        updateBotMessage((m) => ({
          ...m,
          isStreaming: false,
        }));
        set({ isLoading: false });
      },
      (err) => {
        console.error('Chat stream error', err);
        updateBotMessage((m) => ({
          ...m,
          isStreaming: false,
          content: '서버와 연결할 수 없습니다.',
        }));
        set({ isLoading: false });
      },
    );
  },
}));
