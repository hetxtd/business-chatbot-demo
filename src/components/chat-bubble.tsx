// src/components/chat-bubble.tsx
import React from "react";
import { cn } from "@/lib/utils"; // helper for combining Tailwind classes

// Define the props (inputs) this component expects
type ChatBubbleProps = {
  role: "user" | "assistant"; // who sent the message
  text: string;               // the message text
};

export function ChatBubble({ role, text }: ChatBubbleProps) {
  const isUser = role === "user"; // check if it's you

  return (
    <div
      className={cn(
        "w-full flex my-2",                 // always full width, margin top/bottom
        isUser ? "justify-end" : "justify-start" // user msg on right, bot msg on left
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed", // bubble shape
          isUser
            ? "bg-primary text-primary-foreground" // user style: colored bubble
            : "bg-muted text-muted-foreground"     // bot style: muted bubble
        )}
      >
        {text}
      </div>
    </div>
  );
}
