import { memo, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { MessengerTheme } from '../../types';
import { ActionsMenu } from './ActionsMenu';
import { AttachmentButton } from './AttachmentButton';
import { InputField } from './InputField';
import { SendButton } from './SendButton';

interface InputToolbarProps {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  onAttachmentPress?: () => void;
  maxInputLength?: number;
  theme?: MessengerTheme;
}

const defaultWrapperBg = '#0f1118';
const defaultBorderColor = '#1d2133';

export const InputToolbar = memo<InputToolbarProps>(
  ({
    value,
    onChangeText,
    onSend,
    onAttachmentPress,
    maxInputLength,
    theme,
  }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const isSendDisabled = value.trim().length === 0;
    const wrapperBg = theme?.colors?.background ?? defaultWrapperBg;
    const borderColor = theme?.colors?.separator ?? defaultBorderColor;

    const handleAttachmentPress = useCallback(() => {
      onAttachmentPress?.();
      setMenuVisible((previous) => !previous);
    }, [onAttachmentPress]);

    return (
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: wrapperBg,
            borderTopColor: borderColor,
          },
        ]}
      >
        <View style={styles.container}>
          <AttachmentButton onPress={handleAttachmentPress} theme={theme} />
          <InputField
            maxLength={maxInputLength}
            onChangeText={onChangeText}
            theme={theme}
            value={value}
          />
          <SendButton
            disabled={isSendDisabled}
            onPress={onSend}
            theme={theme}
          />
        </View>
        <ActionsMenu
          onClose={() => setMenuVisible(false)}
          visible={isMenuVisible}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 10,
  },
  wrapper: {
    // borderTopWidth: StyleSheet.hairlineWidth,
  },
});
