// src/components/chat-input.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
  disabled?: boolean;             // when the bot is thinking, we disable input
  onSend: (message: string) => void; // parent gives us a function to call
};

export function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  // Send helper: trim text, ignore empty, call parent, then clear box
  const send = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="flex items-end gap-2">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message…"
        className="min-h-[60px]"
        disabled={disabled}
        onKeyDown={(e) => {
          // Press Enter to send; Shift+Enter makes a new line
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }}
      />
      <Button onClick={send} disabled={disabled}>
        Send
      </Button>
    </div>
  );
}
