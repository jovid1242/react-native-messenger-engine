import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { User } from '../../types';

interface TypingIndicatorProps {
  users?: User[];
  subtitleColor?: string;
}

export const TypingIndicator = memo<TypingIndicatorProps>(
  ({ users, subtitleColor = '#8187a3' }) => {
    if (!users || users.length === 0) {
      return null;
    }

    const firstUser = users[0];
    const text =
      users.length === 1
        ? `${firstUser?.name ?? 'Someone'} is typing...`
        : `${users
            .slice(0, 2)
            .map((user) => user.name)
            .join(', ')} are typing...`;

    return (
      <Text style={[styles.text, { color: subtitleColor }]}>{text}</Text>
    );
  }
);

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginTop: 2,
  },
});
