import {
  format,
  formatRelative,
  isSameDay,
  isToday,
  isYesterday,
} from 'date-fns';
import type { Locale } from 'date-fns';
import type { Message } from '../types';

export { isToday, isYesterday };

/** Извлекает "today"/"yesterday" из результата formatRelative (до " at "/" в "/" um " и т.д.) */
function getRelativeDayLabel(date: Date, baseDate: Date, locale?: Locale): string {
  const full = formatRelative(date, baseDate, { locale });
  const part = full.split(/\s+at\s+|\s+в\s+|\s+um\s+|\s+à\s+|\s+o\s+/i)[0]?.trim();
  return part ?? full;
}

export const formatDateSeparator = (date: Date, locale?: Locale): string => {
  const baseDate = new Date();
  if (isToday(date)) {
    return locale ? getRelativeDayLabel(date, baseDate, locale) : 'Today';
  }
  if (isYesterday(date)) {
    return locale ? getRelativeDayLabel(date, baseDate, locale) : 'Yesterday';
  }
  return format(date, 'EEE, d MMM', locale ? { locale } : undefined);
};

export const shouldShowDateSeparator = (
  currentMessage: Message,
  previousMessage: Message | null
): boolean => {
  if (!previousMessage) {
    return true;
  }
  return !isSameDay(
    new Date(currentMessage.timestamp),
    new Date(previousMessage.timestamp)
  );
};

export const formatMessageTime = (
  date: Date,
  mode: '12h' | '24h' = '24h'
): string => {
  return format(date, mode === '12h' ? 'h:mm a' : 'HH:mm');
};
