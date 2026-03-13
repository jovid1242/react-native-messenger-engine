import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ReplyInfo } from '../../types';
import type { MessengerTheme } from '../../types';

interface ReplyPreviewBarProps {
  replyTo: ReplyInfo;
  onCancel: () => void;
  theme?: Partial<MessengerTheme>;
}

const defaultBorderColor = '#8a93ff';
const defaultUserNameColor = '#8a93ff';
const defaultTextColor = '#aeb6d7';

export const ReplyPreviewBar = memo<ReplyPreviewBarProps>(
  ({ replyTo, onCancel, theme }) => {
    const borderColor = theme?.colors?.primary ?? defaultBorderColor;
    const userNameColor = theme?.colors?.primary ?? defaultUserNameColor;
    const textColor = theme?.colors?.mutedText ?? defaultTextColor;

    const previewText =
      replyTo.text ?? (replyTo.type === 'image' ? 'Фотография' : 'Media');

    return (
      <View style={[styles.wrapper, { borderLeftColor: borderColor }]}>
        <View style={styles.content}>
          <Text style={[styles.userName, { color: userNameColor }]}>
            {replyTo.userName}
          </Text>
          <Text style={[styles.text, { color: textColor }]} numberOfLines={1}>
            {previewText}
          </Text>
        </View>
        <Pressable
          hitSlop={8}
          onPress={onCancel}
          style={({ pressed }) => [styles.close, pressed && styles.closePressed]}
        >
          <Text style={[styles.closeText, { color: textColor }]}>✕</Text>
        </Pressable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    borderLeftWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 4,
    paddingVertical: 6,
    paddingRight: 4,
  },
  content: {
    flex: 1,
    minWidth: 0,
    paddingLeft: 4, 
  },
  userName: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  text: {
    fontSize: 12,
  },
  close: {
    padding: 4,
  },
  closePressed: {
    opacity: 0.7,
  },
  closeText: {
    fontSize: 16,
  },
});
