"use client";

import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "@/components/Helper/SectionHeading";
import { Calendar, Clock, BookOpenCheck, Heart } from "lucide-react";

const devotionPlan = [
  {
    day: "Monday",
    focus: "Prayer & Consecration",
    scripture: "Romans 12:1-2",
  },
  {
    day: "Wednesday",
    focus: "Word Immersion",
    scripture: "Psalm 119:105",
  },
  {
    day: "Friday",
    focus: "Community Outreach",
    scripture: "James 1:27",
  },
];

const bibleStructure = [
  { book: "Genesis", chapters: 50 },
  { book: "Exodus", chapters: 40 },
  { book: "Leviticus", chapters: 27 },
  { book: "Numbers", chapters: 36 },
  { book: "Deuteronomy", chapters: 34 },
  { book: "Joshua", chapters: 24 },
  { book: "Judges", chapters: 21 },
  { book: "Ruth", chapters: 4 },
  { book: "1 Samuel", chapters: 31 },
  { book: "2 Samuel", chapters: 24 },
  { book: "1 Kings", chapters: 22 },
  { book: "2 Kings", chapters: 25 },
  { book: "1 Chronicles", chapters: 29 },
  { book: "2 Chronicles", chapters: 36 },
  { book: "Ezra", chapters: 10 },
  { book: "Nehemiah", chapters: 13 },
  { book: "Esther", chapters: 10 },
  { book: "Job", chapters: 42 },
  { book: "Psalms", chapters: 150 },
  { book: "Proverbs", chapters: 31 },
  { book: "Ecclesiastes", chapters: 12 },
  { book: "Song of Solomon", chapters: 8 },
  { book: "Isaiah", chapters: 66 },
  { book: "Jeremiah", chapters: 52 },
  { book: "Lamentations", chapters: 5 },
  { book: "Ezekiel", chapters: 48 },
  { book: "Daniel", chapters: 12 },
  { book: "Hosea", chapters: 14 },
  { book: "Joel", chapters: 3 },
  { book: "Amos", chapters: 9 },
  { book: "Obadiah", chapters: 1 },
  { book: "Jonah", chapters: 4 },
  { book: "Micah", chapters: 7 },
  { book: "Nahum", chapters: 3 },
  { book: "Habakkuk", chapters: 3 },
  { book: "Zephaniah", chapters: 3 },
  { book: "Haggai", chapters: 2 },
  { book: "Zechariah", chapters: 14 },
  { book: "Malachi", chapters: 4 },
  { book: "Matthew", chapters: 28 },
  { book: "Mark", chapters: 16 },
  { book: "Luke", chapters: 24 },
  { book: "John", chapters: 21 },
  { book: "Acts", chapters: 28 },
  { book: "Romans", chapters: 16 },
  { book: "1 Corinthians", chapters: 16 },
  { book: "2 Corinthians", chapters: 13 },
  { book: "Galatians", chapters: 6 },
  { book: "Ephesians", chapters: 6 },
  { book: "Philippians", chapters: 4 },
  { book: "Colossians", chapters: 4 },
  { book: "1 Thessalonians", chapters: 5 },
  { book: "2 Thessalonians", chapters: 3 },
  { book: "1 Timothy", chapters: 6 },
  { book: "2 Timothy", chapters: 4 },
  { book: "Titus", chapters: 3 },
  { book: "Philemon", chapters: 1 },
  { book: "Hebrews", chapters: 13 },
  { book: "James", chapters: 5 },
  { book: "1 Peter", chapters: 5 },
  { book: "2 Peter", chapters: 3 },
  { book: "1 John", chapters: 5 },
  { book: "2 John", chapters: 1 },
  { book: "3 John", chapters: 1 },
  { book: "Jude", chapters: 1 },
  { book: "Revelation", chapters: 22 },
];

const TOTAL_PLAN_DAYS = 366;

const buildReadingPlan = () => {
  const plan: string[] = [];
  outer: for (const { book, chapters } of bibleStructure) {
    for (let chapter = 1; chapter <= chapters; chapter++) {
      plan.push(`${book} ${chapter}:1`);
      if (plan.length >= TOTAL_PLAN_DAYS) {
        break outer;
      }
    }
  }
  return plan;
};

const getDayIndex = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.min(TOTAL_PLAN_DAYS - 1, Math.floor(diff / 86400000));
};

const DailyDevotion = () => {
  const today = useMemo(() => new Date(), []);
  const dayIndex = useMemo(() => getDayIndex(today), [today]);
  const readingPlan = useMemo(() => buildReadingPlan(), []);
  const todaysReference = readingPlan[dayIndex];
  const fallbackText = todaysReference
    ? `Meditate on ${todaysReference} throughout your day.`
    : "Meditate on God's Word today.";

  const [verse, setVerse] = useState({
    reference: todaysReference ?? "Psalm 27:1",
    text: "The Lord is my light and my salvation—whom shall I fear?",
  });

  useEffect(() => {
    if (!todaysReference || typeof window === "undefined") return;

    const storageKey = `devotion-verse-${today.getFullYear()}-${dayIndex}`;

    const cached = window.localStorage.getItem(storageKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setVerse(parsed);
        return;
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }

    const controller = new AbortController();

    const fetchVerse = async () => {
      try {
        const response = await fetch(
          `https://bible-api.com/${encodeURIComponent(todaysReference)}?translation=kjv`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Failed to fetch verse");
        const data = await response.json();
        const payload = {
          reference: data.reference ?? todaysReference,
          text: (data.text || fallbackText).trim(),
        };
        setVerse(payload);
        window.localStorage.setItem(storageKey, JSON.stringify(payload));
      } catch {
        setVerse({ reference: todaysReference, text: fallbackText });
      }
    };

    fetchVerse();

    return () => controller.abort();
  }, [dayIndex, today, todaysReference, fallbackText]);

  return (
    <section id="daily-devotion" className="bg-[#fffaf4] py-20">
      <div className="w-[90%] lg:w-[80%] mx-auto space-y-12">
        <div className="text-center">
          <SectionHeading heading="Daily Devotion" />
          <p className="mt-4 text-gray-600">
            Start each day centered on Christ with guided scripture, prayer points, and
            community rhythms designed for individuals, families, and safari groups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8">
          {/* Feature card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                  Today&apos;s Highlight
                </p>
                <h3 className="text-2xl font-semibold text-[#6b0f1a] mt-1">
                  Morning devotion: Walking in God&apos;s Light
                </h3>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#e67e22] bg-orange-50 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" /> 20 min
              </span>
            </div>

            <div className="bg-gradient-to-r from-[#6b0f1a] to-[#c0392b] text-white rounded-2xl p-6 space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Today&apos;s Scripture</p>
              <p className="text-lg font-semibold">{verse.reference}</p>
              <p className="text-sm text-white/80 whitespace-pre-line">{verse.text}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpenCheck className="w-5 h-5 text-[#e67e22]" />
                  <span className="font-semibold text-gray-800">Reflection</span>
                </div>
                <p className="text-sm text-gray-600">
                  Invite the Holy Spirit to illuminate areas of your life that need His light. Journal what He reveals.
                </p>
              </div>
              <div className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-5 h-5 text-[#6b0f1a]" />
                  <span className="font-semibold text-gray-800">Prayer Focus</span>
                </div>
                <p className="text-sm text-gray-600">
                  Pray for courage to carry Christ&apos;s light into your workplace, school, and safari group.
                </p>
              </div>
            </div>
          </div>

          {/* Schedule card */}
          <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#e67e22]" />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Weekly Rhythm</p>
                <h4 className="text-xl font-semibold text-gray-900">CITAM Kisumu Devotion Plan</h4>
              </div>
            </div>

            <ul className="space-y-4">
              {devotionPlan.map((item) => (
                <li
                  key={item.day}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-[#e67e22] font-semibold">
                    {item.day.slice(0, 3)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#6b0f1a]">{item.day}</p>
                    <p className="text-base font-medium text-gray-900">{item.focus}</p>
                    <p className="text-sm text-gray-600">{item.scripture}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              className="w-full py-3 rounded-2xl bg-[#e67e22] text-white font-semibold hover:bg-[#cf6d17] transition"
              type="button"
            >
              Download Devotion Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyDevotion;
