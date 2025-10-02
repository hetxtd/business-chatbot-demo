// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Business Chatbot Demo</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Built with Next.js and OpenAI. Support, sales, booking, and tech help in one place.
      </p>
      <Link
        href="/chat"
        className="rounded-lg bg-primary text-primary-foreground px-6 py-3 text-lg font-medium shadow hover:opacity-90 transition"
      >
        Try the Chatbot
      </Link>
      <p className="mt-8 text-xs text-muted-foreground">
        Created by Nasir Adewolu
      </p>
    </main>
  );
}
