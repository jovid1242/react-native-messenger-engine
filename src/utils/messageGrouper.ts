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
