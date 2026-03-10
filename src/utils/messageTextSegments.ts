/**
 * Parses message text into segments for styling: plain text, URLs, emails,
 * phone numbers, and @mentions. Segments are non-overlapping and in order.
 */

export type SegmentType = 'text' | 'url' | 'email' | 'phone' | 'mention';

export interface TextSegment {
  type: SegmentType;
  value: string;
}

const URL_REGEXP =
  /(https?:\/\/|www\.)([\w.-]+)\.([a-z]{2,})([/\w .-]*)*\/?/gi;
const EMAIL_REGEXP = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_REGEXP = /(?:\+?\d[\s-()]?){8,}/g;
const MENTION_REGEXP = /@[\w]+/g;

interface Match {
  start: number;
  end: number;
  type: SegmentType;
  value: string;
}

function findMatches(text: string): Match[] {
  const matches: Match[] = [];

  const addMatches = (regex: RegExp, type: Match['type']) => {
    const re = new RegExp(regex.source, regex.flags);
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        type,
        value: m[0],
      });
    }
  };

  addMatches(URL_REGEXP, 'url');
  addMatches(EMAIL_REGEXP, 'email');
  addMatches(PHONE_REGEXP, 'phone');
  addMatches(MENTION_REGEXP, 'mention');

  matches.sort((a, b) => a.start - b.start);

  const merged: Match[] = [];
  for (const m of matches) {
    const last = merged[merged.length - 1];
    if (last && m.start < last.end) {
      continue;
    }
    merged.push(m);
  }
  return merged;
}

/**
 * Splits message text into ordered segments for links, emails, phones, @mentions,
 * and plain text. Used to render message body with highlighted parts.
 */
export function getMessageTextSegments(text: string): TextSegment[] {
  if (!text) return [];

  const matches = findMatches(text);
  const segments: TextSegment[] = [];
  let lastEnd = 0;

  for (const m of matches) {
    if (m.start > lastEnd) {
      segments.push({
        type: 'text',
        value: text.slice(lastEnd, m.start),
      });
    }
    segments.push({ type: m.type, value: m.value });
    lastEnd = m.end;
  }
  if (lastEnd < text.length) {
    segments.push({ type: 'text', value: text.slice(lastEnd) });
  }
  return segments;
}
