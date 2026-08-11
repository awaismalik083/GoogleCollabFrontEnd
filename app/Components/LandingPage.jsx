"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import { GoUpload, GoFileDirectory } from "react-icons/go";
import { SiGoogledrive, SiGithub } from "react-icons/si";
import { preview, useNoteBookStorage } from "../Context/PreviewContext";
import NotebookManager from "./NotebookManager";

const handleCreateNotebook = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notebooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: "Untitled Notebook" }),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("Failed to create notebook:", errData.message);
      return;
    }

    const data = await res.json();
    const id = data.notebook.id; // matches your controller's response shape

    router.push(`/notebook/${id}`);
  } catch (error) {
    console.error("Error creating notebook:", error);
  }
};

const exampleNotebooks = [
  {
    icon: <span className="text-blue-700 font-bold text-lg">CO</span>,
    title: "Welcome to Colab",
    description: "Learn how to get started in Colab.",
  },
  {
    icon: <span className="text-blue-700 font-bold text-lg">A</span>,
    title: "Antigravity agent",
    description:
      "Explore the basics of building and using managed agents in Colab.",
  },
  {
    icon: <span className="text-blue-700 font-bold text-lg">♪</span>,
    title: "Lyria",
    description: "Generate your own music with the powerful Lyria model.",
  },
  {
    icon: <span className="text-blue-700 font-bold text-lg">文A</span>,
    title: "Live translation",
    description:
      "Build real-time language translation tools directly in your notebook.",
  },
];

const recentFiles = [
  {
    icon: <SiGoogledrive className="text-lg" />,
    name: "Untitled1.ipynb",
    date: "11:02 AM",
  },
  {
    icon: <SiGoogledrive className="text-lg" />,
    name: "Untitled0.ipynb",
    date: "July 25",
  },
  {
    icon: <SiGithub className="text-lg" />,
    name: "fooocus_colab.ipynb",
    date: "Feb 13, 2025",
  },
  {
    icon: <SiGoogledrive className="text-lg" />,
    name: "Netflix Sans Medium",
    date: "Jan 31, 2024",
  },
];

const LandingPage = () => {
  const { isOpen, open, close } = preview();
  const createNotebook = useNoteBookStorage((state) => state.createNotebook);




  return (
    <div className="w-full min-h-screen max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top action buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
        <button
          onClick={handleCreateNotebook}
          className="bg-blue-700 hover:bg-blue-600 cursor-pointer duration-300 ease-out transition-colors hover:shadow-md shadow-black/10 text-white flex items-center justify-center gap-3 py-3 px-8 rounded-4xl font-medium text-base w-full sm:w-auto"
        >
          <FaPlus />
          New notebook
        </button>
        <button className="border border-gray-400 hover:bg-[#E6EDFA] cursor-pointer transition-colors duration-200 ease-out text-blue-700 flex items-center justify-center gap-3 py-3 px-8 rounded-4xl font-medium text-base w-full sm:w-auto">
          <GoUpload />
          Upload notebook
        </button>
      </div>

      {/* Example notebooks */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl  font-medium text-gray-900">
          Example notebooks
        </h2>
        <button
          onClick={open}
          className="text-blue-700 text-base hover:underline cursor-pointer"
        >
          See all
        </button>
      </div>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {exampleNotebooks.map((nb) => (
          <button
            key={nb.title}
            className="text-left w-full border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-sm transition-all duration-200 ease-out cursor-pointer bg-white"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              {nb.icon}
            </div>
            <p className="font-medium text-gray-900 mb-1 text-base">
              {nb.title}
            </p>
            <p className="text-sm text-gray-500 leading-snug">
              {nb.description}
            </p>
          </button>
        ))}
      </div>

      {/* Recents */}
      <div className="flex items-center w-full justify-between mb-2">
        <h2 className="text-xl font-medium text-gray-900">Recents</h2>
        <GoFileDirectory className="text-gray-600 text-xl cursor-pointer" />
      </div>

      <div className="border-t w-full border-gray-200">
        {recentFiles.map((file) => (
          <button
            key={file.name}
            className="w-full flex items-center justify-between gap-3 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 ease-out cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 text-base">{file.icon}</span>
              <span className="text-gray-800 text-base truncate">
                {file.name}
              </span>
            </div>
            <span className="text-gray-500 text-sm shrink-0">{file.date}</span>
          </button>
        ))}
      </div>

      <button className="text-blue-700 text-base hover:underline mt-3 cursor-pointer">
        See more...
      </button>

      {/* Modal renders on top of everything above, controlled by Zustand state */}
      {isOpen ? <NotebookManager /> : ""}
    </div>
  );
};

export default LandingPage;
