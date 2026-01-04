'use client';

import { useState, useEffect } from 'react';

interface QuoteResponse {
  quote: string;
  author: string;
  timestamp: string;
}

export default function Home() {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/quote');
      if (!response.ok) throw new Error('Failed to fetch quote');
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError('Failed to load quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16 mt-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
            Random Quote API
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A simple REST API that returns inspirational quotes to inspire your projects
          </p>
        </div>

        {/* Live Demo Section */}
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-8 sm:p-12 mb-12 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Live Demo</h2>
          
          <div className="bg-zinc-900/80 rounded-xl p-8 mb-6 min-h-[200px] flex flex-col justify-center border border-zinc-700/30">
            {loading ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
                <p className="text-zinc-400">Loading quote...</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={fetchQuote}
                  className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : quote ? (
              <div className="text-center">
                <blockquote className="text-2xl sm:text-3xl font-medium text-white mb-6 leading-relaxed">
                  &ldquo;{quote.quote}&rdquo;
                </blockquote>
                <p className="text-lg text-zinc-400">— {quote.author}</p>
              </div>
            ) : null}
          </div>

          <button
            onClick={fetchQuote}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Get New Quote'}
          </button>
        </div>

        {/* API URL Section */}
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-8 mb-6 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4">API Endpoint</h3>
          <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700/30 flex items-center justify-between gap-4">
            <code 
              id="api-url"
              className="text-green-400 text-sm break-all flex-1"
            >
              https://quotejar.vercel.app/api/quote
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText('https://quotejar.vercel.app/api/quote');
                const btn = document.getElementById('copy-btn');
                if (btn) {
                  const originalText = btn.textContent;
                  btn.textContent = 'Copied!';
                  setTimeout(() => {
                    if (btn) btn.textContent = originalText;
                  }, 2000);
                }
              }}
              id="copy-btn"
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded-lg transition-colors whitespace-nowrap"
            >
              Copy URL
            </button>
          </div>
          <p className="text-zinc-400 text-sm mt-4">
            Returns a random quote with author and timestamp
          </p>
        </div>

        {/* API Documentation Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-8 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Method</h3>
            <div className="bg-zinc-900 rounded-lg p-4 mb-4 border border-zinc-700/30">
              <code className="text-green-400 text-sm">
                GET
              </code>
            </div>
            <p className="text-zinc-400 text-sm">
              No authentication required
            </p>
          </div>

          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-8 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Response Format</h3>
            <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700/30 overflow-x-auto">
              <pre className="text-zinc-300 text-xs">
{`{
  "quote": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs",
  "timestamp": "2024-01-01T00:00:00.000Z"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-8 sm:p-12 shadow-xl">
          <h3 className="text-2xl font-semibold text-white mb-6">Usage Examples</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-3">JavaScript (Fetch)</h4>
              <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700/30 overflow-x-auto">
                <pre className="text-zinc-300 text-sm">
{`fetch('https://quotejar.vercel.app/api/quote')
  .then(res => res.json())
  .then(data => console.log(data));`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-3">JavaScript (Async/Await)</h4>
              <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700/30 overflow-x-auto">
                <pre className="text-zinc-300 text-sm">
{`const response = await fetch('https://quotejar.vercel.app/api/quote');
const quote = await response.json();
console.log(quote);`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-3">cURL</h4>
              <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700/30 overflow-x-auto">
                <pre className="text-zinc-300 text-sm">
{`curl https://quotejar.vercel.app/api/quote`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
