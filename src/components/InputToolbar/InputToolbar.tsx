import { memo, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
}

export const InputToolbar = memo<InputToolbarProps>(
  ({ value, onChangeText, onSend, onAttachmentPress, maxInputLength }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const isSendDisabled = value.trim().length === 0;

    const handleAttachmentPress = useCallback(() => {
      onAttachmentPress?.();
      setMenuVisible((previous) => !previous);
    }, [onAttachmentPress]);

    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <AttachmentButton onPress={handleAttachmentPress} />
          <InputField
            maxLength={maxInputLength}
            onChangeText={onChangeText}
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
    backgroundColor: '#111420',
    borderRadius: 20,
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  wrapper: {
    backgroundColor: '#0f1118',
    borderTopColor: '#1d2133',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 8,
    paddingTop: 6,
  },
});
