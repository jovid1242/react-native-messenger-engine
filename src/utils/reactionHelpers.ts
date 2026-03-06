import type { Reaction } from '../types';

export const mergeReaction = (
  reactions: Reaction[],
  emoji: string,
  userId: string
): Reaction[] => {
  const existing = reactions.find(
    (item) => item.emoji === emoji && item.userId === userId
  );
  if (existing) {
    return reactions.map((item) =>
      item.emoji === emoji && item.userId === userId
        ? { ...item, count: item.count + 1 }
        : item
    );
  }

  return [...reactions, { emoji, userId, count: 1 }];
};

export const removeReaction = (
  reactions: Reaction[],
  emoji: string,
  userId: string
): Reaction[] => {
  return reactions
    .map((item) =>
      item.emoji === emoji && item.userId === userId
        ? { ...item, count: Math.max(0, item.count - 1) }
        : item
    )
    .filter((item) => item.count > 0);
};

export const compactReactions = (
  reactions: Reaction[]
): Array<{ emoji: string; count: number }> => {
  const counter = new Map<string, number>();
  reactions.forEach((reaction) => {
    counter.set(
      reaction.emoji,
      (counter.get(reaction.emoji) ?? 0) + reaction.count
    );
  });

  return Array.from(counter.entries()).map(([emoji, count]) => ({
    emoji,
    count,
  }));
};
