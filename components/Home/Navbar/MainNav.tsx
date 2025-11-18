"use Client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constant/constant";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import SearchBox from "@/components/Helper/SearchBox";

type props = {
  openMainNav: () => void;
};

const MainNav = ({ openMainNav }: props) => {
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
    >
      <div className="flex items-center h-full w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2 absolute left-2">
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
          className="hidden lg:flex items-center space-x-8 relative"
          ref={navLinksRef}
        >
          {navLinks.map((link, index) => (
            <div
              key={link.id}
              className="group"
              ref={(el) => (itemRefs.current[index] = el)}
              onMouseEnter={() => link.submenu && handleMouseEnter(index, link.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={link.url}>
                <div className="flex items-center relative left-32 space-x-1">
                  <p className="text-white text-base font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-red-900 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left">
                    {link.label}
                  </p>
                  {/* Dropdown Icon */}
                  {link.submenu && (
                    <RiArrowDropDownLine
                      className={`text-white text-2xl transition-transform duration-300 ${
                        activeSubmenu === link.id ? "rotate-180" : "rotate-0"
                      }`}
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
          <SearchBox />
          <button className="md:px-2 md:py-1.5 px-6 py-2 text-black text-base bg-white hover:bg-gray-200 transition-all duration-200 rounded-lg">
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
