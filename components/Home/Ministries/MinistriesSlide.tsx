"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const destinationData = [
  {
    id: 1,
    img: "/images/MediaMinistry.jpg",
    Ministry: "Media Ministry",
    Description:
      "The Media Ministry is dedicated to spreading the message of the church through various media platforms.",
  },
  {
    id: 2,
    img: "/images/Praise&WorshipMinistries.jpg",
    Ministry: "Praise & Worship Ministry",
    Description:
      "The Praise & Worship Ministry leads the congregation in worship through music and song.",
  },
  {
    id: 3,
    img: "/images/UsheringMinistry.jpg",
    Ministry: "Ushering Ministry",
    Description:
      "The Ushering Ministry is dedicated to welcoming and assisting members and visitors during services.",
  },
  {
    id: 4,
    img: "/images/GoldenAgeMinistries.jpg",
    Ministry: "Golden Agers Ministry",
    Description:
      "The Golden Agers Ministry provides support and fellowship for the senior members of the church.",
  },
  {
    id: 5,
    img: "/images/missionMinistries.jpg",
    Ministry: "Mission and Outreach Ministry",
    Description:
      "The Mission and Outreach Ministry focuses on spreading the gospel and serving the community.",
  },
  {
    id: 6,
    img: "/images/PrayerIntersention.jpg",
    Ministry: "Prayer and Intercession Ministry",
    Description:
      "The Prayer and Intercession Ministry is dedicated to praying for the needs of the church and community.",
  },
  {
    id: 7,
    img: "/images/Youthservice.jpg",
    Ministry: "Youth Ministry",
    Description:
      "The Youth Ministry focuses on engaging and empowering the young people of the church.",
  },
  {
    id: 8,
    img: "/images/ChildrenMinistry.jpg",
    Ministry: "Children Ministry",
    Description:
      "The Children Ministry is dedicated to nurturing the spiritual growth of the church's children.",
  },
  {
    id: 9,
    img: "/images/FamilyCareFellowship.jpg",
    Ministry: "Family Care Fellowship",
    Description:
      "The Family Care Fellowship is dedicated to nurturing the spiritual growth of families within the church.",
  },

  
];

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const MinistriesSlider = () => {
  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={5000}
      keyBoardControl
      pauseOnHover
      containerClass="carousel-container py-8"
      itemClass="carousel-item-padding-40-px"
      // ✅ Arrows now show on all devices
    >
      {destinationData.map((item) => (
        <div
          key={item.id}
          className="group m-3 bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="relative w-full h-48">
            <Image
              src={item.img}
              alt={`${item.Ministry} image`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-4 flex flex-col justify-between h-[150px]">
            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
              {item.Ministry}
            </h3>
            <p className="text-sm text-gray-700 line-clamp-3">
              {truncateText(item.Description, 90)}
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#e67e22] hover:text-[#cf6d17] transition-colors group/btn"
            >
              Learn More
              <GoArrowUpRight
                className="text-base transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
              />
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MinistriesSlider;
 