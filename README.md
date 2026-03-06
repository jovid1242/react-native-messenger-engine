# React Native Messenger Engine

A modern, scalable, and highly customizable chat engine for React Native.

`react-native-messenger-engine` provides a modular chat UI architecture with
typed models, grouped messages, date separators, reactions, reply previews, and
an extensible rendering system for building production messaging interfaces.

## Highlights

- Modular chat architecture (`Header`, `MessageList`, `InputToolbar`, hooks, utils)
- Strong TypeScript types for messages, users, reactions, and rendering props
- Grouped message rendering by sender and time threshold
- Date separators with today/yesterday formatting
- Dark themed default UI that is easy to customize
- Flexible render overrides (`renderHeader`, `renderMessage`, `renderInputToolbar`)
- Includes Nitro view export for native integration scenarios

## Installation

```sh
npm install react-native-messenger-engine react-native-nitro-modules
```

> `react-native-nitro-modules` is required because this library uses
> [Nitro Modules](https://nitro.margelo.com/).

## Exports

The package exposes two primary entry points:

- `MessengerEngine` - fully featured React chat container
- `MessengerEngineView` - Nitro host component export

## Quick Start

```tsx
import React, { useMemo, useState } from 'react';
import {
  MessengerEngine,
  type ChatInfo,
  type Message,
  type User,
} from 'react-native-messenger-engine';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const currentUser = useMemo<User>(
    () => ({
      id: 'u-current',
      name: 'You',
    }),
    []
  );

  const chatInfo = useMemo<ChatInfo>(
    () => ({
      id: 'group-tech',
      name: 'Tech Hub',
      participants: [{ id: 'u-1', name: 'Alex' }],
      isGroup: true,
    }),
    []
  );

  return (
    <MessengerEngine
      chatInfo={chatInfo}
      currentUser={currentUser}
      messages={messages}
      onSendMessage={(text) => {
        const newMessage: Message = {
          id: String(Date.now()),
          type: 'text',
          text,
          sender: currentUser,
          timestamp: new Date(),
          status: 'sent',
          reactions: [],
        };
        setMessages((prev) => [newMessage, ...prev]);
      }}
    />
  );
}
```

## Customization Example

```tsx
<MessengerEngine
  messages={messages}
  currentUser={currentUser}
  chatInfo={chatInfo}
  onSendMessage={handleSend}
  groupMessagesByUser
  groupMessagesThreshold={300000}
  typingUsers={typingUsers}
  theme={{
    colors: {
      primary: '#7c5cff',
      background: '#0d0f17',
      text: '#eef1ff',
      userMessage: '#353c86',
      otherMessage: '#1b1f2d',
      mutedText: '#8a92af',
      inputBackground: '#121726',
      separator: '#2a2f43',
      secondary: '#202438',
      destructive: '#ff5d66',
    },
  }}
  renderHeader={(props) => <CustomHeader {...props} />}
  renderMessage={(props) => <CustomMessage {...props} />}
/>
```

## Core Props

`MessengerEngine` supports:

- Data: `messages`, `currentUser`, `chatInfo`
- Send callbacks: `onSendMessage`, `onSendImage`, `onSendSticker`
- Interaction callbacks: `onMessageLongPress`, `onReactionAdd`, `onReplyPress`
- Behavior flags: `disableTypingIndicator`, `disableReactions`, `disableReplies`
- Grouping options: `groupMessagesByUser`, `groupMessagesThreshold`
- Rendering overrides: `renderHeader`, `renderMessage`, `renderInputToolbar`, `renderDateSeparator`

For full type definitions, see `src/types/index.ts`.

## Example App

A runnable demo is included in `example/` and already wired to the new chat
components:

```sh
yarn example
```

## Development

```sh
yarn typecheck
yarn lint
yarn test
```

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
