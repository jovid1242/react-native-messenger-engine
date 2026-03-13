import { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import type { MessengerEngineProps } from '../types';
import { useMessages } from '../hooks/useMessages';
import { useReply } from '../hooks/useReply';
import { defaultTheme } from '../theme/defaultTheme';
import { Header } from './Header/Header';
import { InputToolbar } from './InputToolbar/InputToolbar';
import { MessageContextMenu } from './MessageList/MessageContextMenu';
import { MessageItem } from './MessageList/MessageItem';
import { MessageList } from './MessageList/MessageList';

export const ChatContainer = memo<MessengerEngineProps>((props) => {
  const {
    chatInfo,
    currentUser,
    messages,
    onAttachmentPress,
    onBackPress,
    onEmailPress,
    onHeaderTitlePress,
    onLinkPress,
    onMentionPress,
    onMessageCopy,
    onMessageDelete,
    onMessageEdit,
    onMessageForward,
    onMessageReport,
    onPhonePress,
    onReplyPress,
    onSendMessage,
    renderDateSeparator,
    renderHeader,
    renderInputToolbar,
    renderMessage,
    typingUsers,
    disableReactions,
    disableTypingIndicator,
    groupMessagesByUser = true,
    groupMessagesThreshold = 300000,
    maxInputLength,
    timeFormat = '24h',
    theme,
    dateSeparatorLocale,
  } = props;
  const [text, setText] = useState('');
  const [contextMenu, setContextMenu] = useState<{
    message: import('../types').Message;
    position: { x: number; y: number; width: number; height: number };
    isCurrentUser?: boolean;
  } | null>(null);
  const { replyTo, clearReply } = useReply();

  const handleRequestMessageContextMenu = useCallback(
    (
      message: import('../types').Message,
      position: { x: number; y: number; width: number; height: number },
      isCurrentUser?: boolean
    ) => {
      setContextMenu({ message, position, isCurrentUser });
    },
    []
  );

  const parsedMessages = useMessages(messages);
  const mergedTheme = useMemo(
    () => ({
      ...defaultTheme,
      ...theme,
      colors: {
        ...defaultTheme.colors,
        ...theme?.colors,
      },
      spacing: {
        ...defaultTheme.spacing,
        ...theme?.spacing,
      },
    }),
    [theme]
  );

  const handleSend = useCallback(() => {
    const value = text.trim();
    if (!value) {
      return;
    }
    onSendMessage(value, replyTo);
    setText('');
    clearReply();
  }, [clearReply, onSendMessage, replyTo, text]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      style={[
        styles.container,
        { backgroundColor: mergedTheme.colors.background },
      ]}
    >
      {renderHeader ? (
        renderHeader({
          chatInfo,
          typingUsers: disableTypingIndicator ? undefined : typingUsers,
          onBackPress,
          onHeaderTitlePress,
        })
      ) : (
        <Header
          chatInfo={chatInfo}
          onBackPress={onBackPress}
          onHeaderTitlePress={onHeaderTitlePress}
          theme={mergedTheme}
          typingUsers={disableTypingIndicator ? undefined : typingUsers}
        />
      )}
      <View style={styles.listContainer}>
        <MessageList
          currentUser={currentUser}
          disableReactions={disableReactions}
          groupByUser={groupMessagesByUser}
          groupThreshold={groupMessagesThreshold}
          isGroup={chatInfo.isGroup}
          messages={parsedMessages}
          onEmailPress={onEmailPress}
          onLoadMore={props.onLoadMore}
          onLinkPress={onLinkPress}
          onMentionPress={onMentionPress}
          onPhonePress={onPhonePress}
          onRequestMessageContextMenu={handleRequestMessageContextMenu}
          renderDateSeparator={renderDateSeparator}
          dateSeparatorLocale={dateSeparatorLocale}
          theme={mergedTheme}
          renderMessage={
            renderMessage ??
            ((messageProps) => (
              <MessageItem
                isCurrentUser={messageProps.isCurrentUser}
                message={messageProps.message}
                onEmailPress={onEmailPress}
                onLinkPress={onLinkPress}
                onMentionPress={onMentionPress}
                onPhonePress={onPhonePress}
                onRequestMessageContextMenu={handleRequestMessageContextMenu}
                disableReactions={disableReactions}
                theme={mergedTheme}
                timeFormat={timeFormat}
              />
            ))
          }
          timeFormat={timeFormat}
        />
      </View>
      <MessageContextMenu
        visible={contextMenu !== null}
        message={contextMenu?.message ?? null}
        position={contextMenu?.position ?? { x: 0, y: 0, width: 0, height: 0 }}
        isCurrentUser={contextMenu?.isCurrentUser}
        theme={mergedTheme}
        onClose={() => setContextMenu(null)}
        onEdit={onMessageEdit}
        onReplyPress={onReplyPress}
        onForward={onMessageForward}
        onCopy={onMessageCopy}
        onReport={onMessageReport}
        onDelete={onMessageDelete}
      />
      {renderInputToolbar ? (
        renderInputToolbar({
          text,
          onChangeText: setText,
          onSend: handleSend,
        })
      ) : (
        <InputToolbar
          maxInputLength={maxInputLength}
          onAttachmentPress={onAttachmentPress}
          onChangeText={setText}
          onSend={handleSend}
          theme={mergedTheme}
          value={text}
        />
      )}
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10, 
  },
});
