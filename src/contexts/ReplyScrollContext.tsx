import { createContext, useCallback, useContext, useState } from 'react';

interface ReplyScrollContextValue {
  onReplyPress: (messageId: string) => void;
  highlightedMessageId: string | null;
}

const ReplyScrollContext = createContext<ReplyScrollContextValue | null>(null);

export function useReplyScroll() {
  const ctx = useContext(ReplyScrollContext);
  return ctx;
}

const HIGHLIGHT_DURATION_MS = 2000;

export interface ReplyScrollProviderProps {
  children: React.ReactNode;
  onScrollToMessage: (messageId: string) => void;
}

export function ReplyScrollProvider({
  children,
  onScrollToMessage,
}: ReplyScrollProviderProps) {
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(
    null
  );

  const onReplyPress = useCallback(
    (messageId: string) => {
      onScrollToMessage(messageId);
      setHighlightedMessageId(messageId);
      setTimeout(() => {
        setHighlightedMessageId(null);
      }, HIGHLIGHT_DURATION_MS);
    },
    [onScrollToMessage]
  );

  return (
    <ReplyScrollContext.Provider
      value={{ onReplyPress, highlightedMessageId }}
    >
      {children}
    </ReplyScrollContext.Provider>
  );
}
