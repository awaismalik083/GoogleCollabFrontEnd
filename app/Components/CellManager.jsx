import { useState, useRef, useEffect } from "react";
import { ArrowUp, ArrowDown, Pencil, Trash2, MoreVertical } from "lucide-react";

const menuGroups = [
  [{ label: "Select cell" }, { label: "Copy link to cell" }],
  [
    { label: "Cut cell" },
    { label: "Copy cell" },
    { label: "Delete cell" },
    { label: "Add a comment" },
    { label: "Open editor settings" },
    { label: "Mark cell as read-only" },
  ],
  [{ label: "Mirror cell in tab" }, { label: "Copy to scratch cell" }],
  [{ label: "Add a form" }],
];

const editMenuItems = [
  { label: "Generate code", disabled: true },
  { label: "Explain code" },
  { label: "Transform code" },
];

const CellManager = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const editMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
        setEditMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (label) => {
    console.log(label);
    setMenuOpen(false);
  };

  const handleEditAction = (item) => {
    if (item.disabled) return;
    console.log(item.label);
    setEditMenuOpen(false);
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 shadow-sm">
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Move up"
      >
        <ArrowUp size={18} />
      </button>

      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
        aria-label="Move down"
      >
        <ArrowDown size={18} />
      </button>

      <div className="relative inline-flex" ref={editMenuRef}>
        <button
          type="button"
          onClick={() => setEditMenuOpen((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Edit"
          aria-expanded={editMenuOpen}
        >
          <Pencil size={18} />
        </button>

        {editMenuOpen && (
          <div className="absolute left-0 top-full mt-2 w-44 rounded-xl border border-gray-200 bg-white py-2 shadow-lg z-50">
            {editMenuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                disabled={item.disabled}
                onClick={() => handleEditAction(item)}
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
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Delete"
      >
        <Trash2 size={18} />
      </button>

      <div className="relative inline-flex" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="More options"
          aria-expanded={menuOpen}
        >
          <MoreVertical size={18} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-gray-200 bg-white py-2 shadow-lg z-50">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {group.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleAction(item.label)}
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
  );
};

export default CellManager;
