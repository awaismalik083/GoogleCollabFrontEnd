"use client";
import { useNotebookStore } from "../Context/PreviewContext";
import React, { useState } from "react";
import {
  PanelRightClose,
  MoreVertical,
  X,
  Code,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const suggestions = [
  "How can I install Python libraries?",
  "Load data from Google Drive",
  "Show an example of training a simple ML model",
];

const AssistantRightbar = ({ userName = "awais_malik" }) => {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("Gemini 2.5 Flash");
  const { close } = useNotebookStore();
  const activeCell = useNotebookStore((state) =>
    state.cells.find((c) => c.id === state.activeCellId)
  );

  return (
    <div className="w-full h-screen overflow-y-scroll max-w-md rounded-3xl bg-gray shadow-xl p-6 flex flex-col gap-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-medium text-gray-800">Gemini</span>
        <div className="flex items-center gap-3 text-gray-500">
          <button type="button" aria-label="Collapse panel" className="hover:text-gray-800 transition-colors">
            <PanelRightClose size={18} />
          </button>
          <button type="button" aria-label="More options" className="hover:text-gray-800 transition-colors">
            <MoreVertical size={18} />
          </button>
          <button onClick={close} type="button" aria-label="Close" className="hover:text-gray-800 transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div className="text-center">
        <h2 className="text-3xl font-medium">
          <span className="text-blue-500">Hello, </span>
          <span className="text-blue-400">{userName}</span>
        </h2>
        <p className="mt-2 text-lg text-gray-800">How can I help you today?</p>
      </div>

      {/* Suggestions */}
      <div className="flex flex-col items-center gap-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setPrompt(suggestion)}
            className="w-fit max-w-full text-center px-5 py-2.5 rounded-full border border-gray-300 text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="rounded-2xl border border-gray-200 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm">
          <Code size={14} className="text-blue-500" />
          <span>{activeCell?.value ? activeCell.value.slice(0, 20) : "Empty cell"}</span>
          <button type="button" aria-label="Remove cell reference" className="ml-1 text-gray-500 hover:text-gray-800">
            <X size={14} />
          </button>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What can I help you build?"
          rows={2}
          className="w-full resize-none border-none outline-none text-gray-800 placeholder-gray-500 bg-transparent"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-600">
            <button type="button" aria-label="Add" className="hover:text-gray-900 transition-colors">
              <Plus size={20} />
            </button>
            <button type="button" aria-label="Options" className="hover:text-gray-900 transition-colors">
              <SlidersHorizontal size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors">
              <span>{model}</span>
              <ChevronDown size={14} />
            </button>
            <button
              type="button"
              disabled={!prompt.trim()}
              aria-label="Send"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                prompt.trim() ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-300"
              }`}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantRightbar;