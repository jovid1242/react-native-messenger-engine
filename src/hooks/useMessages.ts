import { useMemo } from 'react';
import type { Message } from '../types';
import { hydrateMessageMetadata } from '../utils/messageParser';

export const useMessages = (messages: Message[]) => {
  return useMemo(() => {
    return messages
      .map((message) => ({
        ...message,
        timestamp: new Date(message.timestamp),
      }))
      .map(hydrateMessageMetadata);
  }, [messages]);
};
