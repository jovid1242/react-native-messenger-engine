import React, { memo, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Message, MessengerTheme } from '../../types';
import { compactReactions } from '../../utils/reactionHelpers';
import { formatMessageTime } from '../../utils/dateFormatter';
import { ReactionBadge } from '../common/ReactionBadge';
import { DeletedMessage } from './DeletedMessage';
import { MediaMessage } from './MediaMessage';
import { StickerMessage } from './StickerMessage';
import { TextMessage } from './TextMessage';

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
  onMentionPress?: (username: string) => void;
  onLinkPress?: (url: string) => void;
  onEmailPress?: (email: string) => void;
  onPhonePress?: (phone: string) => void;
  onRequestMessageContextMenu?: (
    message: Message,
    position: { x: number; y: number; width: number; height: number },
    isCurrentUser?: boolean
  ) => void;
  disableReactions?: boolean;
  timeFormat?: '12h' | '24h';
  theme?: MessengerTheme;
}

const defaultBubbleOutgoing = '#30357a';
const defaultBubbleIncoming = '#1a1d2a';
const defaultTimeColor = '#7f87a4';
const defaultStatusColor = '#8690ff';

export const MessageItem = memo<MessageItemProps>(
  ({
    message,
    isCurrentUser,
    onMentionPress,
    onLinkPress,
    onEmailPress,
    onPhonePress,
    onRequestMessageContextMenu,
    disableReactions,
    timeFormat = '24h',
    theme,
  }) => {
    const bubbleRef = useRef<View>(null);
    const reactions = compactReactions(message.reactions);
    const userBg = theme?.colors?.userMessage ?? defaultBubbleOutgoing;
    const otherBg = theme?.colors?.otherMessage ?? defaultBubbleIncoming;
    const timeColor = theme?.colors?.mutedText ?? defaultTimeColor;
    const statusColor = theme?.colors?.primary ?? defaultStatusColor;

    const handleLongPress = () => {
      if (!onRequestMessageContextMenu) return;
        (bubbleRef.current as any)?.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          onRequestMessageContextMenu(message, { x, y, width, height }, isCurrentUser);
        }
      );
    };

    const bubbleContent = (
      <View
        ref={bubbleRef as any}
        collapsable={false}
        style={[
          styles.bubble,
          isCurrentUser
            ? [styles.userBubble, { backgroundColor: userBg }]
            : [styles.otherBubble, { backgroundColor: otherBg }],
        ]}
      >
          {message.isDeleted || message.type === 'deleted' ? (
            <DeletedMessage />
          ) : null}
          {message.type === 'text' && !message.isDeleted ? (
            <TextMessage
              message={message}
              theme={theme}
              onMentionPress={onMentionPress}
              onLinkPress={onLinkPress}
              onEmailPress={onEmailPress}
              onPhonePress={onPhonePress}
            />
          ) : null}
          {message.type === 'image' && !message.isDeleted ? (
            <MediaMessage message={message} />
          ) : null}
          {message.type === 'sticker' && !message.isDeleted ? (
            <StickerMessage message={message} />
          ) : null}
          <View style={styles.meta}>
            <Text style={[styles.time, { color: timeColor }]}>
              {formatMessageTime(new Date(message.timestamp), timeFormat)}
            </Text>
            {isCurrentUser ? (
              <Text style={[styles.status, { color: statusColor }]}>
                {message.status === 'read' ? '✓✓' : '✓'}
              </Text>
            ) : null}
          </View>
        </View>
    );

    return (
      <View
        style={[
          styles.wrapper,
          isCurrentUser ? styles.wrapperRight : styles.wrapperLeft,
        ]}
      >
        {onRequestMessageContextMenu ? (
          <TouchableOpacity
            activeOpacity={1}
            onLongPress={handleLongPress}
            delayLongPress={400}
          >
            {bubbleContent}
          </TouchableOpacity>
        ) : (
          bubbleContent
        )}
        {!disableReactions && (
          <View style={styles.reactionsRow}>
            {reactions.map((reaction) => (
              <ReactionBadge
                key={`${message.id}-${reaction.emoji}`}
                emoji={reaction.emoji}
                count={reaction.count}
              />
            ))}
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 20,
    maxWidth: '85%',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  otherBubble: {},
  reactionsRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  status: {
    fontSize: 12,
  },
  time: {
    fontSize: 12,
  },
  userBubble: {},
  wrapper: {
    marginVertical: 2,
  },
  wrapperLeft: {
    alignItems: 'flex-start',
  },
  wrapperRight: {
    alignItems: 'flex-end',
  },
});
