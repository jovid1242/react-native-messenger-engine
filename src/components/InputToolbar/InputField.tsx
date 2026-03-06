import { memo } from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface InputFieldProps {
  value: string;
  onChangeText: (value: string) => void;
  maxLength?: number;
}

export const InputField = memo<InputFieldProps>(
  ({ value, onChangeText, maxLength }) => {
    return (
      <TextInput
        maxLength={maxLength}
        multiline
        onChangeText={onChangeText}
        placeholder="Write a message..."
        placeholderTextColor="#67708f"
        style={styles.input}
        value={value}
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    color: '#f2f4ff',
    flex: 1,
    fontSize: 16,
    maxHeight: 120,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
});
