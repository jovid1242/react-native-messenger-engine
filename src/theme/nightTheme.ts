import type { MessengerTheme } from '../types';

/**
 * Night (dark) theme palette from design.
 * Brand: Accent, Yellow, Lilac, Blue, Green
 * Surface: 1–3
 * Interface: Background, Borders, Icons
 * Text: Primary, Secondary, Footnote
 * Bubble: Outgoing, Incoming
 * State: Error, Success, Attention
 */
export const nightTheme: MessengerTheme = {
  colors: {
    // Interface
    background: '#191918',
    primary: '#6B72FF', // Brand Accent
    secondary: '#232324', // Surface 1 / Background Sections
    separator: '#303032', // Borders
    inputBackground: '#303032', // Surface 2
    // Text
    text: '#E1E3E6', // Primary
    mutedText: '#969A9F', // Secondary / Icon Secondary
    // Bubble
    userMessage: '#212239', // Outgoing
    otherMessage: '#232324', // Incoming
    // State
    destructive: '#FA4C56', // Error
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
  },
};

/** Extended palette for custom use (e.g. status, footnote, surfaces) */
export const nightThemePalette = {
  brand: {
    accent: '#6B72FF',
    yellow: '#FBB019',
    lilac: '#B463E7',
    blue: '#63AFFF',
    green: '#67D292',
  },
  surface: {
    surface1: '#232324',
    surface2: '#303032',
    surface3: '#3B3B3D',
  },
  text: {
    primary: '#E1E3E6',
    secondary: '#969A9F',
    footnote: '#76787A',
    onPrimary: '#FFFFFF',
  },
  bubble: {
    outgoing: '#212239',
    outgoingAlt: '#2E3052',
    incoming: '#232324',
    incomingAlt: '#303032',
  },
  state: {
    error: '#FA4C56',
    success: '#24C383',
    attention: '#FBB019',
  },
  icon: {
    inactive: '#76787A',
    secondary: '#969A9F',
  },
} as const;
