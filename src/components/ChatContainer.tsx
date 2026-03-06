import { memo, useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import type { MessengerEngineProps } from '../types';
import { useMessages } from '../hooks/useMessages';
import { useReply } from '../hooks/useReply';
import { defaultTheme } from '../theme/defaultTheme';
import { Header } from './Header/Header';
import { InputToolbar } from './InputToolbar/InputToolbar';
import { MessageItem } from './MessageList/MessageItem';
import { MessageList } from './MessageList/MessageList';

export const ChatContainer = memo<MessengerEngineProps>((props) => {
  const {
    chatInfo,
    currentUser,
    messages,
    onAttachmentPress,
    onSendMessage,
    renderDateSeparator,
    renderHeader,
    renderInputToolbar,
    renderMessage,
    typingUsers,
    disableTypingIndicator,
    groupMessagesByUser = true,
    groupMessagesThreshold = 300000,
    maxInputLength,
    timeFormat = '24h',
    theme,
  } = props;
  const [text, setText] = useState('');
  const { replyTo, clearReply } = useReply();

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
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[
        styles.container,
        { backgroundColor: mergedTheme.colors.background },
      ]}
    >
      {renderHeader ? (
        renderHeader({ chatInfo, typingUsers })
      ) : (
        <Header
          chatInfo={chatInfo}
          typingUsers={disableTypingIndicator ? undefined : typingUsers}
        />
      )}
      <View style={styles.listContainer}>
        <MessageList
          currentUser={currentUser}
          groupByUser={groupMessagesByUser}
          groupThreshold={groupMessagesThreshold}
          messages={parsedMessages}
          onLoadMore={props.onLoadMore}
          renderDateSeparator={renderDateSeparator}
          renderMessage={
            renderMessage ??
            ((messageProps) => (
              <MessageItem
                isCurrentUser={messageProps.isCurrentUser}
                message={messageProps.message}
                timeFormat={timeFormat}
              />
            ))
          }
          timeFormat={timeFormat}
        />
      </View>
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
    paddingTop: 8,
  },
});
