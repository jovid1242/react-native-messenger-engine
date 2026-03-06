import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface AvatarProps {
  uri?: string;
  name: string;
  size?: number;
}

export const Avatar = memo<AvatarProps>(({ uri, name, size = 32 }) => {
  if (!uri) {
    return (
      <View
        style={[
          styles.placeholder,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <Text style={styles.letter}>{name.trim().charAt(0).toUpperCase()}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  );
});

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    backgroundColor: '#4e57f4',
    justifyContent: 'center',
  },
  letter: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
