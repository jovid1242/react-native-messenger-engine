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
const defaultContainerBg = '#111420';
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
    const containerBg = theme?.colors?.inputBackground ?? defaultContainerBg;
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
        <View style={[styles.container, { backgroundColor: containerBg }]}>
          <AttachmentButton onPress={handleAttachmentPress} />
          <InputField
            maxLength={maxInputLength}
            onChangeText={onChangeText}
            theme={theme}
            value={value}
          />
          <SendButton disabled={isSendDisabled} onPress={onSend} />
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
    alignItems: 'flex-end',
    borderRadius: 20,
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  wrapper: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 8,
    paddingTop: 6,
  },
});
