"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const SafariGroups: React.FC = () => {
  // Google Form URL for registration
  const googleFormUrl = "https://docs.google.com/forms/d/your-form-id-here/viewform";

  return (
    <section id="safarigroups" className="py-20 bg-[#fff8f0]">
      <div className="container mx-auto w-[85%] flex flex-col md:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="relative w-full md:w-1/2 h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1528938102132-4a9276b8e320?w=1200&auto=format&fit=crop&q=60"
            alt="CITAM Kisumu Safari Groups"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Safari Groups at CITAM Kisumu
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Safari Groups are small family fellowships within CITAM Kisumu that
            meet weekly in different neighborhoods for prayer, Bible study,
            fellowship, and care. They help members grow in faith, build strong
            Christian relationships, and extend love to the community.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 max-md:flex-col">
            <Link
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#e67e22] text-white font-semibold rounded-xl hover:bg-[#cf6d17] transition"
            >
              Join One
            </Link>

            <Link 
              className="px-6 py-3 border border-[#e67e22] text-[#e67e22] font-semibold rounded-xl hover:bg-[#e67e22] hover:text-white transition" 
              href="../safarigroupsdetails"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafariGroups;