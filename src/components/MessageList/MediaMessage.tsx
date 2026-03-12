import type { ReactNode } from 'react';
import { memo, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import type { Message } from '../../types';
import { getImageDimensions } from '../../utils/imageDimensions';
import { ReplyMessage } from './ReplyMessage';

interface MediaMessageProps {
  message: Message;
  textColor?: string;
  /** Оверлей времени/статуса поверх фото (для сообщений "только фото") */
  metaOverlay?: ReactNode;
}

const DEFAULT_IMAGE_WIDTH = 220;
const DEFAULT_IMAGE_HEIGHT = 180;

export const MediaMessage = memo<MediaMessageProps>(({ message, textColor, metaOverlay }) => {
  const imageOnly = Boolean(message.image && !message.text);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  const uri = message.image ?? '';

  useEffect(() => {
    if (!uri) return;
    getImageDimensions(uri)
      .then(setDimensions)
      .catch(() => setDimensions({ width: DEFAULT_IMAGE_WIDTH, height: DEFAULT_IMAGE_HEIGHT }));
  }, [uri]);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0) setContainerWidth(w);
  };

  const imageStyle =
    containerWidth != null && dimensions
      ? {
          width: containerWidth,
          height: (containerWidth / dimensions.width) * dimensions.height,
          borderRadius: 12,
        }
      : styles.image;

  return (
    <View style={styles.container}>
      {message.replyTo ? <ReplyMessage replyTo={message.replyTo} /> : null}
      {message.image ? (
        <View style={styles.imageWrap} onLayout={onLayout}>
          <Image source={{ uri: message.image }} style={imageStyle} resizeMode="cover" />
          {imageOnly && metaOverlay ? (
            <View style={styles.metaOverlay} pointerEvents="none">
              {metaOverlay}
            </View>
          ) : null}
        </View>
      ) : null}
      {message.text ? (
        <Text style={[styles.caption, textColor ? { color: textColor } : undefined]} numberOfLines={5}>
          {message.text}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  caption: {
    marginTop: 4,
    fontSize: 15,
    paddingHorizontal: 2,
  },
  container: {
    alignSelf: 'stretch',
  },
  image: {
    borderRadius: 12,
    height: DEFAULT_IMAGE_HEIGHT,
    width: DEFAULT_IMAGE_WIDTH,
  },
  imageWrap: {
    alignSelf: 'stretch',
    position: 'relative',
  },
  metaOverlay: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 12,
  },
});
