'use client';

import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, ArrowUp } from 'lucide-react';

const Page = () => {
  return (
    <div className="bg-black text-gray-300">
      <footer className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://wallpapers.com/images/hd/dark-sky-background-1920-x-1200-l1tp14u0zbscfcv8.jpg"
            alt="Footer background"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Connected</h3>
              <p className="text-sm mb-6">Get updates on events and inspiration.</p>

              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Email*"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 rounded"
                />

                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded transition"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>

            {/* Pages */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Pages</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Ministries</a></li>
                <li><a href="#" className="hover:text-white">Sermons</a></li>
                <li><a href="#" className="hover:text-white">Our Campaigns</a></li>
                <li><a href="#" className="hover:text-white">Events</a></li>
              </ul>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Location</h3>
              <p className="text-sm leading-relaxed">
                CITAM Kisumu Church<br />
                P.O. Box 19060 – 40100<br />
                Kisumu, Kenya
              </p>
            </div>

            {/* Contact – UPDATED */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>

              <p className="text-sm mb-2">Tel:</p>
              <p className="text-sm">+254 713 348 463</p>
              <p className="text-sm mb-4">+254 709 861 370</p>

              <p className="text-sm mb-2">
                Email:{' '}
                <a
                  href="mailto:citamkisumu@citam.org"
                  className="hover:text-white underline"
                >
                  citamkisumu@citam.org
                </a>
              </p>

              <p className="text-sm mb-6">
                Website:{' '}
                <a
                  href="https://www.citamkisumu.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline"
                >
                  www.citamkisumu.org
                </a>
              </p>

              <div className="flex gap-4">
                <a href="#" className="hover:text-blue-400">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-pink-400">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-6 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-1">
              CITAM KISUMU CHURCH
            </h2>
            <p className="text-xs text-gray-500">
              © 2026 CITAM Kisumu Church. All rights reserved.
            </p>
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </footer>
    </div>
  );
};

export default Page;
