import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ReplyInfo } from '../../types';
import { useReplyScroll } from '../../contexts/ReplyScrollContext';

interface ReplyMessageProps {
  replyTo: ReplyInfo;
}

export const ReplyMessage = memo<ReplyMessageProps>(({ replyTo }) => {
  const replyScroll = useReplyScroll();

  const content = (
    <>
      <Text style={styles.userName}>@{replyTo.userName}</Text>
      <Text style={styles.text} numberOfLines={1}>
        {replyTo.text ?? (replyTo.type === 'image' ? 'Фотография' : 'Media')}
      </Text>
    </>
  );

  if (replyScroll?.onReplyPress) {
    return (
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        onPress={() => replyScroll.onReplyPress(replyTo.messageId)}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.container}>{content}</View>;
});

const styles = StyleSheet.create({
  container: {
    borderLeftColor: '#8a93ff',
    borderLeftWidth: 2,
    marginBottom: 6,
    paddingLeft: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: '#aeb6d7',
    fontSize: 12,
  },
  userName: {
    color: '#8a93ff',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
});
