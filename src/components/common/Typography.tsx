import { memo } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

interface TypographyProps {
  children: ReactNode;
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
}

const variantStyles = StyleSheet.create({
  body: {
    color: '#f2f4ff',
    fontSize: 16,
  },
  caption: {
    color: '#8187a3',
    fontSize: 12,
  },
  subtitle: {
    color: '#b5bbd5',
    fontSize: 13,
    fontWeight: '500',
  },
  title: {
    color: '#f6f7ff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export const Typography = memo<TypographyProps>(
  ({ children, variant = 'body' }) => {
    return <Text style={variantStyles[variant]}>{children}</Text>;
  }
);
