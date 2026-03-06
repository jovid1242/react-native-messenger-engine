import { useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import {
  MessengerEngine,
  type ChatInfo,
  type Message,
  type User,
} from 'react-native-messenger-engine';

export default function App() {
  const [messages, setMessages] = useState<Message[]>(() => seedMessages);
  const currentUser = useMemo<User>(
    () => ({
      id: 'u-current',
      name: 'You',
    }),
    []
  );
  const chatInfo = useMemo<ChatInfo>(
    () => ({
      id: 'group-tech-hub',
      name: 'Tech Hub',
      participants: [
        { id: 'u1', name: 'Robert Johnson' },
        { id: 'u2', name: 'Melissa Jones' },
      ],
      isGroup: true,
    }),
    []
  );

  const handleSendMessage = (text: string) => {
    const nextMessage: Message = {
      id: `${Date.now()}`,
      text,
      type: 'text',
      sender: currentUser,
      timestamp: new Date(),
      status: 'read',
      reactions: [],
    };
    setMessages((prev) => [nextMessage, ...prev]);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MessengerEngine
        chatInfo={chatInfo}
        currentUser={currentUser}
        messages={messages}
        onSendMessage={handleSendMessage}
        typingUsers={[{ id: 'u2', name: 'Melissa Jones' }]}
      />
    </>
  );
}

const seedMessages: Message[] = [
  {
    id: 'm5',
    type: 'deleted',
    sender: { id: 'u-current', name: 'You' },
    timestamp: new Date('2024-11-17T10:12:00'),
    status: 'read',
    reactions: [],
    isDeleted: true,
  },
  {
    id: 'm4',
    type: 'text',
    text: '@Melissa agreed',
    sender: { id: 'u-current', name: 'You' },
    timestamp: new Date('2024-11-17T10:12:00'),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm3',
    type: 'text',
    text: '@Robert people should understand how decisions are made by AI.',
    sender: { id: 'u2', name: 'Melissa Jones' },
    timestamp: new Date('2024-11-17T10:08:00'),
    status: 'read',
    reactions: [{ emoji: '👌', userId: 'u-current', count: 4 }],
  },
  {
    id: 'm2',
    type: 'text',
    text: "It's a complex issue",
    sender: { id: 'u-current', name: 'You' },
    timestamp: new Date('2024-11-17T10:06:00'),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm1',
    type: 'text',
    text: "Recently, there's been a lot of talk about the ethical implications of AI. What are your thoughts?",
    sender: {
      id: 'u1',
      name: 'Robert Johnson',
    },
    timestamp: new Date('2024-11-17T10:02:00'),
    status: 'read',
    reactions: [
      { emoji: '😎', userId: 'u-current', count: 1 },
      { emoji: '🧑‍💻', userId: 'u2', count: 1 },
      { emoji: '👀', userId: 'u3', count: 7 },
    ],
  },
];
