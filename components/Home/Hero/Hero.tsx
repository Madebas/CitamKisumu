"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, CalendarDays, PlayCircle, MapPin } from "lucide-react";

const serviceTimes = [
  { title: "Prayer Session", time: "7:30am" },
  { title: "1st Service", time: "8:30am" },
  { title: "2nd Service", time: "11:00am" },
];

const heroStats = [
  { label: "Safari Groups", value: "34", detail: "weekly fellowships" },
  { label: "Weekly Attendance", value: "2.5K", detail: "across services" },
  { label: "Nations Reached", value: "18", detail: "via online church" },
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = useMemo(
    () => [
      { src: "/images/HeroSectionMain.png", alt: "Congregation worshipping" },
      { src: "/images/HeroSectionMain2.png", alt: "Hands lifted in praise" },
      { src: "/images/herosection1.jpg", alt: "City outreach" },
      { src: "/images/herosection2.jpg", alt: "Youth worship" },
      { src: "/images/Herosection3.jpg", alt: "Prayer gathering" },
      { src: "/images/herosection7.jpeg", alt: "Theme" },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nextIndex = (currentImage + 1) % images.length;
    const img = new window.Image();
    img.src = images[nextIndex].src;
  }, [currentImage, images]);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden"
    >
      {/* Background images with crossfade */}
      <div className="absolute inset-0">
        {/* Lighter base overlay – allows ~60% light through */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Very subtle radial vignette – darkens edges/center lightly */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 70%, transparent 100%)",
          }}
        />

        {/* Light reddish gradient – keeps warmth without heavy darkening */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#2b050b]/20 to-black/35 z-10" />

        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              priority={currentImage <= 1}
              quality={85}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content with stronger text shadows for readability */}
      <div className="relative z-30 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20 lg:py-28 flex flex-col gap-12 lg:gap-16">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] border border-white/30 shadow-lg">
            <Radio className="w-4 h-4" aria-hidden="true" />
            Live Church Family
          </div>

          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
            {/* Left – Main text with enhanced drop-shadow */}
            <div className="space-y-6 lg:space-y-8 text-white">
              <p className="text-sm sm:text-base uppercase tracking-[0.5em] text-red-100 font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                Christ is the Answer Ministries
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                A Community{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-300 to-amber-200">
                  of Faith for All
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-2xl drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)]">
                Worship with us in person at CITAM Kisumu or join our global online campus.
                Encounter the Word, authentic community, and the transforming presence of Jesus every week.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#2c0508] font-semibold shadow-xl hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-300">
                  <CalendarDays className="w-5 h-5" aria-hidden="true" />
                  Plan a Visit
                </button>
                <a
                  href="https://www.youtube.com/@citamkisumuchurch/live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border-2 border-white/70 text-white font-semibold hover:bg-white/10 transition-all duration-300 shadow-lg"
                >
                  <PlayCircle className="w-5 h-5" aria-hidden="true" />
                  Watch Live Stream
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="bg-white/15 backdrop-blur-lg border border-white/15 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 text-red-100 drop-shadow-md">
                <MapPin className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">CITAM Kisumu Church • Nairobi Road</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {serviceTimes.map((slot) => (
                  <div
                    key={slot.title}
                    className="rounded-2xl bg-black/20 border border-white/10 p-4 text-center transition-all hover:bg-black/30 shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-wider text-red-100 font-medium">
                      {slot.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">{slot.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-8 pt-4 lg:pt-8">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/15 backdrop-blur-sm border border-white/15 p-6 text-center lg:text-left text-white flex flex-col gap-1 transition-all hover:bg-white/20 drop-shadow-lg"
            >
              <p className="text-xs sm:text-sm uppercase tracking-wider text-red-100 font-medium">
                {stat.label}
              </p>
              <p className="text-3xl sm:text-4xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-200">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;