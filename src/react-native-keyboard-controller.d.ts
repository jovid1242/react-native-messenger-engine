declare module 'react-native-keyboard-controller' {
  import type { ComponentType, ReactNode } from 'react';
  import type { ViewProps } from 'react-native';

  export const KeyboardAvoidingView: ComponentType<
    ViewProps & {
      behavior?: 'padding' | 'height' | 'position' | 'translate-with-padding';
      keyboardVerticalOffset?: number;
    }
  >;

  export const KeyboardProvider: ComponentType<{ children: ReactNode }>;
}
