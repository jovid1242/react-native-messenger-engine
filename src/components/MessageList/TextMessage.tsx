import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Message } from '../../types';
import { LinkPreview } from '../common/LinkPreview';
import { ReplyMessage } from './ReplyMessage';

interface TextMessageProps {
  message: Message;
}

export const TextMessage = memo<TextMessageProps>(({ message }) => {
  return (
    <View>
      {message.replyTo ? <ReplyMessage replyTo={message.replyTo} /> : null}
      {message.text ? <Text style={styles.text}>{message.text}</Text> : null}
      {message.metadata?.links?.[0]?.url ? (
        <LinkPreview url={message.metadata.links[0].url} />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  text: {
    color: '#edf0ff',
    fontSize: 16,
    lineHeight: 22,
  },
});
