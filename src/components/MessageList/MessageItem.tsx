import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Message } from '../../types';
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
}

export const MessageItem = memo<MessageItemProps>(
  ({ message, isCurrentUser, timeFormat = '24h' }) => {
    const reactions = compactReactions(message.reactions);

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
            isCurrentUser ? styles.userBubble : styles.otherBubble,
          ]}
        >
          {message.isDeleted || message.type === 'deleted' ? (
            <DeletedMessage />
          ) : null}
          {message.type === 'text' && !message.isDeleted ? (
            <TextMessage message={message} />
          ) : null}
          {message.type === 'image' && !message.isDeleted ? (
            <MediaMessage message={message} />
          ) : null}
          {message.type === 'sticker' && !message.isDeleted ? (
            <StickerMessage message={message} />
          ) : null}
          <View style={styles.meta}>
            <Text style={styles.time}>
              {formatMessageTime(new Date(message.timestamp), timeFormat)}
            </Text>
            {isCurrentUser ? (
              <Text style={styles.status}>
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
    borderRadius: 16,
    maxWidth: '85%',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  otherBubble: {
    backgroundColor: '#1a1d2a',
    borderTopLeftRadius: 6,
  },
  reactionsRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  status: {
    color: '#8690ff',
    fontSize: 12,
  },
  time: {
    color: '#7f87a4',
    fontSize: 12,
  },
  userBubble: {
    backgroundColor: '#30357a',
    borderTopRightRadius: 6,
  },
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
