import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import type { MessengerTheme } from '../../types';
import { AttachmentIcon } from '../../assets/icons/AttachmentIcon';

interface AttachmentButtonProps {
  onPress?: () => void;
  theme?: MessengerTheme;
}

const defaultIconColor = '#76787A';

export const AttachmentButton = memo<AttachmentButtonProps>(
  ({ onPress, theme }) => {
    const iconColor = theme?.colors?.mutedText ?? defaultIconColor;
    return (
      <Pressable style={styles.button} onPress={onPress}>
        <AttachmentIcon color={iconColor} width={22} height={26} />
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
});
