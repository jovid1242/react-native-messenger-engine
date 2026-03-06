import { useMemo } from 'react';
import { extractLinks } from '../utils/linkExtractor';

export const useLinkDetection = (text?: string) => {
  return useMemo(() => {
    if (!text) {
      return [];
    }
    return extractLinks(text);
  }, [text]);
};
