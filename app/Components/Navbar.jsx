"use client";

import { useState } from "react";
import { Search, Settings, Grid3x3, X } from "lucide-react";
import Image from "next/image";
export default function Navbar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
   <nav className="w-full flex items-center justify-between px-3 sm:px-6 py-3 bg-white">
  {/* Left */}
  <div className="flex items-center shrink-0">
    <Image
      src="/colab_favicon.png"
      width={50}
      height={50}
      alt="colab_favicon"
    />
  </div>

  {/* Center */}
  <div className=" sm:flex flex-1 lg:ml-20 justify-center px-6">
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-3 bg-[#F1F3F4] hover:bg-[#e8eaed] rounded-full px-4 py-2.5">
        <Search className="w-5 h-5 text-[#5f6368]" />
        <input
          type="text"
          placeholder="Search notebooks"
          className="w-full sm:text-sm  bg-transparent outline-none"
        />
      </div>
    </div>
  </div>

  {/* Right */}
  <div className="flex items-center gap-2 shrink-0">
    <button className="hidden sm:flex p-2 rounded-full hover:bg-[#F1F3F4]">
      <Settings className="w-5 h-5 text-[#5f6368]" />
    </button>

    <button className="p-2 rounded-full hover:bg-[#F1F3F4]">
      <Grid3x3 className="w-5 h-5 text-[#5f6368]" />
    </button>

    <button className="w-9 h-9 rounded-full bg-[#B4004E] text-white flex items-center justify-center">
      M
    </button>
  </div>
</nav>
  );
}