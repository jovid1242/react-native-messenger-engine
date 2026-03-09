import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  timeFormat?: '12h' | '24h';
  theme?: MessengerTheme;
}

const defaultBubbleOutgoing = '#30357a';
const defaultBubbleIncoming = '#1a1d2a';
const defaultTimeColor = '#7f87a4';
const defaultStatusColor = '#8690ff';

export const MessageItem = memo<MessageItemProps>(
  ({ message, isCurrentUser, timeFormat = '24h', theme }) => {
    const reactions = compactReactions(message.reactions);
    const userBg = theme?.colors?.userMessage ?? defaultBubbleOutgoing;
    const otherBg = theme?.colors?.otherMessage ?? defaultBubbleIncoming;
    const timeColor = theme?.colors?.mutedText ?? defaultTimeColor;
    const statusColor = theme?.colors?.primary ?? defaultStatusColor;

    return (
      <View
        style={[
          styles.wrapper,
          isCurrentUser ? styles.wrapperRight : styles.wrapperLeft,
        ]}
      >
        <View
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
            <TextMessage message={message} theme={theme} />
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
        <View style={styles.reactionsRow}>
          {reactions.map((reaction) => (
            <ReactionBadge
              key={`${message.id}-${reaction.emoji}`}
              emoji={reaction.emoji}
              count={reaction.count}
            />
          ))}
        </View>
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
