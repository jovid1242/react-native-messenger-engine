import type { DateSeparator, Message, MessageGroup } from '../types';
import {
  formatDateSeparator,
  isToday,
  isYesterday,
  shouldShowDateSeparator,
} from './dateFormatter';

export type ChatListItem = Message | DateSeparator | MessageGroup;

const getTimeDiff = (from: Date, to: Date): number => {
  return Math.abs(new Date(to).getTime() - new Date(from).getTime());
};

const createMessageGroup = (messages: Message[]): MessageGroup => {
  const firstMessage = messages[0];
  if (!firstMessage) {
    throw new Error('Cannot create message group from empty list');
  }
  return {
    id: `group-${firstMessage.id}`,
    type: 'message-group',
    userId: firstMessage.sender.id,
    userName: firstMessage.sender.name,
    userAvatar: firstMessage.sender.avatar,
    messages,
    showHeader: true,
    isConsecutive: messages.length > 1,
  };
};

export const groupMessagesBySender = (
  messages: Message[],
  threshold: number = 300000
): ChatListItem[] => {
  const result: ChatListItem[] = [];
  let currentGroup: Message[] = [];
  let lastMessage: Message | null = null;

  messages.forEach((message) => {
    if (shouldShowDateSeparator(message, lastMessage)) {
      if (currentGroup.length > 0) {
        result.push(createMessageGroup(currentGroup));
        currentGroup = [];
      }

      // Inverted list: first item = bottom. Push separator for the day we're LEAVING first
      // (so it appears above that day's messages, e.g. "Today" above "Test"), then for the day we're ENTERING.
      // When lastMessage is null (first message), skip — no separator for first batch; we add it when we leave that day.
      if (lastMessage) {
        const lastDate = new Date(lastMessage.timestamp);
        result.push({
          id: `date-${lastMessage.id}-out`,
          type: 'date-separator',
          date: lastDate,
          formattedDate: formatDateSeparator(lastDate),
          isToday: isToday(lastDate),
          isYesterday: isYesterday(lastDate),
        });
        const date = new Date(message.timestamp);
        result.push({
          id: `date-${message.id}`,
          type: 'date-separator',
          date,
          formattedDate: formatDateSeparator(date),
          isToday: isToday(date),
          isYesterday: isYesterday(date),
        });
      }
    }

    const isSameSender =
      lastMessage?.sender.id === message.sender.id &&
      getTimeDiff(lastMessage.timestamp, message.timestamp) <= threshold;

    if (isSameSender) {
      currentGroup.push(message);
    } else {
      if (currentGroup.length > 0) {
        result.push(createMessageGroup(currentGroup));
      }
      currentGroup = [message];
    }

    lastMessage = message;
  });

  if (currentGroup.length > 0) {
    result.push(createMessageGroup(currentGroup));
  }

  return result;
};
