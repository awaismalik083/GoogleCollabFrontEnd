"use client";

import React, { useState } from "react";
import { PanelRight, X, MoreVertical, Plus } from "lucide-react";

const TableContent = ({ onClose }) => {
  const [sections, setSections] = useState([{ id: 1, title: "New Section" }]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedSection, setselectedSection] = useState(null);

  const addSection = () => {
    const newSection = { id: Date.now(), title: "New Section" };
    setSections((prev) => [...prev, newSection]);
  };

  const deleteSection = (id) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="w-full  sm:w-80 rounded-2xl bg-slate-100 p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-medium text-gray-900">
          Table of contents
        </h2>
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <PanelRight size={18} />
          </button>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Sections list */}
      <div className="flex   flex-col gap-1">
        {sections.map((section) => {
          const isselected = selectedSection === section.id;
          return (
            <div
              key={section.id}
              onClick={() => setselectedSection(section.id)}
              className={`group cursor-pointer relative flex items-center justify-between pl-3 py-1.5 border-l-2 transition-colors ${
                isselected ? "border-blue-600" : "border-transparent"
              }`}
            >
              <p
                className={`bg-transparent outline-none text-sm sm:text-base w-full min-w-0 truncate ${
                  isselected ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {section.title}
              </p>

              <div className="relative shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(
                      openMenuId === section.id ? null : section.id,
                    );
                  }}
                  className="p-1 text-gray-500 hover:text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <MoreVertical size={16} />
                </button>

                {openMenuId === section.id && (
                  <div className="absolute right-0 top-8 z-10 w-32 bg-white border border-gray-200 rounded-lg shadow-md py-1">
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Add section */}
        <button
          type="button"
          onClick={addSection}
          className="flex items-center gap-2 pl-3 py-2 text-blue-600 hover:text-blue-700 text-sm sm:text-base transition-colors"
        >
          <Plus size={18} />
          <span>Section</span>
        </button>
      </div>
    </div>
  );
};

export default TableContent;
