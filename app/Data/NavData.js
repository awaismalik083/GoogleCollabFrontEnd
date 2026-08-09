export const menuItems = [
  "File",
  "Edit",
  "View",
  "Insert",
  "Runtime",
  "Tools",
  "Help",
];

export const fileMenuGroups = [
  [{ label: "Locate in Drive" }, { label: "Open in playground mode" }],
  [
    { label: "New notebook in Drive" },
    { label: "Open notebook", shortcut: "Ctrl+O" },
    { label: "Search notebooks in Drive" },
    { label: "Upload notebook" },
  ],
  [{ label: "Rename" }, { label: "Move" }, { label: "Move to trash" }],
  [
    { label: "Save a copy in Drive" },
    { label: "Save a copy as a GitHub Gist" },
    { label: "Save a copy in GitHub" },
  ],
  [
    { label: "Save", shortcut: "Ctrl+S" },
    { label: "Save and pin revision", shortcut: "Ctrl+M S" },
    { label: "Revision history" },
    { label: "Notebook info" },
  ],
  [{ label: "Download", hasSubmenu: true }],
  [{ label: "print", shortcut: "Ctrl+P" }],
];

export const connectMenuGroups = [
  [{ label: "Connect to a hosted runtime" }, { label: "Change runtime type" }],
  [
    { label: "Connect to Google Cloud runtime" },
    { label: "Connect to a local runtime" },
  ],
  [
    { label: "View resources" },
    { label: "Manage sessions" },
    { label: "Disconnect and delete runtime", disabled: true },
  ],
  [
    { label: "Show executed code history" },
    { label: "Focus the last run cell", disabled: true },
  ],
];

export const editMenuGroups = [
  [
    { label: "Undo", shortcut: "Ctrl+M Z", disabled: true },
    { label: "Redo", shortcut: "Ctrl+Shift+Y", disabled: true },
  ],
  [
    { label: "Select all cells", shortcut: "Ctrl+Shift+A" },
    { label: "Cut cell or selection" },
    { label: "Copy cell or selection" },
    { label: "Paste" },
    { label: "Delete selected cells", shortcut: "Ctrl+M D" },
  ],
  [
    { label: "Find and replace", shortcut: "Ctrl+H" },
    { label: "Find next", shortcut: "Ctrl+G" },
    { label: "Find previous", shortcut: "Ctrl+Shift+G" },
  ],
  [{ label: "Notebook settings" }],
  [{ label: "Clear all outputs" }],
];

export const editMenuItems = [
  { label: "Generate code", disabled: true },
  { label: "Explain code" },
  { label: "Transform code" },
];

export const menuGroups = [
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