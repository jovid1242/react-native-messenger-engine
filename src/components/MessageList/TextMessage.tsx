import { memo, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Message, MessengerTheme } from '../../types';
import type { TextSegment } from '../../utils/messageTextSegments';
import { getMessageTextSegments } from '../../utils/messageTextSegments';
import { LinkPreview } from '../common/LinkPreview';
import { ReplyMessage } from './ReplyMessage';

export interface MessageSegmentCallbacks {
  onMentionPress?: (username: string) => void;
  onLinkPress?: (url: string) => void;
  onEmailPress?: (email: string) => void;
  onPhonePress?: (phone: string) => void;
}

interface TextMessageProps {
  message: Message;
  theme?: MessengerTheme;
  onMentionPress?: (username: string) => void;
  onLinkPress?: (url: string) => void;
  onEmailPress?: (email: string) => void;
  onPhonePress?: (phone: string) => void;
}

const defaultTextColor = '#edf0ff';
const defaultLinkColor = '#8690ff';

function getSegmentPressHandler(
  seg: TextSegment,
  callbacks: MessageSegmentCallbacks
): (() => void) | undefined {
  if (seg.type === 'mention' && callbacks.onMentionPress) {
    const username = seg.value.startsWith('@') ? seg.value.slice(1) : seg.value;
    return () => callbacks.onMentionPress?.(username);
  }
  if (seg.type === 'url' && callbacks.onLinkPress) {
    return () => callbacks.onLinkPress?.(seg.value);
  }
  if (seg.type === 'email' && callbacks.onEmailPress) {
    return () => callbacks.onEmailPress?.(seg.value);
  }
  if (seg.type === 'phone' && callbacks.onPhonePress) {
    return () => callbacks.onPhonePress?.(seg.value);
  }
  return undefined;
}

export const TextMessage = memo<TextMessageProps>(
  ({
    message,
    theme,
    onMentionPress,
    onLinkPress,
    onEmailPress,
    onPhonePress,
  }) => {
    const textColor = theme?.colors?.text ?? defaultTextColor;
    const linkColor =
      theme?.colors?.linkColor ?? theme?.colors?.primary ?? defaultLinkColor;

    const segments = useMemo(
      () => (message.text ? getMessageTextSegments(message.text) : []),
      [message.text]
    );

    const callbacks = useMemo(
      () => ({
        onMentionPress,
        onLinkPress,
        onEmailPress,
        onPhonePress,
      }),
      [onMentionPress, onLinkPress, onEmailPress, onPhonePress]
    );

    const renderSegment = useCallback(
      (seg: TextSegment, i: number) => {
        const isHighlight =
          seg.type === 'url' ||
          seg.type === 'email' ||
          seg.type === 'phone' ||
          seg.type === 'mention';
        const onPress = getSegmentPressHandler(seg, callbacks);
        return (
          <Text
            key={i}
            style={isHighlight ? { color: linkColor } : undefined}
            onPress={onPress}
          >
            {seg.value}
          </Text>
        );
      },
      [linkColor, callbacks]
    );

    return (
      <View>
        {message.replyTo ? (
          <ReplyMessage replyTo={message.replyTo} />
        ) : null}
        {message.text ? (
          <Text style={[styles.text, { color: textColor }]}>
            {segments.map(renderSegment)}
          </Text>
        ) : null}
        {message.metadata?.links?.[0]?.url ? (
          <LinkPreview url={message.metadata.links[0].url} />
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});
