import { memo, useMemo } from 'react';
import type { ReactElement } from 'react';
import { FlashList } from '@shopify/flash-list';
import type {
  DateSeparatorRenderProps,
  Message,
  MessageRenderProps,
  MessengerTheme,
  User,
} from '../../types';
import type { ChatListItem } from '../../utils/messageGrouper';
import { groupMessagesBySender } from '../../utils/messageGrouper';
import { DateSeparator } from './DateSeparator';
import { MessageGroup } from './MessageGroup';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: Message[];
  currentUser: User;
  onLoadMore?: () => Promise<Message[]>;
  renderMessage?: (props: MessageRenderProps) => React.ReactNode;
  renderDateSeparator?: (props: DateSeparatorRenderProps) => React.ReactNode;
  groupByUser?: boolean;
  groupThreshold?: number;
  timeFormat?: '12h' | '24h';
  theme?: MessengerTheme;
  /** When false (1-on-1 chat), do not show sender name/avatar above messages */
  isGroup?: boolean;
}

export const MessageList = memo<MessageListProps>(
  ({
    messages,
    currentUser,
    onLoadMore,
    renderMessage,
    renderDateSeparator,
    groupByUser = true,
    groupThreshold = 300000,
    timeFormat = '24h',
    theme,
    isGroup = true,
  }) => {
    const data = useMemo<ChatListItem[]>(() => {
      if (!groupByUser) {
        return messages;
      }

      return groupMessagesBySender(messages, groupThreshold);
    }, [messages, groupByUser, groupThreshold]);

    const renderItem = ({
      item,
    }: {
      item: ChatListItem;
    }): ReactElement | null => {
      if ('type' in item && item.type === 'date-separator') {
        return renderDateSeparator ? (
          <>{renderDateSeparator(item)}</>
        ) : (
          <DateSeparator formattedDate={item.formattedDate} theme={theme} />
        );
      }

      if ('type' in item && item.type === 'message-group') {
        return (
          <MessageGroup
            group={item}
            currentUserId={currentUser.id}
            isGroup={isGroup}
            theme={theme}
            timeFormat={timeFormat}
            renderMessage={(message, isCurrentUser) =>
              renderMessage?.({
                message,
                isCurrentUser,
              }) ?? null
            }
          />
        );
      }

      const isCurrentUser = item.sender.id === currentUser.id;
      if (renderMessage) {
        return <>{renderMessage({ message: item, isCurrentUser })}</>;
      }

      return (
        <MessageItem
          isCurrentUser={isCurrentUser}
          message={item}
          theme={theme}
          timeFormat={timeFormat}
        />
      );
    };

    return (
      <FlashList
        data={data}
        inverted
        keyExtractor={(item) => item.id}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.35}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  }
);
