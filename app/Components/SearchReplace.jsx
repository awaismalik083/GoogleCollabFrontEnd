"use client";
import React, { useRef, useState } from "react";
import { FiSearch, FiCornerDownLeft } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { useNotebookStore } from "../Context/PreviewContext";

const SearchReplace = ({ onClose }) => {
  const { getAllCell, replaceOne, replaceAll } = useNotebookStore();

  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [resultCount, setResultCount] = useState(0);

  const replaceInputRef = useRef(null);

  const findValue = (text) => {
    const values = getAllCell();
    const res = values.filter((item) => item === text);
    setResultCount(res.length);
  };

  const handleReplace = () => {
    replaceOne(findText, replaceText);
    findValue(findText);
  };

  const handleReplaceAll = () => {
    replaceAll(findText, replaceText);
    findValue(findText);
  };

  const handleFindChange = (e) => {
    const val = e.target.value;
    setFindText(val);
    findValue(val);
  };

  const handleFindKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      replaceInputRef.current?.focus();
    } else if (e.key === "Escape") {
      onClose?.();
    }
  };

  const handleReplaceKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleReplace();
    } else if (e.key === "Escape") {
      onClose?.();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h2 className="text-[13px] font-semibold tracking-wide text-gray-500 uppercase">
          Find &amp; Replace
        </h2>

        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <ImCross size={10} />
        </button>
      </div>

      {/* Body */}
      <div className="space-y-3 p-4">
        {/* Find */}
        <div className="relative">
          <FiSearch
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            autoFocus
            value={findText}
            onChange={handleFindChange}
            onKeyDown={handleFindKeyDown}
            placeholder="Find"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-9 pr-3 font-mono text-sm text-gray-800 outline-none transition placeholder:font-sans focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Replace */}
        <div className="relative">
          <FiCornerDownLeft
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            ref={replaceInputRef}
            type="text"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            onKeyDown={handleReplaceKeyDown}
            placeholder="Replace with"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-9 pr-3 font-mono text-sm text-gray-800 outline-none transition placeholder:font-sans focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Live result count */}
        <p className="px-1 text-xs text-gray-400">
          {findText
            ? `${resultCount} result${resultCount === 1 ? "" : "s"} found`
            : "Type to search"}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-3">
        <span className="text-xs text-gray-400">
          <kbd className="rounded border border-gray-300 bg-white px-1.5 py-0.5 font-sans text-[10px]">
            Esc
          </kbd>{" "}
          to close
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReplace}
            disabled={!findText}
            className="rounded-lg border border-gray-300 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Replace
          </button>

          <button
            onClick={handleReplaceAll}
            disabled={!findText}
            className="rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Replace All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchReplace;