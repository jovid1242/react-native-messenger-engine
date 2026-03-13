import type { Locale } from 'date-fns';
import type { DateSeparator, Message, MessageGroup } from '../types';
import {
  formatDateSeparator,
  isToday,
  isYesterday,
  shouldShowDateSeparator,
} from './dateFormatter';

export type ChatListItem = Message | DateSeparator | MessageGroup;

/**
 * Возвращает индекс элемента в списке чата, в котором находится сообщение с указанным id
 * (для scrollToIndex при переходе по реплаю).
 */
export function findIndexForMessageId(
  data: ChatListItem[],
  messageId: string
): number {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (!item) continue;
    if (item.type === 'message-group') {
      if (item.messages.some((m: Message) => m.id === messageId)) return i;
    }
    if (item.type !== 'date-separator' && 'sender' in item && item.id === messageId) {
      return i;
    }
  }
  return 0;
}

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
  threshold: number = 300000,
  dateSeparatorLocale?: Locale
): ChatListItem[] => {
  const result: ChatListItem[] = [];
  let currentGroup: Message[] = [];
  let lastMessage: Message | null = null;

  const formatDate = (d: Date) => formatDateSeparator(d, dateSeparatorLocale);

  messages.forEach((message) => {
    if (shouldShowDateSeparator(message, lastMessage)) {
      if (currentGroup.length > 0) {
        result.push(createMessageGroup(currentGroup));
        currentGroup = [];
      }

      // Inverted list: data[0] = bottom. So separator must come AFTER the day's groups to appear above them.
      // Push separator for the day we're LEAVING (lastMessage's day), so it renders above that day's messages.
      if (lastMessage) {
        const lastDate = new Date(lastMessage.timestamp);
        result.push({
          id: `date-${lastMessage.id}`,
          type: 'date-separator',
          date: lastDate,
          formattedDate: formatDate(lastDate),
          isToday: isToday(lastDate),
          isYesterday: isYesterday(lastDate),
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

  // Oldest day separator (no "next day" to trigger it in the loop)
  const oldestMessage = messages[messages.length - 1];
  if (oldestMessage) {
    const lastDate = new Date(oldestMessage.timestamp);
    result.push({
      id: `date-${oldestMessage.id}-oldest`,
      type: 'date-separator',
      date: lastDate,
      formattedDate: formatDate(lastDate),
      isToday: isToday(lastDate),
      isYesterday: isYesterday(lastDate),
    });
  }

  return result;
};
