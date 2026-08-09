"use client";
import React from "react";
import {
  List,
  ScanSearch,
  Code,
  ScanEye,
  KeyRound,
  Folder,
  Table2,
} from "lucide-react";
import { MiniRightBarPreview } from "../Context/PreviewContext";

const sidebarItems = [
  { id: "search", icon: ScanSearch, label: "Search" },
  { id: "code", icon: Code, label: "Code" },
  { id: "focus", icon: ScanEye, label: "Focus" },
  { id: "key", icon: KeyRound, label: "Secrets" },
  { id: "folder", icon: Folder, label: "Files" },
  { id: "table", icon: Table2, label: "Table" },
];

const Sidebar = () => {
  const { open, close, isOpen, activeSection } = MiniRightBarPreview();

  const handleClick = (id) => {
    // toggle: clicking the already-active item closes the panel
    if (isOpen && activeSection === id) {
      close();
    } else {
      open(id);
    }
  };

  return (
    <div className="hidden lg:inline-flex max-w-2xl max-h-90 flex-col items-start gap-1 rounded-2xl bg-gray-100 p-2">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = isOpen && activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.id)}
            aria-label={item.label}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
              isActive
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:bg-white/60 hover:text-gray-800"
            }`}
          >
            <Icon size={20} strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;