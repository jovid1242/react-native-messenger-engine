import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import type { MessengerTheme } from '../../types';
import { SendIcon } from '../../assets/icons/SendIcon';

interface SendButtonProps {
  disabled?: boolean;
  onPress: () => void;
  theme?: MessengerTheme;
}

const defaultActiveBg = '#7253F6';
const defaultDisabledBg = '#303032';

export const SendButton = memo<SendButtonProps>(
  ({ disabled, onPress, theme }) => {
    const activeBg = theme?.colors?.primary ?? defaultActiveBg;
    const disabledBg = theme?.colors?.separator ?? defaultDisabledBg;
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.button,
          disabled
            ? { backgroundColor: disabledBg }
            : { backgroundColor: activeBg },
        ]}
      >
        <SendIcon color="#FFFFFF" width={20} height={21} />
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
});
