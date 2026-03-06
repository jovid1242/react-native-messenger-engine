import { getHostComponent } from 'react-native-nitro-modules';
const MessengerEngineConfig = require('../nitrogen/generated/shared/json/MessengerEngineConfig.json');
import type {
  MessengerEngineMethods,
  MessengerEngineProps as NativeMessengerEngineProps,
} from './MessengerEngine.nitro';
export type { MessengerEngineProps as NativeViewProps } from './MessengerEngine.nitro';
export type * from './types';
export { ChatContainer as MessengerEngine } from './components/ChatContainer';
export { defaultTheme } from './theme/defaultTheme';

export const MessengerEngineView = getHostComponent<
  NativeMessengerEngineProps,
  MessengerEngineMethods
>('MessengerEngine', () => MessengerEngineConfig);
