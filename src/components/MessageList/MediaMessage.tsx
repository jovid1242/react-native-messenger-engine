import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { Message } from '../../types';
import { ReplyMessage } from './ReplyMessage';

interface MediaMessageProps {
  message: Message;
}

export const MediaMessage = memo<MediaMessageProps>(({ message }) => {
  return (
    <View>
      {message.replyTo ? <ReplyMessage replyTo={message.replyTo} /> : null}
      {message.image ? (
        <Image source={{ uri: message.image }} style={styles.image} />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
    height: 180,
    width: 220,
  },
});
