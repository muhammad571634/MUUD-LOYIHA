// Mood emoji → score mapping and colors from PRD
export interface MoodEntry {
  id: string;
  userId: string;
  userName: string;
  avatarUrl?: string;
  emoji: string;
  emojiName: string;
  score: number;
  textNote?: string;
  visibility: "public" | "friends" | "private";
  moodCategory: "positive" | "neutral" | "negative";
  reactions: { emoji: string; count: number }[];
  createdAt: Date;
  expiresAt: Date;
}

export interface FriendStory {
  id: string;
  entryId?: string;
  name: string;
  avatarUrl?: string;
  emoji: string;
  hasCheckedIn: boolean;
  borderColor: string;
}

export const MOOD_EMOJIS = [
  { emoji: "😄", name: "happy", minScore: 8, maxScore: 10, category: "positive" as const, color: "#FFF9E6" },
  { emoji: "🥰", name: "loved", minScore: 8, maxScore: 10, category: "positive" as const, color: "#FFF9E6" },
  { emoji: "🤩", name: "excited", minScore: 8, maxScore: 10, category: "positive" as const, color: "#FFF9E6" },
  { emoji: "🥳", name: "celebrating", minScore: 8, maxScore: 10, category: "positive" as const, color: "#FFF9E6" },
  { emoji: "😊", name: "content", minScore: 6, maxScore: 7, category: "positive" as const, color: "#E8F5E9" },
  { emoji: "🙂", name: "okay", minScore: 6, maxScore: 7, category: "positive" as const, color: "#E8F5E9" },
  { emoji: "😐", name: "neutral", minScore: 5, maxScore: 5, category: "neutral" as const, color: "#F3F3F3" },
  { emoji: "😔", name: "sad", minScore: 3, maxScore: 4, category: "negative" as const, color: "#FCE4EC" },
  { emoji: "😢", name: "crying", minScore: 3, maxScore: 4, category: "negative" as const, color: "#FCE4EC" },
  { emoji: "😴", name: "tired", minScore: 2, maxScore: 3, category: "negative" as const, color: "#E3F2FD" },
  { emoji: "😰", name: "anxious", minScore: 2, maxScore: 3, category: "negative" as const, color: "#E3F2FD" },
  { emoji: "😤", name: "frustrated", minScore: 2, maxScore: 4, category: "negative" as const, color: "#FBE9E7" },
];

export const REACTION_EMOJIS = ["💙", "❤️", "🤗", "🎉", "😮"];

export function getMoodColor(score: number): string {
  if (score >= 8) return "#FFF9E6";
  if (score >= 6) return "#E8F5E9";
  if (score === 5) return "#F3F3F3";
  if (score >= 3) return "#FCE4EC";
  return "#E3F2FD";
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} mins ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return "Yesterday";
}

// Demo data for the Home Feed
export const DEMO_STORIES: FriendStory[] = [
  { id: "you", name: "You", emoji: "", hasCheckedIn: false, borderColor: "#D4537E" },
  { id: "alex", name: "Alex", avatarUrl: "/avatars/alex.jpg", emoji: "😊", hasCheckedIn: true, borderColor: "#4CAF50" },
  { id: "jordan", name: "Jordan", avatarUrl: "/avatars/jordan.jpg", emoji: "☕", hasCheckedIn: true, borderColor: "#9C27B0" },
  { id: "casey", name: "Casey", avatarUrl: "/avatars/casey.jpg", emoji: "😏", hasCheckedIn: true, borderColor: "#FF9800" },
];

export const DEMO_ENTRIES: MoodEntry[] = [
  {
    id: "1",
    userId: "alex",
    userName: "Alex",
    avatarUrl: "/avatars/alex.jpg",
    emoji: "😊",
    emojiName: "content",
    score: 8,
    textNote: "Crushed a 5k run this morning! Feeling incredibly energized and ready for the week.",
    visibility: "friends",
    moodCategory: "positive",
    reactions: [
      { emoji: "❤️", count: 3 },
      { emoji: "🔥", count: 2 },
    ],
    createdAt: new Date(Date.now() - 24 * 60000),
    expiresAt: new Date(Date.now() + 23 * 3600000),
  },
  {
    id: "2",
    userId: "jordan",
    userName: "Jordan",
    avatarUrl: "/avatars/jordan.jpg",
    emoji: "☕",
    emojiName: "content",
    score: 6,
    textNote: "Slow morning with coffee and a good book. Peace over everything today.",
    visibility: "friends",
    moodCategory: "positive",
    reactions: [{ emoji: "✨", count: 1 }],
    createdAt: new Date(Date.now() - 2 * 3600000),
    expiresAt: new Date(Date.now() + 22 * 3600000),
  },
];
