// src/entities/chat/api/chat.api.ts
import { apiClient } from '../../../shared/api/base';

export interface ChatRequest {
  question: string;
  user_id?: string;
  session_id?: string;
}

export interface SuggestionCandidate {
  pattern_id: string;
  pattern_name: string;
  similarity: string;
}

export interface RelatedQuestion {
  pattern_name: string;
  question: string;
}

export interface SuggestionResponse {
  pattern_id: string;
  pattern_name: string;
  category: string;
  questions: string[];
}

export type SseEvent =
  | { type: 'suggestion'; message: string; candidates: SuggestionCandidate[] }
  | { type: 'no_match'; message: string }
  | { type: 'pattern_matched'; pattern_id: string; similarity: string }
  | { type: 'params_extracted'; params: Record<string, string> }
  | { type: 'sql_executed'; result_count: number; execution_time_ms: number }
  | { type: 'answer_chunk'; content: string }
  | { type: 'related_questions'; suggestions: RelatedQuestion[] }
  | { type: 'error'; message: string }
  | { type: 'done'; log_id: string };

export const chatApi = {
  getSuggestions: async (category?: string): Promise<SuggestionResponse[]> => {
    const response = await apiClient.get('/suggestions', {
      params: category ? { category } : undefined,
    });
    return response.data;
  },

  getPatterns: async () => {
    const response = await apiClient.get('/patterns');
    return response.data;
  },

  getLogs: async (params?: { limit?: number; user_id?: string }) => {
    const response = await apiClient.get('/logs', { params });
    return response.data;
  },

  askStream: (
    req: ChatRequest,
    onEvent: (event: SseEvent) => void,
    onDone: () => void,
    onError: (err: unknown) => void,
  ) => {
    const runStream = async () => {
      try {
        const response = await fetch('/api/chat/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: req.question,
            user_id: req.user_id || 'user_001',
            session_id: req.session_id || 'session_001',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        if (!response.body) {
          throw new Error('ReadableStream not supported in this browser.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            onDone();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const matches = buffer.matchAll(
            /event:\s*(.*?)\ndata:\s*(.*?)\n\n/gs,
          );

          let lastIndex = 0;
          for (const match of matches) {
            const [fullStr, eventName, dataStr] = match;
            try {
              const data = JSON.parse(dataStr);
              onEvent({ type: eventName, ...data } as SseEvent);
            } catch {
              console.error('Failed to parse SSE data', dataStr);
            }
            lastIndex = match.index + fullStr.length;
          }
          buffer = buffer.slice(lastIndex);
        }
      } catch (err) {
        onError(err);
      }
    };

    runStream();
  },
};
