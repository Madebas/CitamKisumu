"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constant/constant";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import SearchBox from "@/components/Helper/SearchBox";

type MainNavProps = {
  openMainNav: () => void;
  openSearch: () => void;
  openGive: () => void;
  isGiveOpen: boolean;
};

const MainNav = ({ openMainNav, openSearch, openGive, isGiveOpen }: MainNavProps) => {
  const [MainNavBg, setMainNavBg] = useState(false);

  // submenu control
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [submenuLeft, setSubmenuLeft] = useState<number>(0);

  // refs for positioning
  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setMainNavBg(true);
      if (window.scrollY < 90) setMainNavBg(false);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleMouseEnter = (index: number, id: number) => {
    setActiveSubmenu(id);

    const el = itemRefs.current[index];
    const container = navLinksRef.current;
    if (!el || !container) return;

    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const submenuW = 224; // w-56 = 14rem
    let left = rect.left - containerRect.left;

    const maxLeft = containerRect.width - submenuW - 8;
    if (left > maxLeft) left = Math.max(maxLeft, 8);
    if (left < 8) left = 8;

    setSubmenuLeft(left);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  return (
    <div
      className={`${
        MainNavBg ? "bg-red-950 shadow-md" : "fixed"
      } transition-all duration-300 h-[12vh] z-[1000] fixed w-full`}
      role="navigation"
      aria-label="Primary"
    >
      <div className="flex items-center h-full w-[90%] xl:w-[80%] mx-auto px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2 absolute left-2 lg:static lg:left-0 flex-shrink-0">
          <div className="w-16 h-16 rounded-full flex items-center justify-center">
            <Image
              src="/images/CITAMLOGO.png"
              alt="logo"
              width={50}
              height={50}
              className="object-contain drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
            />
          </div>
          <h1 className="text-sm md:text-xl text-white uppercase font-bold">
            CITAM <br /> KISUMU.
          </h1>
        </div>

        {/* Navigation Links */}
        <div
          className="hidden lg:flex items-center flex-wrap gap-6 xl:gap-8 relative lg:ml-8 xl:ml-12"
          ref={navLinksRef}
        >
          {navLinks.map((link, index) => (
            <div
              key={link.id}
              className="group"
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onMouseEnter={() => link.submenu && handleMouseEnter(index, link.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={link.url} aria-haspopup={link.submenu ? "menu" : undefined} aria-expanded={activeSubmenu === link.id}>
                <div className="flex items-center space-x-1">
                  <p className="text-white text-base font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-red-900 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left">
                    {link.label}
                  </p>
                  {link.submenu && (
                    <RiArrowDropDownLine
                      className={`text-white text-2xl transition-transform duration-300 ${
                        activeSubmenu === link.id ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden
                    />
                  )}
                </div>
              </Link>

              {/* Submenu */}
              {link.submenu && (
                <div
                  style={{ left: submenuLeft }}
                  className={`absolute top-full mt-1 z-50 transition-all duration-200 ease-out bg-red-950/95 text-white rounded-lg shadow-lg py-2 w-56
                    ${
                      activeSubmenu === link.id
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                >
                  {link.submenu.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.url}
                      className="block px-4 py-2 hover:bg-red-800 transition-colors duration-200"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Button and Search Box */}
        <div className="flex items-right justify-end space-x-4 ml-auto">
          <SearchBox onClick={openSearch} />
          <button
            onClick={openGive}
            className={`md:px-2 md:py-1.5 px-6 py-2 text-base font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${
              isGiveOpen
                ? "bg-[#c04b37] text-white shadow-lg"
                : "bg-white text-[#3c0d0d] hover:bg-gray-100"
            }`}
            aria-pressed={isGiveOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-5 h-5"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21c-1.657 0-3-1.567-3-3.5S10.343 14 12 14s3 1.567 3 3.5S13.657 21 12 21Zm0 0c4.5 0 8-3.194 8-7.14 0-2.648-2.686-4.694-5.156-3.846-2.618.895-4.882.895-7.5 0C4.874 9.166 2 10.212 2 13.86 2 17.806 5.5 21 10 21"
              />
            </svg>
            Give
          </button>
          <HiBars3BottomRight
            onClick={openMainNav}
            className="w-8 h-8 cursor-pointer text-white lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default MainNav;
