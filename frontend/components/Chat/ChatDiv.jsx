import useGetAllText from "@/libs/queries/text/useGetAllText";
import { addTextArr, addtext } from "@/slice/SelectClientSlice";
import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const ChatDiv = () => {
  const { data, textArr } = useSelector((store) => store.selectClient);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const socket = useMemo(() => {
    return io("http://localhost:8080");
  }, []);
  const {
    data: allTextArr,
    isLoading,
    isError,
  } = useGetAllText({ chatId: data?.chat_id });
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "auto" });
  }, [textArr]);
  useEffect(() => {
    if (!isLoading && !isError && allTextArr) {
      dispatch(addTextArr(allTextArr?.data));
      console.log("run");
    }
  }, [isLoading, isError, allTextArr]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("id of socket", socket.id);
    });
    socket.on("message", (messageData) => {
      let obj = {
        text: messageData?.body?.message?.text,
        status: "received",
        date: dayjs().format(),
        chat_id: messageData?.body?.message?.chat?.id,
      };
      // console.log("chat id", data.chat_id);
      // console.log("webhook chat id", messageData?.body?.message?.chat?.id);
      // console.log("update id", messageData?.body?.update_id);
      if (
        String(messageData?.body?.message?.chat?.id) === String(data.chat_id)
      ) {
        console.log("add krne ki if condition", messageData?.body);
        dispatch(addtext(obj));
      } else {
        console.log("add krne ki else condition");
        queryClient.invalidateQueries("getAllClients");
      }
    });
  }, []);

  return (
    <div className="h-full relative overflow-y-scroll overflow-x-hidden customScrollbar">
      <div className="flex w-full flex-col p-3 gap-3">
        {textArr?.length > 0 &&
          textArr
            .filter((el) => String(el.chat_id) === String(data.chat_id))
            ?.map((el, i) => {
              return (
                <div
                  key={i}
                  className={`text-white w-fit py-2 px-4 bg-[#273544] ${
                    el.status === "sent"
                      ? "animate-fade-left self-end rounded-t-2xl rounded-l-2xl"
                      : "animate-fade-right self-start rounded-t-2xl rounded-r-2xl"
                  }`}
                >
                  {el.text}
                </div>
              );
            })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatDiv;
