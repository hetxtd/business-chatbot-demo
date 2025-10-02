// src/app/chat/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatBubble } from "@/components/chat-bubble";
import { ChatInput } from "@/components/chat-input";
import { Mode, ModeToggle } from "@/components/mode-toggle";

// A single message in the thread
type Msg = { role: "user" | "assistant"; text: string };

export default function ChatPage() {
  // All messages shown on screen
  const [messages, setMessages] = useState<Msg[]>([]);
  // Which mood the bot should use
const [mode, setMode] = useState<Mode>("support");
  // Are we waiting for the server?
  const [loading, setLoading] = useState(false);

  // Called when you press Send in ChatInput
  async function handleSend(userText: string) {
    // 1) Show your message immediately
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setLoading(true);

    try {
      // 2) Ask our server route for a reply
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: userText, mode }),
      });

      // 3) Read the JSON and show the bot bubble
      const data = await res.json();
      const botText = data.reply ?? "Hmm, I couldn't reply.";
      setMessages((m) => [...m, { role: "assistant", text: botText }]);
    } catch (e) {
      // If anything breaks, show an error bubble
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Error talking to the server." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Card className="shadow-lg">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
  <div>
    <CardTitle className="text-xl">Business Chatbot Demo</CardTitle>
    <p className="text-sm text-muted-foreground">
      Support, sales, booking, and tech help in one place.
    </p>
  </div>
  <ModeToggle value={mode} onChange={setMode} />
</CardHeader>


        <CardContent className="space-y-4">
          {/* Message area */}
          <div className="h-[50vh] overflow-y-auto rounded-md border p-3 bg-background">
            {messages.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                Try me! Pick a persona and ask a question below.
              </div>
            ) : (
              messages.map((m, i) => (
                <ChatBubble key={i} role={m.role} text={m.text} />
              ))
            )}
          </div>

          {/* Input area */}
          <ChatInput disabled={loading} onSend={handleSend} />
          {loading && (
            <div className="text-xs text-muted-foreground">Thinking…</div>
          )}
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Business Chatbot demo by Nasir Adewolu. Switch mode to explore roles.

      </p>
    </div>
  );
}
