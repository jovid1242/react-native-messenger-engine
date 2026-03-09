import { useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  MessengerEngine,
  nightTheme,
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
      isGroup: false,
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
    <KeyboardProvider>
      <StatusBar barStyle="light-content" />
      <MessengerEngine
        chatInfo={chatInfo}
        currentUser={currentUser}
        messages={messages}
        onSendMessage={handleSendMessage}
        theme={nightTheme}
        typingUsers={[{ id: 'u2', name: 'Melissa Jones' }]}
      />
    </KeyboardProvider>
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
  {
    id: 'm6',
    type: 'text',
    text: 'Good morning everyone! Ready for the standup?',
    sender: { id: 'u2', name: 'Melissa Jones' },
    timestamp: new Date('2024-11-17T09:55:00'),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm7',
    type: 'text',
    text: "I'll share my screen in a sec",
    sender: { id: 'u-current', name: 'You' },
    timestamp: new Date('2024-11-17T09:52:00'),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm8',
    type: 'text',
    text: 'The new API docs are live. Link in the channel description.',
    sender: { id: 'u1', name: 'Robert Johnson' },
    timestamp: new Date('2024-11-17T09:48:00'),
    status: 'read',
    reactions: [{ emoji: '👍', userId: 'u-current', count: 2 }],
  },
  {
    id: 'm9',
    type: 'text',
    text: 'Thanks Robert, that helps a lot.',
    sender: { id: 'u-current', name: 'You' },
    timestamp: new Date('2024-11-17T09:45:00'),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm10',
    type: 'text',
    text: 'Did anyone try the beta build from yesterday?',
    sender: { id: 'u2', name: 'Melissa Jones' },
    timestamp: new Date('2024-11-17T09:40:00'),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm11',
    type: 'text',
    text: "Yes, ran it on the simulator. So far so good.",
    sender: { id: 'u-current', name: 'You' },
    timestamp: new Date('2024-11-17T09:38:00'),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm12',
    type: 'text',
    text: 'We should ship by end of week if QA is done.',
    sender: { id: 'u1', name: 'Robert Johnson' },
    timestamp: new Date('2024-11-17T09:35:00'),
    status: 'read',
    reactions: [{ emoji: '🚀', userId: 'u2', count: 1 }],
  },
  {
    id: 'm13',
    type: 'text',
    text: 'Sounds good. I will run the final checks today.',
    sender: { id: 'u2', name: 'Melissa Jones' },
    timestamp: new Date('2024-11-17T09:32:00'),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm14',
    type: 'text',
    text: 'Reminder: design review at 3pm. Please have feedback in Figma.',
    sender: { id: 'u1', name: 'Robert Johnson' },
    timestamp: new Date('2024-11-17T09:30:00'),
    status: 'read',
    reactions: [],
  },
  {
    id: 'm15',
    type: 'text',
    text: "Got it, I'll add comments by 2.",
    sender: { id: 'u-current', name: 'You' },
    timestamp: new Date('2024-11-17T09:28:00'),
    status: 'read',
    reactions: [],
  },
];
