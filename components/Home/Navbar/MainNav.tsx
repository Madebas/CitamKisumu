"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [MainNavBg, setMainNavBg] = useState(false);

  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [submenuLeft, setSubmenuLeft] = useState<number>(0);

  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handler = () => {
      setMainNavBg(window.scrollY >= 90);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleMouseEnter = (index: number, id: number) => {
    setActiveSubmenu(id);

    const el = itemRefs.current[index];
    if (!el) return;

    // Get width of the hovered menu item
    const rect = el.getBoundingClientRect();

    const submenuWidth = 224; // w-56

    // Center the submenu under the menu item (most natural feel)
    let left = (rect.width - submenuWidth) / 2;

    // Prevent negative positioning (if menu item is very narrow)
    if (left < 0) left = 0;

    // Alternative styles you can try:
    // left = 0;               // ← left-aligned (original feel)
    // left = -12;             // ← slightly pulled to the left
    // left = 8;               // ← small indent

    setSubmenuLeft(left);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  return (
    <div
      className={`fixed w-full z-[1000] transition-all duration-300 h-16 sm:h-20 lg:h-[12vh]
        ${MainNavBg ? "bg-red-950 shadow-md" : "bg-transparent"}`}
      role="navigation"
      aria-label="Primary"
    >
      <div className="page-shell flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-white/5 ring-1 ring-white/10">
            <Image
              src="/images/Newlogo.jpeg"
              alt="CITAM Kisumu Logo"
              width={54}
              height={54}
              className="object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
              priority
            />
          </div>
          <h1 className="text-white uppercase font-bold leading-tight text-base sm:text-xl tracking-wide">
            CITAM<br />
            <span className="text-red-400">KISUMU</span>
          </h1>
        </div>

        {/* Navigation Links - centered */}
        <div
          ref={navLinksRef}
          className="hidden lg:flex items-center justify-center gap-6 xl:gap-10 flex-1 mx-8"
        >
          {navLinks.map((link, index) => {
            const isActive =
              pathname === link.url || (link.url !== "/" && pathname.startsWith(link.url + "/"));
            const hasSubmenu = !!link.submenu;

            return (
              <div
                key={link.id}
                className="group relative"
                ref={(el) => { itemRefs.current[index] = el; }}
                onMouseEnter={() => hasSubmenu && handleMouseEnter(index, link.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={link.url}
                  className="flex items-center gap-1 py-2"
                  aria-haspopup={hasSubmenu ? "menu" : undefined}
                  aria-expanded={activeSubmenu === link.id}
                >
                  <span className="relative inline-block">
                    <span
                      className={`text-white text-base font-medium transition-colors duration-200
                        ${isActive ? "text-red-300" : "group-hover:text-red-300"}`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`absolute left-0 -bottom-1.5 h-[2.5px] bg-red-900 w-full origin-left transition-transform duration-300
                        ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </span>

                  {hasSubmenu && (
                    <RiArrowDropDownLine
                      className={`text-white text-2xl transition-transform duration-300 ${
                        activeSubmenu === link.id ? "rotate-180" : "rotate-0 group-hover:rotate-180"
                      }`}
                      aria-hidden
                    />
                  )}
                </Link>

                {/* Submenu - now correctly positioned under its parent */}
                {hasSubmenu && (
                  <div
                    style={{ left: `${submenuLeft}px` }}
                    className={`absolute top-full mt-1 z-50 w-56 bg-red-950/95 text-white rounded-lg shadow-lg py-2
                      transition-all duration-200 ease-out
                      ${activeSubmenu === link.id
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"}`}
                  >
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.url}
                        className="block px-4 py-2 hover:bg-red-800 transition-colors duration-200 text-sm"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right side - Search + Give + Mobile menu */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={openSearch}
            className="text-white hover:text-red-300 transition-colors"
            aria-label="Open search"
          >
            <SearchBox onClick={openSearch} />
          </button>

          <button
            onClick={openGive}
            className={`px-5 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 shadow-sm
              ${isGiveOpen
                ? "bg-red-700 text-white shadow-red-900/50"
                : "bg-white text-red-950 hover:bg-gray-100"}`}
            aria-pressed={isGiveOpen}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 21c-1.657 0-3-1.567-3-3.5S10.343 14 12 14s3 1.567 3 3.5S13.657 21 12 21Zm0 0c4.5 0 8-3.194 8-7.14 0-2.648-2.686-4.694-5.156-3.846-2.618.895-4.882.895-7.5 0C4.874 9.166 2 10.212 2 13.86 2 17.806 5.5 21 10 21" />
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