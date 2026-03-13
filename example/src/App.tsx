import { ru } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { Alert, Clipboard, StatusBar } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  MessengerEngine,
  nightTheme,
  type ChatInfo,
  type Message,
  type ReplyInfo,
  type User,
} from 'react-native-messenger-engine';

function messageToReplyInfo(m: Message): ReplyInfo {
  return {
    messageId: m.id,
    userId: m.sender.id,
    userName: m.sender.name,
    text: m.text,
    type: m.type,
    image: m.image,
  };
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>(() => seedMessages);
  const [replyTo, setReplyTo] = useState<ReplyInfo | undefined>(undefined);
  const currentUser = useMemo<User>(
    () => ({
      id: 'u-current',
      name: 'You',
      avatar: 'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
    }),
    []
  );
  const chatInfo = useMemo<ChatInfo>(
    () => ({
      id: 'group-tech-hub',
      name: 'Mellisa',
      participants: [
        {
          id: 'u1',
          name: 'Robert Johnson',
          avatar: 'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
          isOnline: true,
        },
        {
          id: 'u2',
          name: 'Melissa Jones',
          avatar: 'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
          isOnline: true,
        },
      ],
      isGroup: false,
      avatar: 'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
    }),
    []
  );

  const handleBackPress = () => {
    Alert.alert('Назад', 'Можно выполнить навигацию назад');
  };

  const handleHeaderTitlePress = () => {
    Alert.alert('Заголовок', 'Клик по аватарке/названию — редирект в профиль и т.д.');
  };

  const handleMessageCopy = (message: Message) => {
    if (message.text) {
      Clipboard.setString(message.text);
      Alert.alert('Скопировано', 'Текст сообщения скопирован');
    }
  };

  const handleSendMessage = (text: string, replyToPayload?: ReplyInfo) => {
    const nextMessage: Message = {
      id: `${Date.now()}`,
      text,
      type: 'text',
      sender: currentUser,
      timestamp: new Date(),
      status: 'read',
      reactions: [],
      replyTo: replyToPayload,
    };
    setMessages((prev) => [nextMessage, ...prev]);
  };

  return (
    <KeyboardProvider>
      <StatusBar barStyle="light-content" />
      <MessengerEngine
        chatInfo={chatInfo}
        currentUser={currentUser}
        messages={messages}
        onBackPress={handleBackPress}
        onHeaderTitlePress={handleHeaderTitlePress}
        onSendMessage={handleSendMessage}
        theme={nightTheme}
        dateSeparatorLocale={ru}
        // typingUsers={[{ id: 'u2', name: 'Melissa Jones' }]}
        disableReactions
        onMentionPress={(username) => {
          Alert.alert(`Меню пользователя ${username}`);
        }}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(undefined)}
        onReplyPress={(messageId) => {
          const message = messages.find((m) => m.id === messageId);
          if (message) setReplyTo(messageToReplyInfo(message));
        }}
        onMessageEdit={(msg) => Alert.alert('Edit', `Редактировать: ${msg.text}`)}
        onMessageForward={(msg) => Alert.alert('Forward', `Переслать: ${msg.text}`)}
        onMessageCopy={handleMessageCopy}
        onMessageReport={(_msg) => Alert.alert('Report', `Пожаловаться на сообщение`)}
        onMessageDelete={(_msg) => Alert.alert('Delete', 'Удалить сообщение?')}
      />
    </KeyboardProvider>
  );
}

const now = new Date();
const msDay = 24 * 60 * 60 * 1000;
const todayStart = new Date(now);
todayStart.setHours(0, 0, 0, 0);
const yesterdayStart = new Date(todayStart.getTime() - msDay);
const twoDaysStart = new Date(todayStart.getTime() - 2 * msDay);

function tsToday(h: number, m: number) {
  const d = new Date(todayStart);
  d.setHours(h, m, 0, 0);
  return d;
}
function tsYesterday(h: number, m: number) {
  const d = new Date(yesterdayStart);
  d.setHours(h, m, 0, 0);
  return d;
}
function tsTwoDaysAgo(h: number, m: number) {
  const d = new Date(twoDaysStart);
  d.setHours(h, m, 0, 0);
  return d;
}

const seedMessages: Message[] = [
  {
    id: 'm5',
    type: 'deleted',
    sender: { id: 'u-current', name: 'You' },
    timestamp: tsToday(10, 12),
    status: 'read',
    reactions: [],
    isDeleted: true,
  },
  {
    id: 'm4-img',
    type: 'image',
    image:
      'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
    sender: { id: 'u2', name: 'Melissa Jones' },
    timestamp: tsToday(10, 11),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm4-reply-photo',
    type: 'text',
    text: 'Классное фото! 👍',
    sender: { id: 'u-current', name: 'You' },
    timestamp: tsToday(10, 11),
    status: 'read',
    reactions: [],
    replyTo: {
      messageId: 'm4-img',
      userId: 'u2',
      userName: 'Melissa Jones',
      type: 'image',
      image:
        'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
    },
  },
  {
    id: 'm4-img-txt',
    type: 'image',
    image:
      'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
    text: 'Вот как получилось в красном 👗',
    sender: { id: 'u-current', name: 'You' },
    timestamp: tsToday(10, 10),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm4-img-only1',
    type: 'image',
    image:
      'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
    sender: { id: 'u-current', name: 'You' },
    timestamp: tsToday(10, 10),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm4',
    type: 'text',
    text: '@Melissa agreed',
    sender: { id: 'u-current', name: 'You' },
    timestamp: tsToday(10, 12),
    status: 'read',
    reactions: [],
    replyTo: {
      messageId: 'm4-img-txt',
      userId: 'u-current',
      userName: 'You',
      text: 'Вот как получилось в красном 👗',
      type: 'image',
      image:
        'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
    },
  },
  {
    id: 'm4-reply-photo-txt',
    type: 'text',
    text: 'Супер получилось! 👗',
    sender: { id: 'u2', name: 'Melissa Jones' },
    timestamp: tsToday(10, 11),
    status: 'read',
    reactions: [],
    replyTo: {
      messageId: 'm4-img-txt',
      userId: 'u-current',
      userName: 'You',
      text: 'Вот как получилось в красном 👗',
      type: 'image',
      image:
        'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
    },
  },
  {
    id: 'm3',
    type: 'text',
    text: '@Robert people should understand how decisions are made by AI.',
    sender: { id: 'u2', name: 'Melissa Jones' },
    timestamp: tsToday(10, 8),
    status: 'read',
    reactions: [{ emoji: '👌', userId: 'u-current', count: 4 }],
    replyTo: {
      messageId: 'm2',
      userId: 'u-current',
      userName: 'You',
      text: "It's a complex issue",
      type: 'text',
    },
  },
  {
    id: 'm2',
    type: 'text',
    text: "It's a complex issue",
    sender: { id: 'u-current', name: 'You' },
    timestamp: tsToday(10, 6),
    status: 'read',
    reactions: [],
    replyTo: {
      messageId: 'm1',
      userId: 'u1',
      userName: 'Robert Johnson',
      text: "Recently, there's been a lot of talk about the ethical implications of AI. What are your thoughts?",
      type: 'text',
    },
  },
  {
    id: 'm1',
    type: 'text',
    text: "Recently, there's been a lot of talk about the ethical implications of AI. What are your thoughts?",
    sender: {
      id: 'u1',
      name: 'Robert Johnson',
    },
    timestamp: tsToday(10, 2),
    status: 'read',
    reactions: [
      { emoji: '😎', userId: 'u-current', count: 1 },
      { emoji: '🧑‍💻', userId: 'u2', count: 1 },
      { emoji: '👀', userId: 'u3', count: 7 },
    ],
  },
  {
    id: 'm6',
    type: 'text',
    text: 'Good morning everyone! Ready for the standup?',
    sender: { id: 'u2', name: 'Melissa Jones' },
    timestamp: tsYesterday(9, 55),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm7',
    type: 'text',
    text: "I'll share my screen in a sec",
    sender: { id: 'u-current', name: 'You' },
    timestamp: tsYesterday(9, 52),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm8',
    type: 'text',
    text: 'The new API docs are live. Link in the channel description.',
    sender: { id: 'u1', name: 'Robert Johnson' },
    timestamp: tsYesterday(9, 48),
    status: 'read',
    reactions: [{ emoji: '👍', userId: 'u-current', count: 2 }],
  },
  {
    id: 'm9',
    type: 'text',
    text: 'Thanks Robert, that helps a lot.',
    sender: { id: 'u-current', name: 'You' },
    timestamp: tsYesterday(9, 45),
    status: 'read',
    reactions: [],
    replyTo: {
      messageId: 'm8',
      userId: 'u1',
      userName: 'Robert Johnson',
      text: 'The new API docs are live. Link in the channel description.',
      type: 'text',
    },
  },
  {
    id: 'm10',
    type: 'text',
    text: 'Did anyone try the beta build from yesterday?',
    sender: { id: 'u2', name: 'Melissa Jones' },
    timestamp: tsYesterday(9, 40),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm11',
    type: 'text',
    text: "Yes, ran it on the simulator. So far so good.",
    sender: { id: 'u-current', name: 'You' },
    timestamp: tsYesterday(9, 38),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm12',
    type: 'text',
    text: 'We should ship by end of week if QA is done.',
    sender: { id: 'u1', name: 'Robert Johnson' },
    timestamp: tsTwoDaysAgo(9, 35),
    status: 'read',
    reactions: [{ emoji: '🚀', userId: 'u2', count: 1 }],
  },
  {
    id: 'm13',
    type: 'text',
    text: 'Sounds good. I will run the final checks today.',
    sender: { id: 'u2', name: 'Melissa Jones' },
    timestamp: tsTwoDaysAgo(9, 32),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm14',
    type: 'text',
    text: 'Reminder: design review at 3pm. Please have feedback in Figma.',
    sender: { id: 'u1', name: 'Robert Johnson' },
    timestamp: tsTwoDaysAgo(9, 30),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm15',
    type: 'text',
    text: "Got it, I'll add comments by 2.",
    sender: { id: 'u-current', name: 'You' },
    timestamp: tsTwoDaysAgo(9, 28),
    status: 'read',
    reactions: [],
  },
];
