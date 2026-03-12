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
    const textColor = theme?.colors?.text;

    const handleLongPress = () => {
      if (!onRequestMessageContextMenu) return;
        (bubbleRef.current as any)?.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          onRequestMessageContextMenu(message, { x, y, width, height }, isCurrentUser);
        }
      );
    };

    const isImageWithText =
      message.type === 'image' &&
      !message.isDeleted &&
      Boolean(message.image && message.text);
    const isImageOnly =
      message.type === 'image' && !message.isDeleted && Boolean(message.image) && !message.text;
    const isImageBubble = message.type === 'image' && !message.isDeleted;
    const bubbleStyle = [
      styles.bubble,
      isImageWithText && styles.bubbleImageWithText,
      isImageOnly && styles.bubbleImageOnly,
      isImageBubble && styles.bubbleMedia,
    ].filter(Boolean);

    const bubbleContent = (
      <View
        ref={bubbleRef as any}
        collapsable={false}
        style={[
          bubbleStyle,
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
            <MediaMessage
              message={message}
              textColor={textColor}
              metaOverlay={
                isImageOnly ? (
                  <View style={styles.metaCapsule}>
                    <Text style={[styles.timeCapsule, { color: '#e0e0e0' }]}>
                      {formatMessageTime(new Date(message.timestamp), timeFormat)}
                    </Text>
                    {isCurrentUser ? (
                      <Text style={[styles.statusCapsule, { color: '#e0e0e0' }]}>
                        {message.status === 'read' ? '✓✓' : '✓'}
                      </Text>
                    ) : null}
                  </View>
                ) : undefined
              }
            />
          ) : null}
          {message.type === 'sticker' && !message.isDeleted ? (
            <StickerMessage message={message} />
          ) : null}
          {!isImageOnly ? (
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
          ) : null}
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
  bubbleImageWithText: {
    paddingTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 6,
  },
  bubbleImageOnly: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  bubbleMedia: {
    width: '85%',
  },
  meta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  metaCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  otherBubble: {},
  reactionsRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  status: {
    fontSize: 10,
  },
  statusCapsule: {
    fontSize: 10,
  },
  time: {
    fontSize: 10,
  },
  timeCapsule: {
    fontSize: 10,
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
