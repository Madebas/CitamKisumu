"use client";

import React from 'react';
import SectionHeading from '@/components/Helper/SectionHeading';
import MinistriesSlider from './MinistriesSlide';

const Ministries = () => {
  return (
    <section id="ministries" className="bg-[#fffaf4] py-20">
      <div className="w-[90%] lg:w-[80%] mx-auto space-y-12">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-[#c04b37]">Serve & Grow</p>
          <SectionHeading heading="CITAM Ministries" />
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover places to serve, lead, and be discipled. From media to missions, there is a transforming ministry for every gift.
          </p>
        </div>

        <div className="mt-8">
          <MinistriesSlider />
        </div>
      </div>
    </section>
  );
};

export default Ministries;
