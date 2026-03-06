const URL_REGEXP =
  /((https?:\/\/)|(www\.))([\w.-]+)\.([a-z]{2,})([/\w .-]*)*\/?/gi;
const EMAIL_REGEXP = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_REGEXP = /(?:\+?\d[\s-()]?){8,}/g;

export interface ExtractedLink {
  value: string;
  type: 'url' | 'email' | 'phone';
}

export const extractLinks = (text: string): ExtractedLink[] => {
  const links: ExtractedLink[] = [];
  const pushMatches = (
    regExp: RegExp,
    type: ExtractedLink['type'],
    normalize?: (value: string) => string
  ) => {
    const matches = text.match(regExp) ?? [];
    matches.forEach((match) => {
      const value = normalize ? normalize(match) : match;
      if (!links.some((item) => item.value === value && item.type === type)) {
        links.push({ type, value });
      }
    });
  };

  pushMatches(URL_REGEXP, 'url', (value) =>
    value.startsWith('http') ? value : `https://${value}`
  );
  pushMatches(EMAIL_REGEXP, 'email', (value) => value.toLowerCase());
  pushMatches(PHONE_REGEXP, 'phone', (value) => value.replace(/\s+/g, ''));

  return links;
};
