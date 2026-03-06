import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ReactionBadgeProps {
  emoji: string;
  count: number;
}

export const ReactionBadge = memo<ReactionBadgeProps>(({ emoji, count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#171a26',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    width: 'auto',
  },
  emoji: {
    fontSize: 14,
  },
  count: {
    color: '#c8cee8',
    fontSize: 12,
    fontWeight: '600',
  },
});
