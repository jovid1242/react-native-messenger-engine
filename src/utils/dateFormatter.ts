import type { Message } from '../types';

export const isToday = (date: Date): boolean => {
  const now = new Date();
  return date.toDateString() === now.toDateString();
};

export const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export const formatDateSeparator = (date: Date): string => {
  if (isToday(date)) {
    return 'Today';
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

export const shouldShowDateSeparator = (
  currentMessage: Message,
  previousMessage: Message | null
): boolean => {
  if (!previousMessage) {
    return true;
  }

  return (
    new Date(currentMessage.timestamp).toDateString() !==
    new Date(previousMessage.timestamp).toDateString()
  );
};

export const formatMessageTime = (
  date: Date,
  mode: '12h' | '24h' = '24h'
): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: mode === '12h',
  });
};
