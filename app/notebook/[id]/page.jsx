"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NoteBookCode from "../../Components/NoteBookCode";
import Sidebar from "../../Components/Sidebar";
import CodeNavbar from "../../Components/CodeNavbar";
import AssistantRightbar from "../../Components/AssistantRightbar";
import { useNotebookStore } from "../../Context/PreviewContext";
import MiniRighbar from "../../Components/MiniRighbar";

const NotebookPage = () => {
  const { id } = useParams();
  const { isOpen } = useNotebookStore();

  const [notebook, setNotebook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchNotebook = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notebook/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          setError(true);
          return;
        }

        const data = await res.json();
        setNotebook(data.notebook);
      } catch (err) {
        console.error("Error fetching notebook:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNotebook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  if (error || !notebook) {
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