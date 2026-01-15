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
    name: "Rev. Geoffrey Ong’ondo",
    title: "Senior Pastor",
    bio: "Passionate about discipleship and vibrant worship.",
    image: { src: "/images/Rev. Geoffrey Ong’ondo.png", alt: "Rev. Geoffrey Ong’ondo" },
  },
  {
    id: 2,
    name: "Rev. Jane Ong’ondo",
    title: "Prayer & Missions Pastor",
    bio: "Leading intercession and global outreach teams.",
    image: { src: "/images/Rev Jane Ongondo..jpeg", alt: "Rev. Jane Ong’ondo" },
  },
  {
    id: 3,
    name: "Rev. Patrick Kiprop",
    title: "Family Life Pastor",
    bio: "Building strong families rooted in Christ.",
    image: { src: "/images/Rev P Kiprop.jpg", alt: "Rev. Patrick Kiprop" },
  },
  {
    id: 4,
    name: "Rev. Petronila Wegulo",
    title: "Youth & NextGen",
    bio: "Equipping the next generation for kingdom impact.",
    image: { src: "/images/Rev Petronila Wegulo.jpeg", alt: "Rev. Petronila Wegulo" },
  },

  {
    id: 5,
    name: "Pastor Florence Iminza",
    title: "Youth & NextGen",
    bio: "Equipping the next generation for kingdom impact.",
    image: { src: "/images/Pastor Florence Iminza.jpeg", alt: "Pastor Florence Iminza" },
  },
  {
    id: 6,
    name: "Pastor Epiphany Nyirahabimana",
    title: "Intercessory and Prayer Pastor",
    bio: "Equipping the next generation for kingdom impact.",
    image: { src: "/images/Pastor2.jpeg", alt: "Pastor Epiphany Nyirahabimana" },
  },
];

const recentSermons = [
  {
    id: "sermon-1",
    title: "Anchored Hope",
    date: "January 12, 2026",
    speaker: "Rev. Geoffrey Ong’ondo",
    excerpt: "Last Sunday's message on faith — how Hebrews 6:19 anchors our hope.",
    youtubeId: "sDhq-kYttyU",
    thumbnail: "https://i.ytimg.com/vi/sDhq-kYttyU/mqdefault.jpg",
  },
  {
    id: "sermon-2",
    title: "The Spirit-Filled Life",
    date: "January 5, 2026",
    speaker: "Rev. Geoffrey Ong’ondo",
    excerpt: "Live from CITAM Kisumu — Rev. Geoffrey Ong’ondo on walking by faith.",
    youtubeId: "HCu7klZSpD8",
    thumbnail: "https://i.ytimg.com/vi/HCu7klZSpD8/mqdefault.jpg",
  },
  {
    id: "sermon-3",
    title: "Faith for Families",
    date: "December 28, 2025",
    speaker: "Rev. Patrick Kiprop",
    excerpt: "Rev. Patrick Kiprop preaching — family faith and practical steps to build prayer at home.",
    youtubeId: "VU6gOan7amY",
    thumbnail: "https://i.ytimg.com/vi/VU6gOan7amY/mqdefault.jpg",
  },
  {
    id: "sermon-4",
    title: "Revive Us Again",
    date: "December 21, 2025",
    speaker: "Rev. Geoffrey Ong’ondo",
    excerpt: "Rev. Geoffrey Ong’ondo — a call to revival and renewed faith (recorded live).",
    youtubeId: "h6kHOcMSqu4",
    thumbnail: "https://i.ytimg.com/vi/h6kHOcMSqu4/mqdefault.jpg",
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
                        src={pastor.image.src}
                        alt={pastor.image.alt || pastor.name}
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
