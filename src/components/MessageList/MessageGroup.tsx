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
  onMentionPress?: (username: string) => void;
  onLinkPress?: (url: string) => void;
  onEmailPress?: (email: string) => void;
  onPhonePress?: (phone: string) => void;
  onRequestMessageContextMenu?: (
    message: MessageType,
    position: { x: number; y: number; width: number; height: number },
    isCurrentUser?: boolean
  ) => void;
  renderMessage?: (message: MessageType, isCurrentUser: boolean) => ReactNode;
  timeFormat?: '12h' | '24h';
  theme?: MessengerTheme;
  disableReactions?: boolean;
  /** When false (1-on-1), sender name/avatar is hidden */
  isGroup?: boolean;
}

export const MessageGroup = memo<MessageGroupProps>(
  ({
    group,
    currentUserId,
    onMentionPress,
    onLinkPress,
    onEmailPress,
    onPhonePress,
    onRequestMessageContextMenu,
    renderMessage,
    timeFormat = '24h',
    theme,
    disableReactions,
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
        {[...group.messages].reverse().map((message) => (
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
                onMentionPress={onMentionPress}
                onLinkPress={onLinkPress}
                onEmailPress={onEmailPress}
                onPhonePress={onPhonePress}
                onRequestMessageContextMenu={onRequestMessageContextMenu}
                disableReactions={disableReactions}
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
