"use client";

import { useState } from "react";
import { ChevronRight, Cloud } from "lucide-react";
import { preview } from "../Context/PreviewContext";
const sidebarItems = ["Examples", "Recent", "Google Drive", "GitHub", "Upload"];

export default function NotebookManager() {
  const { close } = preview();
  const [active, setActive] = useState("Upload");

  return (
    <div className="flex absolute bg-black/20 w-full left-0 top-0 min-h-screen items-center justify-center  p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500" />

        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-5">
          <h2 className="text-2xl text-gray-800">Open notebook</h2>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-56 border-r border-gray-200 py-2">
            {sidebarItems.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`flex w-full items-center justify-between px-6 py-4 text-left text-[15px] transition hover:bg-gray-50 ${
                  active === item
                    ? "font-semibold text-gray-900"
                    : "text-gray-700"
                }`}
              >
                {item}
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16">
            <div className="relative flex h-24 w-32 items-center justify-center">
              <Cloud
                className="absolute left-2 top-0 h-16 w-16 fill-gray-300 text-gray-300"
                strokeWidth={0}
              />
              <Cloud
                className="absolute right-0 bottom-0 h-14 w-14 fill-gray-200 text-gray-200"
                strokeWidth={0}
              />
            </div>

            <button className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
              Browse
            </button>

            <p className="text-sm text-gray-500">or drag a file here</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-8 py-4">
          <button
            onClick={close}
            className="text-sm font-medium text-gray-800 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
