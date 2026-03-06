import type { TextStyle, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export type MessageType = 'text' | 'image' | 'sticker' | 'deleted';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: Date;
}

export interface Reaction {
  emoji: string;
  userId: string;
  count: number;
}

export interface ReplyInfo {
  messageId: string;
  userId: string;
  userName: string;
  text?: string;
  type: MessageType;
  image?: string;
}

export interface Message {
  id: string;
  type: MessageType;
  text?: string;
  image?: string;
  sticker?: string;
  sender: User;
  timestamp: Date;
  status: MessageStatus;
  reactions: Reaction[];
  replyTo?: ReplyInfo;
  isDeleted?: boolean;
  metadata?: {
    links?: Array<{
      url: string;
      title?: string;
      description?: string;
      image?: string;
    }>;
    edited?: boolean;
    editedAt?: Date;
  };
}

export interface DateSeparator {
  id: string;
  type: 'date-separator';
  date: Date;
  formattedDate: string;
  isToday: boolean;
  isYesterday: boolean;
}

export interface MessageGroup {
  id: string;
  type: 'message-group';
  userId: string;
  userName: string;
  userAvatar?: string;
  messages: Message[];
  showHeader: boolean;
  isConsecutive: boolean;
}

export interface MessengerTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    mutedText: string;
    userMessage: string;
    otherMessage: string;
    inputBackground: string;
    separator: string;
    destructive: string;
  };
  typography?: {
    title?: TextStyle;
    subtitle?: TextStyle;
    message?: TextStyle;
    caption?: TextStyle;
  };
  spacing?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  bubbleStyle?: {
    user?: ViewStyle;
    other?: ViewStyle;
  };
}

export interface ChatInfo {
  id: string;
  name: string;
  avatar?: string;
  participants: User[];
  isGroup?: boolean;
}

export interface HeaderRenderProps {
  chatInfo: ChatInfo;
  typingUsers?: User[];
}

export interface MessageRenderProps {
  message: Message;
  isCurrentUser: boolean;
}

export interface DateSeparatorRenderProps {
  date: Date;
  formattedDate: string;
  isToday?: boolean;
  isYesterday?: boolean;
}

export interface InputToolbarRenderProps {
  text: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
}

export interface MessengerEngineProps {
  messages: Message[];
  currentUser: User;
  chatInfo: ChatInfo;
  onSendMessage: (text: string, replyTo?: ReplyInfo) => void;
  onSendImage?: (imageUri: string, replyTo?: ReplyInfo) => void;
  onSendSticker?: (stickerId: string, replyTo?: ReplyInfo) => void;
  onMessageLongPress?: (message: Message) => void;
  onReactionAdd?: (messageId: string, emoji: string) => void;
  onReactionRemove?: (messageId: string, emoji: string) => void;
  onReplyPress?: (messageId: string) => void;
  onLoadMore?: () => Promise<Message[]>;
  onUserPress?: (userId: string) => void;
  onAttachmentPress?: () => void;
  typingUsers?: User[];
  isLoading?: boolean;
  hasMore?: boolean;
  renderHeader?: (props: HeaderRenderProps) => ReactNode;
  renderMessage?: (props: MessageRenderProps) => ReactNode;
  renderInputToolbar?: (props: InputToolbarRenderProps) => ReactNode;
  renderDateSeparator?: (props: DateSeparatorRenderProps) => ReactNode;
  theme?: Partial<MessengerTheme>;
  disableTypingIndicator?: boolean;
  disableReactions?: boolean;
  disableReplies?: boolean;
  maxInputLength?: number;
  timeFormat?: '12h' | '24h';
  dateFormat?: Intl.DateTimeFormatOptions;
  groupMessagesByUser?: boolean;
  groupMessagesThreshold?: number;
}
