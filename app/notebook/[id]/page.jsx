"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import NoteBookCode from "../../Components/NoteBookCode";
import Sidebar from "../../Components/Sidebar";
import CodeNavbar from "../../Components/CodeNavbar";
import AssistantRightbar from "../../Components/AssistantRightbar";
import { useNotebookStore, useNoteBookStorage } from "../../Context/PreviewContext";
import MiniRighbar from "../../Components/MiniRighbar";

const NotebookPage = () => {
  const { id } = useParams(); // grabs the [id] segment from the URL
  const { isOpen } = useNotebookStore();
  const getNotebook = useNoteBookStorage((state) => state.getNotebook);
  const setActiveNotebook = useNoteBookStorage((state) => state.setActiveNotebook);

  const notebook = getNotebook(id);

  useEffect(() => {
    if (id) setActiveNotebook(id);
  }, [id, setActiveNotebook]);

  if (!notebook) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Notebook not found.
      </div>
    );
  }

  return (
    <>
      <CodeNavbar title={notebook.title} />
      <div className="p-5 w-full min-h-screen flex flex-col lg:flex-row bg-[#F8FAFD]">
        <div className="mb-3 lg:mb-0 lg:mr-3">
          <Sidebar />
        </div>
        <MiniRighbar />
        <div className="flex-1 min-w-0">
          <NoteBookCode />
        </div>
        {isOpen ? <AssistantRightbar /> : ""}
      </div>
    </>
  );
};

export default NotebookPage;