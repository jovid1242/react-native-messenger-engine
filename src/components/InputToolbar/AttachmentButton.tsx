import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface AttachmentButtonProps {
  onPress?: () => void;
}

export const AttachmentButton = memo<AttachmentButtonProps>(({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>⌁</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  icon: {
    color: '#8d95b5',
    fontSize: 22,
  },
});
