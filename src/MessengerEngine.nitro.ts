import type {
  HybridView,
  HybridViewMethods,
  HybridViewProps,
} from 'react-native-nitro-modules';

export interface MessengerEngineProps extends HybridViewProps {
  color: string;
}
export interface MessengerEngineMethods extends HybridViewMethods {}

export type MessengerEngine = HybridView<
  MessengerEngineProps,
  MessengerEngineMethods
>;
