import ChatNav from "@/components/Chat/ChatNav";
import React from "react";
import ChatSearchBox from "@/components/Chat/ChatSearchBox";
import Chatppls from "@/components/Chat/Chatppls";
import ChatDiv from "@/components/Chat/ChatDiv";
import ChatSendInp from "@/components/Chat/ChatSendInp";
import { useSelector } from "react-redux";

const Chat = () => {
  const { data } = useSelector((store) => store.selectClient);
  const { darkMode } = useSelector((store) => store.uiSlice);

  return (
    <div
      className={`flex bg-[#17212b] ${
        darkMode ? "bg-[#17212b] text-white" : "bg-[#fdf8fb] text-black"
      } overflow-hidden h-screen`}
    >
      <div
        className={
          "w-[350px] fixed h-full flex flex-col border-r border-[#314153]"
        }
      >
        <ChatSearchBox />

        <div className="overflow-y-scroll h-full customScrollbar">
          <Chatppls />
        </div>
      </div>
      {/* second box  */}
      <div className="flex-1 ml-[350px] overflow-hidden flex flex-col">
        {data ? (
          <div
            className={`min-h-screen ${
              darkMode ? "bg-[#17212b] text-white" : "bg-[#fdf8fb] text-black"
            } overscroll-none  transition-all duration-1000  overflow-hidden flex flex-col`}
          >
            <div
              className={`h-14 z-50 sticky border-b border-[#314153] flex items-center px-4 w-full`}
            >
              <ChatNav />
            </div>
            <ChatDiv />
            <div>
              <ChatSendInp />
            </div>
          </div>
        ) : (
          <div className="h-full flex justify-center items-center">
            <p
              className={`${
                darkMode ? "bg-[#17212b] text-white" : "bg-[#fdf8fb] text-black"
              } text-[14px]`}
            >
              Please select a chat to start messaging ...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
