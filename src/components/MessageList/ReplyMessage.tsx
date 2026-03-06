import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ReplyInfo } from '../../types';

interface ReplyMessageProps {
  replyTo: ReplyInfo;
}

export const ReplyMessage = memo<ReplyMessageProps>(({ replyTo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>@{replyTo.userName}</Text>
      <Text style={styles.text} numberOfLines={1}>
        {replyTo.text ?? 'Media'}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderLeftColor: '#8a93ff',
    borderLeftWidth: 2,
    marginBottom: 6,
    paddingLeft: 8,
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
