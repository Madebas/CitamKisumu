import { navLinks } from "@/constant/constant";
import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";

type MobileNavProps = {
  showMainNav: boolean;
  closeMainNav: () => void;
  openSearch: () => void;
};

const MobileNav = ({ closeMainNav, showMainNav, openSearch }: MobileNavProps) => {
  const MainNavopen = showMainNav ? "translate-x-0" : "translate-x-[-100%]";
  return (
    <div>
      {/* Overlay */}
      <button
        aria-label="Close menu"
        className={`fixed ${MainNavopen} inset-0 transform transition-all duration-500 z-[1006] bg-red-950 opacity-70 w-full h-screen lg:hidden`}
        onClick={closeMainNav}
      />
      {/* Nav Links */}
      <div className={`text-white ${MainNavopen} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-red-950 space-y-6 z-[1050] lg:hidden`}>
        {navLinks.map((link) => {
          if (link.id === 0) return null;
          const isSearchLink = link.url === "#search";
          return isSearchLink ? (
            <button
              key="search-mobile"
              onClick={() => {
                openSearch();
                closeMainNav();
              }}
              className="text-left text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]"
            >
              Faith Search
            </button>
          ) : (
            <Link key={link.id} href={link.url} onClick={closeMainNav}>
              <p className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]">{link.label}</p>
            </Link>
          );
        })}
        <button
          onClick={() => {
            openSearch();
            closeMainNav();
          }}
          className="text-left text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]"
        >
          Faith Search
        </button>
        {/* close button */}
        <CgClose onClick={closeMainNav} className="absolute top-[0.7rem] right-[1.5rem] sm:w-8 sm:h-8 w-6 h-6" />
      </div>
    </div>
  );
};

export default MobileNav;