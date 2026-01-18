"use client";

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 4,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export const destinationData = [
  {
    id: 1,
    img: "/images/herosection5.jpg",
    country: "France",
    travelers: "150,000"
  },
  {
    id: 2,
    img: "/images/herosection5.jpg",
    country: "USA",
    travelers: "250,000"
  },
  {
    id: 3,
    img: "/images/herosection5.jpg",
    country: "Italy",
    travelers: "180,000"
  },
  // Add more items here if needed, e.g.:
  {
    id: 4,
    img: "/images/Herosection3.jpg",
    country: "Your Country 4",
    travelers: "Your Travelers Count"
  },
  {
    id: 5,
    img: "/images/herosection5.jpg",
    country: "Your Country 5",
    travelers: "Your Travelers Count"
  }
];

const AboutMSlider = () => {
  return (
      <Carousel 
        responsive={responsive} 
        infinite={true} 
        autoPlay={true} 
        autoPlaySpeed={5000} 
        keyBoardControl={true}
      >
        {destinationData.map((item) => (
          <div key={item.id} className="slide-item m-3">
            <Image 
              src={item.img} 
              alt={item.country} 
              width={500} 
              height={500} 
              className="object-cover rounded-lg w-full h-full"
            /> 
            <div>
              <h3 className="text-xl font-bold mt-3">{item.country}</h3>
              <p className="text-gray-700">{item.travelers} travelers</p>
            </div>
          </div>
        ))}
      </Carousel>
  );
};

export default AboutMSlider;