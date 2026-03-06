import { memo, useMemo } from 'react';
import type { ReactElement } from 'react';
import { FlashList } from '@shopify/flash-list';
import type {
  DateSeparatorRenderProps,
  Message,
  MessageRenderProps,
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
          <DateSeparator formattedDate={item.formattedDate} />
        );
      }

      if ('type' in item && item.type === 'message-group') {
        return (
          <MessageGroup
            group={item}
            currentUserId={currentUser.id}
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
      />
    );
  }
);
