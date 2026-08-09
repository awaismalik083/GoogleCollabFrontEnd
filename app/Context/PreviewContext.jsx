import { create } from "zustand";

export const preview = create((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export const RighBarPreview = create((set) => ({
  isOpen: false,
  activeSession: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export const MiniRightBarPreview = create((set) => ({
  isOpen: false,
  activeSession: null,
  open: (sectionId) => set({ isOpen: true, activeSession: sectionId }),
  close: () => set({ isOpen: false, activeSession: null }),
}));

const createCell = () => ({
  id:
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `cell-${Date.now()}-${Math.random()}`,
  value: "",
});

export const useNotebookStore = create((set, get) => ({
  // Panel state
  isOpen: false,
  activeCellId: null,

  open: (cellId) => set({ isOpen: true, activeCellId: cellId }),
  close: () => set({ isOpen: false, activeCellId: null }),

  getActiveCell: () => {
    const { cells, activeCellId } = get();
    return cells.find((cell) => cell.id === activeCellId) ?? null;
  },

  getAllCell: () => {
    const { cells } = get();
    return cells.map((cell) => cell.value);
  },

  // Replace the first cell whose value matches findText.
  // Returns the number of replacements made (0 or 1).
  replaceOne: (findText, replaceText) => {
    const { cells } = get();
    const index = cells.findIndex((cell) => cell.value === findText);
    if (index === -1) return 0;

    const updated = [...cells];
    updated[index] = { ...updated[index], value: replaceText };
    set({ cells: updated });
    return 1;
  },

  // Replace every cell whose value matches findText.
  // Returns the number of replacements made.
  replaceAll: (findText, replaceText) => {
    const { cells } = get();
    let count = 0;
    const updated = cells.map((cell) => {
      if (cell.value === findText) {
        count++;
        return { ...cell, value: replaceText };
      }
      return cell;
    });
    set({ cells: updated });
    return count;
  },

  // Cells state
  cells: [createCell()],

  addCell: () =>
    set((state) => ({
      cells: [...state.cells, createCell()],
    })),

  updateCellValue: (id, value) =>
    set((state) => ({
      cells: state.cells.map((cell) =>
        cell.id === id ? { ...cell, value } : cell,
      ),
    })),

  deleteCell: (id) =>
    set((state) => ({
      cells:
        state.cells.length === 1
          ? state.cells
          : state.cells.filter((cell) => cell.id !== id),
    })),

  moveCell: (id, direction) =>
    set((state) => {
      const index = state.cells.findIndex((cell) => cell.id === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.cells.length) return state;
      const updated = [...state.cells];
      [updated[index], updated[targetIndex]] = [
        updated[targetIndex],
        updated[index],
      ];
      return { cells: updated };
    }),
}));




const createEmptyNoteBook = (title = "Untitled") => ({
  id: crypto.randomUUID(),
  title,
  createdAt: Date.now(),
  updatedAt: Date.now(), // fixed casing to match convention (UpdatedAt -> updatedAt)
});

export const useNoteBookStorage = create((set, get) => ({
  notebooks: [],       // list of all created notebooks
  activeNotebookId: null, // which one is currently open, if needed

  // Create a new notebook, store it, return its id so the caller can navigate
  createNotebook: (title) => {
    const notebook = createEmptyNoteBook(title);
    set((state) => ({
      notebooks: [...state.notebooks, notebook],
      activeNotebookId: notebook.id,
    }));
    return notebook.id; // <-- caller uses this to redirect, e.g. router.push(`/notebook/${id}`)
  },

  deleteNotebook: (id) =>
    set((state) => ({
      notebooks: state.notebooks.filter((nb) => nb.id !== id),
      activeNotebookId:
        state.activeNotebookId === id ? null : state.activeNotebookId,
    })),

  renameNotebook: (id, newTitle) =>
    set((state) => ({
      notebooks: state.notebooks.map((nb) =>
        nb.id === id
          ? { ...nb, title: newTitle, updatedAt: Date.now() }
          : nb
      ),
    })),

  getNotebook: (id) => {
    const { notebooks } = get();
    return notebooks.find((nb) => nb.id === id) ?? null;
  },

  setActiveNotebook: (id) => set({ activeNotebookId: id }),
}));
