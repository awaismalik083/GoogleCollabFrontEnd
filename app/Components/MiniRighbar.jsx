import React from "react";
import TableContent from "./TableContent";
import SearchReplace from "./SearchReplace";
import { MiniRightBarPreview } from "../Context/PreviewContext";
import FileUpload from "../Components/FileUpload"

const sectionComponents = {
  search: SearchReplace,
  table: TableContent,
  folder:FileUpload
};

const MiniRighbar = () => {
  const { isOpen, activeSession, close } = MiniRightBarPreview();

  const ActiveComponent = sectionComponents[activeSession];

  return (
   <div
      className={`bg-[#F0F4F9] overflow-hidden rounded-4xl transition-all duration-300 ease-out ${
        isOpen
          ? "opacity-100 translate-x-0 w-full lg:w-[350px] min-h-screen p-4"
          : "opacity-0 translate-x-4 w-0 max-h-0 p-0 pointer-events-none"
      }`}
    >
      {ActiveComponent ? <ActiveComponent onClose={close} /> : null}
    </div>
  );
};

export default MiniRighbar;