"use client";

import React, { useEffect, useMemo, useState } from "react";
import SectionHeading from "@/components/Helper/SectionHeading";
import { Calendar, Clock, BookOpenCheck, Heart } from "lucide-react";

// --- Dynamic Content Data ---
// For production, these would be loaded from a CMS or API. Here, we use static arrays for demo.
const dailyDevotions = [
  {
    reference: "Psalm 27:1",
    reflection: "God is our light and salvation; reflect on areas where you need His guidance today.",
    prayer: "Pray for boldness to trust God in every circumstance.",
  },
  {
    reference: "Isaiah 40:31",
    reflection: "Those who hope in the Lord renew their strength. Consider what it means to wait on God.",
    prayer: "Ask God for renewed strength and patience in your journey.",
  },
  {
    reference: "Philippians 4:13",
    reflection: "Christ empowers us for all things. Meditate on His sufficiency in your weakness.",
    prayer: "Pray for Christ's strength to be made perfect in your weakness.",
  },
  {
    reference: "Romans 8:28",
    reflection: "God works all things for good. Reflect on His faithfulness in your life.",
    prayer: "Thank God for His purpose and goodness in every situation.",
  },
  {
    reference: "Proverbs 3:5-6",
    reflection: "Trust in the Lord with all your heart. Surrender your plans to Him today.",
    prayer: "Pray for a heart that trusts God fully and submits to His will.",
  },
  // ...add as many as needed for each day of the year, ensuring no repetition
];

const weeklyRhythmPlan = [
  // Each entry is a week, with unique verses, reflections, and prayers for Monday and Wednesday
  {
    week: 1,
    monday: {
      reference: "Matthew 6:33",
      reflection: "Seek first God's kingdom. Reflect on your priorities this week.",
      prayer: "Pray for a heart that seeks God above all else.",
    },
    wednesday: {
      reference: "Psalm 23:1",
      reflection: "The Lord is my shepherd. Consider how God provides for you.",
      prayer: "Thank God for His provision and guidance.",
    },
  },
  {
    week: 2,
    monday: {
      reference: "James 1:5",
      reflection: "If you lack wisdom, ask God. Reflect on areas where you need His wisdom.",
      prayer: "Pray for wisdom in your decisions this week.",
    },
    wednesday: {
      reference: "John 14:27",
      reflection: "Jesus gives peace. Meditate on His peace in your heart.",
      prayer: "Ask God to fill you with His peace amid challenges.",
    },
  },
  // ...add more weeks as needed, ensuring no repetition
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


// --- Utility Functions ---
const getDayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
};

const getWeekOfYear = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDay.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDay.getDay() + 1) / 7);
};

const getDayIndex = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.min(TOTAL_PLAN_DAYS - 1, Math.floor(diff / 86400000));
};


const DailyDevotion = () => {
  const today = useMemo(() => new Date(), []);
  // --- Daily Devotion ---
  const dayOfYear = useMemo(() => getDayOfYear(today), [today]);
  const dailyIndex = dayOfYear % dailyDevotions.length;
  const daily = dailyDevotions[dailyIndex];

  // --- Weekly Rhythm ---
  const weekOfYear = useMemo(() => getWeekOfYear(today), [today]);
  const weekIndex = (weekOfYear - 1) % weeklyRhythmPlan.length;
  const weekly = weeklyRhythmPlan[weekIndex];

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
              <p className="text-lg font-semibold">{daily.reference}</p>
              <p className="text-sm text-white/80 whitespace-pre-line">{daily.reflection}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpenCheck className="w-5 h-5 text-[#e67e22]" />
                  <span className="font-semibold text-gray-800">Reflection</span>
                </div>
                <p className="text-sm text-gray-600">
                  {daily.reflection}
                </p>
              </div>
              <div className="border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-5 h-5 text-[#6b0f1a]" />
                  <span className="font-semibold text-gray-800">Prayer Focus</span>
                </div>
                <p className="text-sm text-gray-600">
                  {daily.prayer}
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
              {/* Monday */}
              <li className="flex items-start gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-[#e67e22] font-semibold">
                  Mon
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#6b0f1a]">Monday <span className="text-xs text-gray-500">(5:00 AM - 6:00 AM)</span></p>
                  <p className="text-base font-medium text-gray-900">Online Prayers via Zoom</p>
                  <p className="text-sm text-gray-600">{weekly.monday.reference}</p>
                  <p className="text-sm text-gray-600">{weekly.monday.reflection}</p>
                  <p className="text-sm text-gray-600">{weekly.monday.prayer}</p>
                </div>
              </li>
              {/* Wednesday */}
              <li className="flex items-start gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-[#e67e22] font-semibold">
                  Wed
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#6b0f1a]">Wednesday <span className="text-xs text-gray-500">(5:00 PM - 7:00 PM)</span></p>
                  <p className="text-base font-medium text-gray-900">Midweek Encounter Service</p>
                  <p className="text-sm text-gray-600">{weekly.wednesday.reference}</p>
                  <p className="text-sm text-gray-600">{weekly.wednesday.reflection}</p>
                  <p className="text-sm text-gray-600">{weekly.wednesday.prayer}</p>
                </div>
              </li>
              {/* Monthly Fellowship (3rd Saturday) */}
              <li className="flex items-start gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-[#e67e22] font-semibold">
                  Sat
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#6b0f1a]">Monthly Fellowship <span className="text-xs text-gray-500">(Every 3rd Saturday)</span></p>
                  <p className="text-base font-medium text-gray-900">Men's Fellowship <span className="text-xs text-gray-500">6:00 AM - 8:30 AM</span></p>
                  <p className="text-base font-medium text-gray-900">Women's Fellowship <span className="text-xs text-gray-500">8:30 AM - 12:00 PM</span></p>
                </div>
              </li>
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
