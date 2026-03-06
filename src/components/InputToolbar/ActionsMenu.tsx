import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ActionsMenuProps {
  visible: boolean;
  onClose: () => void;
  onPhotoPress?: () => void;
  onStickerPress?: () => void;
}

export const ActionsMenu = memo<ActionsMenuProps>(
  ({ visible, onClose, onPhotoPress, onStickerPress }) => {
    if (!visible) {
      return null;
    }

    return (
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menu}>
          <Pressable onPress={onPhotoPress} style={styles.item}>
            <Text style={styles.itemText}>Photo</Text>
          </Pressable>
          <Pressable onPress={onStickerPress} style={styles.item}>
            <Text style={styles.itemText}>Sticker</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  itemText: {
    color: '#edf0ff',
    fontSize: 14,
  },
  menu: {
    backgroundColor: '#171a26',
    borderColor: '#252b3d',
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 140,
    paddingVertical: 4,
  },
  overlay: {
    alignItems: 'flex-start',
    bottom: 58,
    justifyContent: 'flex-end',
    left: 16,
    position: 'absolute',
  },
});
