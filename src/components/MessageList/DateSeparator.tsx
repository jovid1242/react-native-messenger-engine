import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { MessengerTheme } from '../../types';

interface DateSeparatorProps {
  formattedDate: string;
  theme?: MessengerTheme;
}

const defaultBg = '#0a0c13';
const defaultColor = '#9199b6';

export const DateSeparator = memo<DateSeparatorProps>(
  ({ formattedDate, theme }) => {
    const bg = theme?.colors?.secondary ?? defaultBg;
    const color = theme?.colors?.mutedText ?? defaultColor;
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { backgroundColor: bg, color }]}>
          {formattedDate}
        </Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
  },
  text: {
    borderRadius: 12,
    fontSize: 12,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
