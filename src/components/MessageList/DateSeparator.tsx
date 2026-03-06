import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DateSeparatorProps {
  formattedDate: string;
}

export const DateSeparator = memo<DateSeparatorProps>(({ formattedDate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formattedDate}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
  },
  text: {
    backgroundColor: '#0a0c13',
    borderRadius: 12,
    color: '#9199b6',
    fontSize: 12,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
