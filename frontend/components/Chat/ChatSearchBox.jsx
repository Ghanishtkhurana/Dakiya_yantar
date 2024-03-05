import { Input } from "@nextui-org/react";
import React from "react";
import { IoIosMenu } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const ChatSearchBox = () => {
  return (
    <div className="flex gap-2 border-b border-[#314153] justify-center items-center px-4 py-4 h-14">
      <div>
        <IoIosMenu className="text-[#4e637b] h-7 w-7" />
      </div>
      <div className="flex bg-[#314153] p-2 w-full items-center gap-2 rounded-full ">
        <div className="text-white">
          <IoSearch />
        </div>
        <input
          type="text"
          className="focus:border-none focus:outline-none text-[13px] text-white bg-transparent w-full "
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default ChatSearchBox;
