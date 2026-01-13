"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const pastors = [
  {
    id: 1,
    name: "Rev. John Ochieng",
    title: "Senior Pastor",
    bio: "Passionate about discipleship and vibrant worship.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Pastor Grace Achieng",
    title: "Prayer & Missions Pastor",
    bio: "Leading intercession and global outreach teams.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Pastor Daniel Were",
    title: "Family Life Pastor",
    bio: "Building strong families rooted in Christ.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Pastor Lydia Atieno",
    title: "Youth & NextGen",
    bio: "Equipping the next generation for kingdom impact.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60",
  },
];

const recentSermons = [
  {
    id: "sermon-1",
    title: "Anchored Hope",
    date: "January 12, 2026",
    speaker: "Rev. John Ochieng",
    excerpt: "Discover how Hebrews 6:19 keeps us steady in uncertain times.",
    youtubeId: "ysz5S6PUM-U",
    thumbnail: "https://i.ytimg.com/vi/ysz5S6PUM-U/mqdefault.jpg",
  },
  {
    id: "sermon-2",
    title: "The Spirit-Filled Life",
    date: "January 5, 2026",
    speaker: "Pastor Grace Achieng",
    excerpt: "A practical walk through Galatians 5 on life in the Spirit.",
    youtubeId: "ScMzIvxBSi4",
    thumbnail: "https://i.ytimg.com/vi/ScMzIvxBSi4/mqdefault.jpg",
  },
  {
    id: "sermon-3",
    title: "Faith for Families",
    date: "December 29, 2025",
    speaker: "Pastor Daniel Were",
    excerpt: "Building altars of prayer at home for generational impact.",
    youtubeId: "2Xc9gXyf2G4",
    thumbnail: "https://i.ytimg.com/vi/2Xc9gXyf2G4/mqdefault.jpg",
  },
  {
    id: "sermon-4",
    title: "Revive Us Again",
    date: "December 22, 2025",
    speaker: "Pastor Lydia Atieno",
    excerpt: "A call to passionate worship and renewal among youth.",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
  },
];

const SermonSection = () => {
  return (
    <section
      id="sermons"
      className="bg-gradient-to-b from-slate-950 via-[#40070f] to-slate-950 text-white py-16"
      aria-labelledby="sermons-heading"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 space-y-16">
        {/* Upper Section */}
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-sm uppercase tracking-[0.4em] text-red-200">Pastoral Team</p>
            <h2 id="sermons-heading" className="text-3xl md:text-5xl font-extrabold text-white">
              Shepherds after God&apos;s Heart
            </h2>
            <p className="text-base text-gray-300 max-w-3xl mx-auto">
              Meet the servants leading worship, teaching, and pastoral care every week at CITAM Kisumu.
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination, A11y]}
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 6000, pauseOnMouseEnter: true, disableOnInteraction: false }}
              loop
              navigation
              pagination={{ clickable: true }}
              aria-label="Featured pastors carousel"
              className="!pb-12"
            >
              {pastors.map((pastor) => (
                <SwiperSlide key={pastor.id}>
                  <article className="h-full rounded-3xl bg-white/10 backdrop-blur border border-white/10 p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 shadow-lg">
                      <Image
                        src={pastor.image}
                        alt={pastor.name}
                        fill
                        sizes="(max-width: 768px) 60vw, 200px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{pastor.name}</h3>
                    <p className="text-sm text-red-200 font-semibold">{pastor.title}</p>
                    <p className="text-sm text-gray-200 mt-2">{pastor.bio}</p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Lower Section */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-red-200">Latest Messages</p>
              <h3 className="text-3xl font-bold">Fresh Sermons to Strengthen Your Faith</h3>
            </div>
            <Link
              href="/sermons/archive"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold rounded-full shadow-lg"
            >
              Get More Sermons
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {recentSermons.map((sermon) => (
              <article
                key={sermon.id}
                className="rounded-3xl bg-white text-gray-900 flex flex-col shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1"
              >
                <div className="relative w-full h-48 overflow-hidden rounded-t-3xl">
                  <Image
                    src={sermon.thumbnail}
                    alt={`${sermon.title} thumbnail`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-semibold"
                    aria-label={`Watch ${sermon.title}`}
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${sermon.youtubeId}`, "_blank")}
                  >
                    ▶ Watch
                  </button>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-red-500">{sermon.date}</p>
                    <h4 className="text-lg font-semibold text-gray-900">{sermon.title}</h4>
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{sermon.excerpt}</p>
                  <p className="text-sm font-semibold text-gray-900">
                    Speaker: <span className="text-red-600">{sermon.speaker}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SermonSection;
