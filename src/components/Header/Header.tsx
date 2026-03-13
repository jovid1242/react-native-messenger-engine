import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ChatInfo, MessengerTheme, User } from '../../types';
import { BackIcon } from '../../assets/icons/BackIcon';
import { Avatar } from '../common/Avatar';
import { TypingIndicator } from './TypingIndicator';

const AVATAR_SIZE = 40;

interface HeaderProps {
  chatInfo: ChatInfo;
  onBackPress?: () => void;
  onHeaderTitlePress?: () => void;
  theme?: Partial<MessengerTheme>;
  typingUsers?: User[];
}

const getStatusText = (user: { isOnline?: boolean } | undefined): string => {
  if (!user) return 'офлайн';
  return user.isOnline === true ? 'онлайн' : 'офлайн';
};

export const Header = memo<HeaderProps>(
  ({ chatInfo, onBackPress, onHeaderTitlePress, theme, typingUsers }) => {
    const isGroup = chatInfo.isGroup === true;
    const otherUser = !isGroup ? chatInfo.participants[0] : undefined;
    const statusText = getStatusText(otherUser);
    const colors = theme?.colors;
    const spacing = theme?.spacing;

    const backgroundColor = colors?.secondary ?? '#1a1d2a';
    const titleColor = colors?.text ?? '#f2f4ff';
    const subtitleColor = colors?.primary ?? '#ffffff';
    const paddingV = spacing?.md ?? 10;
    const gapAfterBack = spacing?.md ?? 12;
    const gapAvatarText = spacing?.md ?? 12;

    const subtitle =
      isGroup ? (
        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          группа
        </Text>
      ) : (
        <View style={styles.subtitleWrap}>

          {typingUsers && typingUsers.length > 0 ? (
            <TypingIndicator users={typingUsers} subtitleColor={subtitleColor} />
          ) : <Text style={[styles.subtitle, { color: subtitleColor }]}>
            {statusText}
          </Text>}
        </View>
      );

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            paddingTop: paddingV,
            paddingBottom: paddingV,
          },
        ]}
      >
        <Pressable
          onPress={onBackPress}
          style={styles.backButton}
          hitSlop={8}
        >
          <BackIcon color={titleColor} />
        </Pressable>
        <Pressable
          onPress={onHeaderTitlePress}
          style={[styles.content, { marginLeft: gapAfterBack }]}
        >
          <Avatar
            uri={chatInfo.avatar}
            name={chatInfo.name}
            size={AVATAR_SIZE}
          />
          <View style={[styles.textWrap, { marginLeft: gapAvatarText }]}>
            <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
              {chatInfo.name}
            </Text>
            {subtitle}
          </View>
        </Pressable>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    width: 40,
    height: 40,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  subtitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  textWrap: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
});
