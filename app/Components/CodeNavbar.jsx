"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, ChevronDown, Play, ChevronUp } from "lucide-react";

import { useNotebookStore } from "../Context/PreviewContext";

const CodeNavbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [connectMenuOpen, setConnectMenuOpen] = useState(false);
    const { cells, addCell, updateCellValue, deleteCell, moveCell } =
      useNotebookStore();

  const connectMenuRef = useRef(null);
  const fileMenuRef = useRef(null);
  const editMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        connectMenuRef.current &&
        !connectMenuRef.current.contains(event.target)
      ) {
        setConnectMenuOpen(false);
      }
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
        setFileMenuOpen(false);
      }
      if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
        setEditMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConnectAction = (item) => {
    if (item.disabled) return;
    console.log(item.label);
    setConnectMenuOpen(false);
  };

  const handleFileAction = (item) => {
    if (item.disabled) return;
    console.log(item.label);
    if (!item.hasSubmenu) {
      setFileMenuOpen(false);
    }
  };

  const handleEditAction = (item) => {
    if (item.disabled) return;
    console.log(item.label);
    if (!item.hasSubmenu) {
      setEditMenuOpen(false);
    }
  };

  const handleMenuClick = (item) => {
    setActiveMenu(item);
    setFileMenuOpen(item === "File" ? (prev) => !prev : false);
    setEditMenuOpen(item === "Edit" ? (prev) => !prev : false);
  };

  return (
    <div className="w-full font-sans text-sm text-gray-800 border-b border-gray-200">
      {/* Command toolbar */}
      {!collapsed && (
        <div className="flex items-center gap-4 px-4 py-2 bg-gray-50">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Search size={16} />
            <span>Commands</span>
          </button>

          <button
            type="button"
            onClick={addCell}
            className="flex items-center hover:cursor-pointer gap-1 text-gray-700 hover:text-gray-900"
          >
            <Plus size={16} />
            <span>Code</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          >
            <Plus size={16} />
            <span>Text</span>
          </button>

          <ChevronDown size={14} className="text-gray-400 -ml-2" />

          <div className="h-4 w-px bg-gray-300" />

          <button
            type="button"
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          >
            <Play size={16} />
            <span>Run all</span>
          </button>

          <ChevronDown size={14} className="text-gray-400 -ml-2" />

          <div className="flex-1" />

          <div className="relative inline-flex" ref={connectMenuRef}>
            <button
              type="button"
              onClick={() => setConnectMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              aria-expanded={connectMenuOpen}
            >
              <span>Connect</span>
              <ChevronDown size={14} />
            </button>

            {connectMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-gray-200 bg-white py-2 shadow-lg z-50">
                {connectMenuGroups.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    {group.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        disabled={item.disabled}
                        onClick={() => handleConnectAction(item)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          item.disabled
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                    {groupIndex < connectMenuGroups.length - 1 && (
                      <div className="my-1 border-t border-gray-100" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Collapse toolbar"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeNavbar;
