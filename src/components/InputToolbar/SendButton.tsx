import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface SendButtonProps {
  disabled?: boolean;
  onPress: () => void;
}

export const SendButton = memo<SendButtonProps>(({ disabled, onPress }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled ? styles.disabled : styles.active]}
    >
      <Text style={styles.icon}>⌤</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#5f6fff',
  },
  button: {
    alignItems: 'center',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  disabled: {
    backgroundColor: '#303754',
  },
  icon: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 1,
  },
});
