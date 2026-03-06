import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

export const DeletedMessage = memo(() => {
  return <Text style={styles.text}>Message was deleted.</Text>;
});

const styles = StyleSheet.create({
  text: {
    color: '#777f9e',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
