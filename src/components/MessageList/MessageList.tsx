import { memo, useCallback, useMemo, useRef, useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { FlashList, type FlashListRef } from '@shopify/flash-list';
import type {
  DateSeparatorRenderProps,
  Message,
  MessageRenderProps,
  MessengerTheme,
  User,
} from '../../types';
import { ChevronDownIcon } from '../../assets/icons/ChevronDownIcon';
import { ReplyScrollProvider } from '../../contexts/ReplyScrollContext';
import type { ChatListItem } from '../../utils/messageGrouper';
import { findIndexForMessageId, groupMessagesBySender } from '../../utils/messageGrouper';
import { DateSeparator } from './DateSeparator';
import { MessageGroup } from './MessageGroup';
import { MessageItem } from './MessageItem';

export interface ScrollToBottomButtonRenderProps {
  onPress: () => void;
  visible: boolean;
}

interface MessageListProps {
  messages: Message[];
  currentUser: User;
  onLoadMore?: () => Promise<Message[]>;
  onMentionPress?: (username: string) => void;
  onLinkPress?: (url: string) => void;
  onEmailPress?: (email: string) => void;
  onPhonePress?: (phone: string) => void;
  onRequestMessageContextMenu?: (
    message: Message,
    position: { x: number; y: number; width: number; height: number },
    isCurrentUser?: boolean
  ) => void;
  renderMessage?: (props: MessageRenderProps) => React.ReactNode;
  renderDateSeparator?: (props: DateSeparatorRenderProps) => React.ReactNode;
  groupByUser?: boolean;
  groupThreshold?: number;
  timeFormat?: '12h' | '24h';
  theme?: MessengerTheme;
  disableReactions?: boolean;
  /** When false (1-on-1 chat), do not show sender name/avatar above messages */
  isGroup?: boolean;
  /** Locale for date separator (e.g. ru from 'date-fns/locale'). Uses date-fns for translation. */
  dateSeparatorLocale?: import('date-fns').Locale;
  /** Порог скролла (px): кнопка "вниз" показывается, когда пользователь проскроллил выше этого значения. По умолчанию 300. */
  scrollToBottomThreshold?: number;
  /** Кастомная кнопка "scroll to bottom". Если не передана, используется кнопка с ChevronDownIcon. */
  renderScrollToBottomButton?: (props: ScrollToBottomButtonRenderProps) => React.ReactNode;
}

export const MessageList = memo<MessageListProps>(
  ({
    messages,
    currentUser,
    onLoadMore,
    onMentionPress,
    onLinkPress,
    onEmailPress,
    onPhonePress,
    onRequestMessageContextMenu,
    renderMessage,
    renderDateSeparator,
    groupByUser = true,
    groupThreshold = 300000,
    timeFormat = '24h',
    theme,
    disableReactions,
    isGroup = true,
    dateSeparatorLocale,
    scrollToBottomThreshold = 300,
    renderScrollToBottomButton,
  }) => {
    const listRef = useRef<FlashListRef<ChatListItem> | null>(null);
    const prevMessagesLengthRef = useRef(messages.length);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);

    const data = useMemo<ChatListItem[]>(() => {
      if (!groupByUser) {
        return messages;
      }

      return groupMessagesBySender(messages, groupThreshold, dateSeparatorLocale);
    }, [messages, groupByUser, groupThreshold, dateSeparatorLocale]);

    // При отправке своего сообщения прокручивать список вниз (в inverted списке низ = offset 0)
    useEffect(() => {
      const prevLen = prevMessagesLengthRef.current;
      prevMessagesLengthRef.current = messages.length;
      if (messages.length > prevLen && messages[0]) {
        const newest = messages[0];
        if (newest.sender.id === currentUser.id) {
          setTimeout(() => {
            listRef.current?.scrollToOffset({ offset: 0, animated: true });
          }, 100);
        }
      }
    }, [messages, currentUser.id]);

    const scrollToMessage = useCallback(
      (messageId: string) => {
        const index = findIndexForMessageId(data, messageId);
        setTimeout(() => {
          listRef.current?.scrollToIndex({ index, animated: true });
        }, 100);
      },
      [data]
    );

    const scrollToBottom = useCallback(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
      setShowScrollToBottom(false);
    }, []);

    const handleScroll = useCallback(
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = e.nativeEvent.contentOffset.y;
        setShowScrollToBottom(y > scrollToBottomThreshold);
      },
      [scrollToBottomThreshold]
    );

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
            onMentionPress={onMentionPress}
            onLinkPress={onLinkPress}
            onEmailPress={onEmailPress}
            onPhonePress={onPhonePress}
            onRequestMessageContextMenu={onRequestMessageContextMenu}
            disableReactions={disableReactions}
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
          onMentionPress={onMentionPress}
          onLinkPress={onLinkPress}
          onEmailPress={onEmailPress}
          onPhonePress={onPhonePress}
          onRequestMessageContextMenu={onRequestMessageContextMenu}
          disableReactions={disableReactions}
          theme={theme}
          timeFormat={timeFormat}
        />
      );
    };

    const scrollToBottomButtonContent =
      renderScrollToBottomButton?.({
        onPress: scrollToBottom,
        visible: showScrollToBottom,
      }) ??
      (showScrollToBottom ? (
        <Pressable
          style={({ pressed }) => [
            styles.scrollToBottomButton,
            pressed && styles.scrollToBottomButtonPressed,
          ]}
          onPress={scrollToBottom}
        >
          <ChevronDownIcon
            color={theme?.colors?.primary ?? '#8690ff'}
            width={24}
            height={24}
          />
        </Pressable>
      ) : null);

    return (
      <ReplyScrollProvider onScrollToMessage={scrollToMessage}>
        <View style={styles.listWrapper}>
          <FlashList
            ref={listRef}
            data={data}
            inverted
            keyExtractor={(item) => item.id}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.35}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
          {scrollToBottomButtonContent}
        </View>
      </ReplyScrollProvider>
    );
  }
);

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
    position: 'relative',
  },
  scrollToBottomButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollToBottomButtonPressed: {
    opacity: 0.8,
  },
});
