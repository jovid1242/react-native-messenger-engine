import { useCallback, useState } from 'react';
import type { ReplyInfo } from '../types';

export const useReply = () => {
  const [replyTo, setReplyTo] = useState<ReplyInfo | undefined>(undefined);

  const clearReply = useCallback(() => {
    setReplyTo(undefined);
  }, []);

  return {
    replyTo,
    setReplyTo,
    clearReply,
  };
};
