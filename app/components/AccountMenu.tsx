import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!visible) {
    return null;
  }

  const handleSignOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            src="/images/profile.jpg"
            className="w-8 rounded-md"
            alt="profile"
          />
          <p className="text-white capitalize text-sm group-hover/item:underline">
            {user?.userName}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={handleSignOut}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Signout of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
