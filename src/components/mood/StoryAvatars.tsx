"use client";

import { FriendStory } from "@/lib/mood-data";
import { useRouter } from "next/navigation";

interface StoryAvatarsProps {
  stories: FriendStory[];
}

export default function StoryAvatars({ stories }: StoryAvatarsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-2 scrollbar-hide">
      {stories.map((story) => (
        <button
          key={story.id}
          onClick={() => {
            if (story.id === "you" && !story.hasCheckedIn) {
              router.push("/checkin");
            } else if (story.hasCheckedIn && story.entryId) {
              router.push(`/story/${story.entryId}`);
            }
          }}
          className="flex flex-col items-center gap-1.5 min-w-[64px] group"
        >
          <div className="relative">
            {/* Ring border */}
            <div
              className={`w-16 h-16 rounded-full p-[2.5px] transition-transform duration-200 group-hover:scale-105 ${
                story.id === "you"
                  ? "bg-gradient-to-br from-[#D4537E] to-[#E8719A]"
                  : story.hasCheckedIn
                  ? `bg-gradient-to-br`
                  : "bg-gray-200"
              }`}
              style={
                story.id !== "you" && story.hasCheckedIn
                  ? {
                      background: `linear-gradient(135deg, ${story.borderColor}, ${story.borderColor}88)`,
                    }
                  : undefined
              }
            >
              {/* Inner avatar */}
              <div className="w-full h-full rounded-full bg-white p-[2px]">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
                  {story.id === "you" && !story.hasCheckedIn ? (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M20 21C20 17.134 16.4183 14 12 14C7.58172 14 4 17.134 4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  ) : (
                    <span className="text-2xl drop-shadow-md">{story.emoji}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Plus badge for "You" */}
            {story.id === "you" && !story.hasCheckedIn && (
              <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] border-2 border-white flex items-center justify-center shadow-sm">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            )}

            {/* Emoji overlay for friends or you */}
            {story.hasCheckedIn && story.emoji && (
              <div className="absolute -bottom-1 -right-1 text-[13px] bg-white rounded-full w-[26px] h-[26px] flex items-center justify-center shadow-lg border border-gray-100 drop-shadow-sm">
                {story.emoji}
              </div>
            )}
          </div>

          <span
            className={`text-xs font-medium truncate max-w-[64px] ${
              story.id === "you" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {story.name}
          </span>
        </button>
      ))}
    </div>
  );
}
