import { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { Message } from '../../types';

interface StickerMessageProps {
  message: Message;
}

export const StickerMessage = memo<StickerMessageProps>(({ message }) => {
  if (!message.sticker) {
    return null;
  }

  return <Image source={{ uri: message.sticker }} style={styles.sticker} />;
});

const styles = StyleSheet.create({
  sticker: {
    height: 140,
    width: 140,
  },
});
