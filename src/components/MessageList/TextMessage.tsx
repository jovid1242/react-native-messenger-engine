import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Message, MessengerTheme } from '../../types';
import { LinkPreview } from '../common/LinkPreview';
import { ReplyMessage } from './ReplyMessage';

interface TextMessageProps {
  message: Message;
  theme?: MessengerTheme;
}

const defaultTextColor = '#edf0ff';

export const TextMessage = memo<TextMessageProps>(({ message, theme }) => {
  const textColor = theme?.colors?.text ?? defaultTextColor;
  return (
    <View>
      {message.replyTo ? <ReplyMessage replyTo={message.replyTo} /> : null}
      {message.text ? (
        <Text style={[styles.text, { color: textColor }]}>{message.text}</Text>
      ) : null}
      {message.metadata?.links?.[0]?.url ? (
        <LinkPreview url={message.metadata.links[0].url} />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});
