import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface LinkPreviewProps {
  url: string;
  title?: string;
  description?: string;
  onPress?: (url: string) => void;
}

export const LinkPreview = memo<LinkPreviewProps>(
  ({ url, title, description, onPress }) => {
    return (
      <Pressable
        style={styles.container}
        onPress={() => {
          onPress?.(url);
        }}
      >
        <Text style={styles.title} numberOfLines={1}>
          {title ?? url}
        </Text>
        {description ? (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        ) : null}
        <Text style={styles.url} numberOfLines={1}>
          {url}
        </Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111420',
    borderColor: '#272c3e',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 6,
    padding: 8,
  },
  description: {
    color: '#8f96b3',
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    color: '#dbe1ff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  url: {
    color: '#8690ff',
    fontSize: 12,
  },
});
