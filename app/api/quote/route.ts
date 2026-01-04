// app/api/quote/route.ts
import { NextResponse } from 'next/server';

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" }
];

export async function GET() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  return NextResponse.json({
    quote: randomQuote.text,
    author: randomQuote.author,
    timestamp: new Date().toISOString()
  });
}   