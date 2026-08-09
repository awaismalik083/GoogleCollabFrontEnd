"use client";

import React, { useState } from "react";
import Cell from "./Cell";
import { useNotebookStore } from "../Context/PreviewContext";
import { RighBarPreview } from "../Context/PreviewContext";
import AssistantRightbar from "./AssistantRightbar";

const NoteBookCode = () => {
  const { cells, addCell, updateCellValue, deleteCell, moveCell } =
    useNotebookStore();
  const { isOpen } = RighBarPreview();
  const [selectedCellId, setSelectedCellId] = useState(null); // NEW

  return (
    <div className="flex bg-white rounded-3xl  min-h-screen flex-col lg:flex-row w-full gap-3">
      <div
        className={`relative w-full  h-full rounded-2xl sm:rounded-3xl  p-2 sm:p-6 md:p-5 transition-all ${
          isOpen ? "lg:w-2/3" : "lg:w-full"
        }`}
      >
        {cells.map((cell, index) => (
          <Cell
            key={cell.id}
            cell={cell}
            index={index}
            totalCells={cells.length}
            onChange={updateCellValue}
            onDelete={deleteCell}
            onMoveUp={(id) => moveCell(id, "up")}
            onMoveDown={(id) => moveCell(id, "down")}
            isSelected={selectedCellId === cell.id}   // NEW
            onSelect={() => setSelectedCellId(cell.id)} // NEW
          />
        ))}
      </div>

      {isOpen && (
        <div className="w-full lg:w-1/3">
          <AssistantRightbar />
        </div>
      )}
    </div>
  );
};

export default NoteBookCode;