"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Full pastors array – unchanged
const pastors = [
  {
    id: 1,
    name: "Rev. Geoffrey Ong’ondo",
    title: "Senior Pastor",
    image: { src: "/images/Rev-Geoffrey-Ongondo.png", alt: "Rev. Geoffrey Ong’ondo" },
  },
  {
    id: 2,
    name: "Rev. Patrick Kiprop",
    title: "Deputy Senior Pastor",
    image: { src: "/images/Rev P Kiprop.jpg", alt: "Rev. Patrick Kiprop" },
  },
  {
    id: 3,
    name: "Rev. Jane Ong’ondo",
    title: "Pastor",
    image: { src: "/images/Rev Jane Ongondo..jpeg", alt: "Rev. Jane Ong’ondo" },
  },
  {
    id: 4,
    name: "Rev. Petronila Wegulo",
    title: "Pastor",
    image: { src: "/images/Rev Petronila Wegulo.jpeg", alt: "Rev. Petronila Wegulo" },
  },
  {
    id: 5,
    name: "Pastor Florence Iminza",
    title: "Pastor",
    image: { src: "/images/Pastor Florence Iminza.jpeg", alt: "Pastor Florence Iminza" },
  },
  {
    id: 6,
    name: "Pastor Epiphany Nyirahabimana",
    title: "Pastor",
    image: { src: "/images/Pastor2.jpeg", alt: "Pastor Epiphany Nyirahabimana" },
  },
];

interface Sermon {
  id: string;
  title: string;
  date: string;
  speaker: string;
  excerpt: string;
  youtubeId: string;
  thumbnail: string;
}

const SermonSection = () => {
  const [recentSermons, setRecentSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetchSermons = useCallback(async () => {
    try {
      const res = await fetch('/api/youtube-sermons');
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      if (!isMounted.current) return;

      if (data.sermons?.length) {
        setRecentSermons(data.sermons);
        setError(null);
      } else {
        setRecentSermons([]);
        setError('No recent sermons found.');
      }
    } catch (err) {
      console.error('Error fetching sermons:', err);
      if (isMounted.current) {
        setError('Could not load sermons. Please try again later.');
        setRecentSermons([]);
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchSermons();
    // Poll every 30 minutes for new videos
    const interval = setInterval(fetchSermons, 30 * 60 * 1000);
    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, [fetchSermons]);

  return (
    <section
      id="sermons"
      className="bg-gradient-to-b from-slate-950 via-[#40070f] to-slate-950 text-white py-16"
      aria-labelledby="sermons-heading"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 space-y-16">
        {/* Upper Section – Pastors Carousel */}
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
              className="!pb-12 [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:h-auto [&_.swiper-slide]:flex"
            >
              {pastors.map((pastor) => (
                <SwiperSlide key={pastor.id} className="h-auto flex">
                  <article className="w-full h-full min-h-[22rem] sm:min-h-[24rem] rounded-3xl bg-white/10 backdrop-blur border border-white/10 p-7 sm:p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 max-w-[26rem] mx-auto">
                    <div className="relative w-44 h-44 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden mb-5 shadow-lg ring-1 ring-white/15">
                      <Image
                        src={pastor.image.src}
                        alt={pastor.image.alt || pastor.name}
                        fill
                        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 260px, 300px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white leading-snug min-h-[3.25rem] sm:min-h-[3.5rem] flex items-center justify-center">
                      {pastor.name}
                    </h3>
                    <p className="text-sm sm:text-base text-red-200 font-semibold mt-1 min-h-[1.5rem]">
                      {pastor.title}
                    </p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Lower Section – Sermons */}
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

          {loading ? (
            <p className="text-sm text-gray-200">Loading recent sermons…</p>
          ) : error ? (
            <p className="text-sm text-red-300">{error}</p>
          ) : recentSermons.length === 0 ? (
            <p className="text-sm text-gray-200">No sermons available at the moment.</p>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default SermonSection;