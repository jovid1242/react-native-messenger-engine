import { memo } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import type { MessengerTheme } from '../../types';

interface InputFieldProps {
  value: string;
  onChangeText: (value: string) => void;
  maxLength?: number;
  theme?: MessengerTheme;
}

const defaultTextColor = '#f2f4ff';
const defaultPlaceholderColor = '#67708f';

export const InputField = memo<InputFieldProps>(
  ({ value, onChangeText, maxLength, theme }) => {
    const textColor = theme?.colors?.text ?? defaultTextColor;
    const placeholderColor = theme?.colors?.mutedText ?? defaultPlaceholderColor;
    return (
      <TextInput
        maxLength={maxLength}
        multiline
        onChangeText={onChangeText}
        placeholder="Write a message..."
        placeholderTextColor={placeholderColor}
        style={[styles.input, { color: textColor }]}
        value={value}
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 120,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
});
