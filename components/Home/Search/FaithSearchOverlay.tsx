"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { X } from "lucide-react";

const API_ERROR = "We could not reach our AI assistant right now. Please try again in a moment.";

export type FaithSearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SearchState = "idle" | "loading" | "answered" | "blocked" | "error";

type SearchResponse = {
  type: "answer" | "blocked" | "error";
  message: string;
};

const FaithSearchOverlay = ({ isOpen, onClose }: FaithSearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>("idle");
  const [response, setResponse] = useState<SearchResponse | null>(null);

  const reset = useCallback(() => {
    setQuery("");
    setState("idle");
    setResponse(null);
  }, []);

  const closeOverlay = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOverlay, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => {
      const input = document.getElementById("faith-search-input") as HTMLInputElement | null;
      input?.focus();
    }, 150);
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setState("loading");
    setResponse(null);

    try {
      const res = await fetch("/api/faith-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmedQuery }),
      });

      if (!res.ok) {
        throw new Error("Failed request");
      }

      const data = (await res.json()) as SearchResponse;
      setResponse(data);
      if (data.type === "answer") setState("answered");
      else if (data.type === "blocked") setState("blocked");
      else setState("error");
    } catch (error) {
      setResponse({ type: "error", message: API_ERROR });
      setState("error");
    }
  };

  const formattedResponse = useMemo(() => {
    if (!response) return null;
    if (response.type === "answer") {
      return response.message
        .split(/\n\s*\n/)
        .map((para, index) => (
          <p key={index} className="mb-2 text-gray-100">
            {para}
          </p>
        ));
    }
    return <p className="text-gray-100">{response.message}</p>;
  }, [response]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-3xl rounded-2xl bg-[#170506] border border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/60">Faith Search</p>
                <h3 className="text-xl font-semibold text-white">Ask about Jesus, Scripture, or church life</h3>
              </div>
              <button
                type="button"
                onClick={closeOverlay}
                className="p-2 rounded-full hover:bg-white/10 text-white"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  id="faith-search-input"
                  type="text"
                  placeholder="Ask a question about the Bible, prayer, Christian life, or CITAM..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-16 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-sm font-semibold bg-white text-black rounded-lg"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="px-6 pb-6 space-y-3 min-h-[150px]">
              {state === "idle" && (
                <p className="text-sm text-white/70">
                  Ask anything about CITAM Kisumu, sermons, devotions, or Christian living. We respond with grace and truth.
                </p>
              )}

              {state === "loading" && (
                <div className="flex items-center gap-3 text-white">
                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <p>Praying over your question...</p>
                </div>
              )}

              {state !== "idle" && response && (
                <div
                  className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-gray-100"
                  aria-live="polite"
                >
                  {formattedResponse}
                </div>
              )}

              <p className="text-xs text-white/40">AI assisted • Powered by Google AI</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FaithSearchOverlay;
