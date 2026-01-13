import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

type SearchBoxProps = {
  onClick?: () => void;
};

const SearchBox = ({ onClick }: SearchBoxProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
      aria-label="Open faith search"
    >
      <HiMagnifyingGlass className="w-6 h-6" />
    </button>
  );
};

export default SearchBox;
