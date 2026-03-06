import type { Message } from '../types';
import { extractLinks } from './linkExtractor';

export const hydrateMessageMetadata = (message: Message): Message => {
  if (!message.text) {
    return message;
  }

  const links = extractLinks(message.text)
    .filter((item) => item.type === 'url')
    .map((item) => ({ url: item.value }));

  if (links.length === 0) {
    return message;
  }

  return {
    ...message,
    metadata: {
      ...message.metadata,
      links,
    },
  };
};
