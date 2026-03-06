import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ChatInfo, User } from '../../types';
import { Avatar } from '../common/Avatar';
import { HeaderActions } from './HeaderActions';
import { TypingIndicator } from './TypingIndicator';

interface HeaderProps {
  chatInfo: ChatInfo;
  typingUsers?: User[];
}

const formatMembers = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K members`;
  }
  return `${count} members`;
};

export const Header = memo<HeaderProps>(({ chatInfo, typingUsers }) => {
  const participantsCount = chatInfo.participants.length;

  return (
    <View style={styles.container}>
      <HeaderActions />
      <View style={styles.content}>
        <Avatar uri={chatInfo.avatar} name={chatInfo.name} />
        <View style={styles.textWrap}>
          <Text style={styles.title}>{chatInfo.name}</Text>
          <Text style={styles.subtitle}>
            {formatMembers(participantsCount)}
          </Text>
          <TypingIndicator users={typingUsers} />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f1118',
    borderBottomColor: '#1a1d2a',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 6,
  },
  subtitle: {
    color: '#8187a3',
    fontSize: 12,
    marginTop: 1,
  },
  textWrap: {
    marginLeft: 10,
  },
  title: {
    color: '#f2f4ff',
    fontSize: 17,
    fontWeight: '700',
  },
});
