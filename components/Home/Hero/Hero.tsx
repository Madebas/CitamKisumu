"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    { src: "/images/HeroSectionMain.png", alt: "Hero Section 1" },
    { src: "/images/HeroSectionMain2.png", alt: "Hero Section 2" },
    { src: "/images/herosection1.jpg", alt: "Hero Section 3" },
    { src: "/images/herosection2.jpg", alt: "Hero Section 4" },
    { src: "/images/herosection3.jpg", alt: "Hero Section 5" },
  ];

  // Automatically switch background images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Safe preloading for Next.js (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const nextIndex = (currentImage + 1) % images.length;
      const nextImage = new window.Image();
      nextImage.src = images[nextIndex].src;
    }
  }, [currentImage]);

  // Service times block
  const ServiceTimesBlock = () => (
    <motion.div
      className="absolute bottom-4 right-6 md:bottom-6 md:right-10 p-6 rounded-lg bg-[rgba(128,0,0,0.8)] shadow-lg z-50 max-w-xs"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="flex flex-col gap-1 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
      >
        <motion.h3 className="text-white text-lg font-bold m-0">Sundays</motion.h3>
        <motion.h4 className="text-white text-lg font-semibold m-0">
          7:30am and 12:00pm
        </motion.h4>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
        className="text-gray-300 text-sm italic m-0"
      >
        Second Service Starting at 10:30am
      </motion.p>
    </motion.div>
  );

  return (
    <div className="relative w-full h-[120vh] sm:h-[100vh] overflow-hidden">
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 via-red-800/70 to-black/60 z-20"></div>

      {/* Animated background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority={currentImage === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Hero text */}
      <div className="absolute z-[100] top-[60%] left-0 w-full -translate-y-[50%]">
        <div className="flex items-center justify-start w-full h-full px-6 md:px-10">
          <div>
            <h1 className="font-extrabold mb-2 md:mb-0 text-left text-[36px] md:text-[50px] lg:text-[70px] tracking-[0.4rem] text-white uppercase leading-tight">
              <span className="block text-blue-400">YOUR</span>
              <span className="block text-green-400">COMMUNITY.</span>
              <span className="block text-yellow-500">YOUR CHURCH.</span>
            </h1>

            <p className="text-gray-300 font-bold text-base md:text-lg mt-2 [word-spacing:3px]">
              Where Christ is the Answer
            </p>

            <div className="space-x-6 mt-6 flex flex-wrap gap-3">
              <button className="px-5 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 focus:ring-2 focus:ring-blue-400">
                JOIN US THIS SUNDAY
              </button>
              <button className="px-5 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-all duration-300 focus:ring-2 focus:ring-red-400">
                WATCH LIVE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service times section */}
      <ServiceTimesBlock />
    </div>
  );
};

export default Hero;
