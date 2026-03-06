import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface HeaderActionsProps {
  onBackPress?: () => void;
  onSearchPress?: () => void;
  onMenuPress?: () => void;
}

const IconButton = ({
  onPress,
  label,
}: {
  onPress?: () => void;
  label: string;
}) => {
  return (
    <Pressable onPress={onPress} style={styles.iconButton}>
      <Text style={styles.iconText}>{label}</Text>
    </Pressable>
  );
};

export const HeaderActions = memo<HeaderActionsProps>(
  ({ onBackPress, onSearchPress, onMenuPress }) => {
    return (
      <View style={styles.container}>
        <IconButton label="‹" onPress={onBackPress} />
        <View style={styles.right}>
          <IconButton label="⌕" onPress={onSearchPress} />
          <IconButton label="⋯" onPress={onMenuPress} />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  iconText: {
    color: '#8690ff',
    fontSize: 20,
    fontWeight: '500',
  },
  right: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
