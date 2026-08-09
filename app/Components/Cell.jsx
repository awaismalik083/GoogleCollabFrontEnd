"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  MoreVertical,
  Play,
} from "lucide-react";
import { editMenuItems, menuGroups } from "../Data/NavData";
import { useNotebookStore } from "../Context/PreviewContext";
import { Plus } from "lucide-react";
import { FaPlayCircle } from "react-icons/fa";
import Editor from "@monaco-editor/react";

const Cell = ({ cell, onChange, onDelete, isSelected, onSelect }) => {
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const editMenuRef = useRef(null);
  const menuRef = useRef(null);
  const editorRef = useRef(null); // ← add this
  const [editorFocused, setEditorFocused] = useState(false); // if you added focus tracking
  const [editorHeight, setEditorHeight] = useState(40); // if you added auto-height
  const { addCell, open } = useNotebookStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
        setEditMenuOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditAction = (item) => {
    if (item.disabled) return;
    console.log(item.label, "on cell", cell.id);
    setEditMenuOpen(false);
  };

  const handleAction = (label) => {
    console.log(label, "on cell", cell.id);
    if (label === "Delete cell") onDelete(cell.id);
    setMenuOpen(false);
  };

  return (
    <div className="relative   w-full mb-2" onClick={onSelect}>
      {/* Cell Manager — only visible on the selected cell */}
      {isSelected && (
        <div className="absolute top-0 right-4 z-10">
          <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 shadow-sm">
            <div className="relative inline-flex" ref={editMenuRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditMenuOpen((prev) => !prev);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Edit"
                aria-expanded={editMenuOpen}
              >
                <Pencil size={18} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addCell();
                }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                <Plus size={16} />
              </button>

              {editMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-44 max-w-[80vw] rounded-xl border border-gray-200 bg-white py-2 shadow-lg z-50">
                  {editMenuItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      disabled={item.disabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAction(item);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        item.disabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(cell.id);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Delete"
            >
              <Trash2 size={18} />
            </button>

            <div className="relative inline-flex" ref={menuRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((prev) => !prev);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="More options"
                aria-expanded={menuOpen}
              >
                <MoreVertical size={18} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 max-w-[85vw] rounded-xl border border-gray-200 bg-white py-2 shadow-lg z-50">
                  {menuGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                      {group.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(item.label);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                      {groupIndex < menuGroups.length - 1 && (
                        <div className="my-1 border-t border-gray-100" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Code Cell body */}
      <div className="flex items-center gap-3 pt-0 sm:pt-4">
        <div className="flex items-center gap-2 sm:gap-4 w-full  border-2 border-gray-300 rounded-xl px-2.5 sm:px-4   focus-within:border-blue-500 transition-all">
          {isSelected && (
            <FaPlayCircle className="w-6 h-6 transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer" />
          )}

          <div className="relative w-full min-w-0">
            <Editor
              height={40}
              defaultLanguage="python"
              value={cell.value}
              onChange={(value) => onChange(cell.id, value ?? "")}
              theme="vs-light"
              onMount={(editor) => {
                editorRef.current = editor;
              }}
              options={{
                minimap: { enabled: false },
                lineNumbers: "off",
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
                tabSize: 4,
                padding: { top: 8, bottom: 8 },
                overviewRulerLanes: 0, // removes the little scrollbar decoration strip
                hideCursorInOverviewRuler: true,
                renderLineHighlight: "none", // removes the grey "active line" highlight if you don't want it
                scrollbar: {
                  vertical: "hidden",
                  horizontal: "hidden",
                },
                glyphMargin: false,
                folding: false,
              }}
            />

            {!cell.value && (
              <div className="absolute left-5   sm:left-3 top-1.5 mt-2 sm:top-1 text-xs sm:text-sm leading-snug pointer-events-none">
                <span className="text-[#7F7F7F]">Start coding or </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    open(cell.id);
                  }}
                  className="pointer-events-auto underline hover:cursor-pointer text-gray-700 hover:text-black"
                >
                  generate
                </button>
                <span className="text-[#7F7F7F]"> with AI.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cell;
