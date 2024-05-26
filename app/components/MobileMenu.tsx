import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-4">
        <div className="px-3 py-1 text-center text-white hover:underline">
          Home
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 py-1 text-center text-white hover:underline">
          Series
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 py-1 text-center text-white hover:underline">
          Films
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 py-1 text-center text-white hover:underline">
          New & Popular
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 py-1 text-center text-white hover:underline">
          My List
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-3 py-1 text-center text-white hover:underline">
          Browse by languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
