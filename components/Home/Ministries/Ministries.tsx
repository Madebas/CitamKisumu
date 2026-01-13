"use client";

import React from 'react';
import SectionHeading from '@/components/Helper/SectionHeading';
import MinistriesSlider from './MinistriesSlide';

const Ministries = () => {
  return (
    <div id="ministries" className="pt-20 pb-20">
      {/* Section heading */}
      <SectionHeading heading="CITAM Ministries" />

      {/* Section Content */}
      <div className="mt-14 w-[80%] mx-auto">
        {/* Slider */}
        <MinistriesSlider />
      </div>
    </div>
  );
};

export default Ministries;
