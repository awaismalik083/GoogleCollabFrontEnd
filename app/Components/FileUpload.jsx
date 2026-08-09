"use client";
import React, { useRef, useState } from "react";
import {
  Upload,
  RotateCw,
  SquareArrowOutUpRight,
  X,
  FileJson,
  FileText,
  FileCode,
  FileImage,
  File as FileIcon,
  Trash2,
} from "lucide-react";
import { MdOutlineAddToDrive } from "react-icons/md";

// --- helpers -----------------------------------------------------

const CODE_EXTENSIONS = [
  "js", "jsx", "ts", "tsx", "py", "java", "c", "cpp", "cs", "go",
  "rb", "php", "rs", "swift", "kt", "sh", "html", "css",
];

const getFileType = (file) => {
  const ext = file.name.split(".").pop()?.toLowerCase() || "";

  if (file.type.startsWith("image/")) return "image";
  if (ext === "json") return "json";
  if (CODE_EXTENSIONS.includes(ext)) return "code";
  if (file.type.startsWith("text/") || ext === "txt" || ext === "md") return "text";
  return "other";
};

const FILE_ICON_MAP = {
  image: { Icon: FileImage, color: "text-purple-500" },
  json: { Icon: FileJson, color: "text-amber-500" },
  code: { Icon: FileCode, color: "text-blue-500" },
  text: { Icon: FileText, color: "text-gray-600" },
  other: { Icon: FileIcon, color: "text-gray-400" },
};

// --- component -----------------------------------------------------

const FileUpload = ({ onClose }) => {
  const [files, setFiles] = useState([]); // [{ id, file, type, previewUrl }]
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    const mapped = selected.map((file) => {
      const type = getFileType(file);
      return {
        id: `${file.name}-${file.size}-${file.lastModified}`,
        file,
        type,
        previewUrl: type === "image" ? URL.createObjectURL(file) : null,
      };
    });

    setFiles((prev) => {
      // avoid duplicate ids (same name/size/lastModified)
      const existingIds = new Set(prev.map((f) => f.id));
      const merged = [...prev, ...mapped.filter((f) => !existingIds.has(f.id))];
      return merged;
    });

    // allow re-selecting the same file again later
    e.target.value = "";
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium text-gray-800">Files</h2>
        <div className="flex items-center gap-3 text-gray-500">
          <button
            type="button"
            aria-label="Open in new panel"
            className="hover:text-gray-800 transition-colors"
          >
            <SquareArrowOutUpRight size={18} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="hover:text-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Icon toolbar */}
      <div className="inline-flex w-full items-center gap-1 rounded-full bg-gray-200/70 px-3 py-1">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          onClick={() => fileInputRef.current.click()}
          aria-label="Upload file"
          className="flex h-8 w-8 items-center cursor-pointer justify-center rounded-full text-gray-700 hover:bg-white/70 transition-colors"
        >
          <Upload size={18} />
        </label>

        <button
          type="button"
          aria-label="Refresh"
          className="flex h-8 w-8 items-center cursor-pointer justify-center rounded-full text-gray-700 hover:bg-white/70 transition-colors"
        >
          <RotateCw size={18} />
        </button>
        <button
          type="button"
          aria-label="Add to Drive"
          className="flex h-8 w-8 items-center cursor-pointer justify-center rounded-full text-gray-700 hover:bg-white/70 transition-colors"
        >
          <MdOutlineAddToDrive size={18} />
        </button>
      </div>

      {/* Mapped file list — drop this whole block below your Tasks header */}
      <div className="mt-3 flex flex-col gap-1">
        {files.length === 0 ? (
          <p className="text-xs text-gray-400 px-1">No files uploaded yet</p>
        ) : (
          files.map(({ id, file, type, previewUrl }) => {
            const { Icon, color } = FILE_ICON_MAP[type];
            return (
              <div
                key={id}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition-colors group"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={file.name}
                    className="h-7 w-7 rounded object-cover flex-shrink-0"
                  />
                ) : (
                  <Icon size={18} className={`${color} flex-shrink-0`} />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-gray-800">{file.name}</p>
                  <p className="text-[11px] text-gray-400">
                    {type} · {formatSize(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(id)}
                  aria-label={`Remove ${file.name}`}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity flex-shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FileUpload;