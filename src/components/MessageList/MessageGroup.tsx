import { memo } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type {
  Message as MessageType,
  MessageGroup as MessageGroupType,
  MessengerTheme,
} from '../../types';
import { Avatar } from '../common/Avatar';
import { MessageItem } from './MessageItem';

interface MessageGroupProps {
  group: MessageGroupType;
  currentUserId: string;
  renderMessage?: (message: MessageType, isCurrentUser: boolean) => ReactNode;
  timeFormat?: '12h' | '24h';
  theme?: MessengerTheme;
  /** When false (1-on-1), sender name/avatar is hidden */
  isGroup?: boolean;
}

export const MessageGroup = memo<MessageGroupProps>(
  ({
    group,
    currentUserId,
    renderMessage,
    timeFormat = '24h',
    theme,
    isGroup = true,
  }) => {
    const isCurrentUser = group.userId === currentUserId;
    const showHeader = isGroup && !isCurrentUser && group.showHeader;

    return (
      <View style={styles.container}>
        {showHeader ? (
          <View style={styles.header}>
            <Avatar uri={group.userAvatar} name={group.userName} size={24} />
            <Text style={styles.userName}>{group.userName}</Text>
          </View>
        ) : null}
        {group.messages.map((message) => (
          <View
            key={message.id}
            style={isCurrentUser ? styles.right : styles.left}
          >
            {renderMessage ? (
              renderMessage(message, isCurrentUser)
            ) : (
              <MessageItem
                message={message}
                isCurrentUser={isCurrentUser}
                theme={theme}
                timeFormat={timeFormat}
              />
            )}
          </View>
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    marginTop: 4,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 6,
    marginLeft: 8,
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  userName: {
    color: '#7f89ff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
});
