import useGetAllClient from "@/libs/queries/clients/useGetAllClients";
import {
  addAllClients,
  addNewClient,
  selectClient,
} from "@/slice/SelectClientSlice";
import { Spinner } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chatppls = () => {
  const { data, isLoading, isError } = useGetAllClient();
  const { clinet_arr } = useSelector((store) => store.selectClient);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const socket = useMemo(() => {
    return io("http://localhost:8080");
  }, []);

  useEffect(() => {
    if (!isLoading && data && !isError) {
      dispatch(addAllClients(data));
      console.log("run");
    }
  }, [isLoading, data, isError]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("id of socket", socket.id);
    });
    socket.on("client_added", (data_client) => {
      console.log("cline added", data_client);
      dispatch(addNewClient(data_client));
      queryClient.invalidateQueries("getAllClients");
    });
  }, []);

  const handleTheSelect = (el) => {
    dispatch(selectClient(el));
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center gap-3 h-full">
          <Spinner />
          <p className="text-white text-[17px]">Loading ...</p>
        </div>
      ) : (
        clinet_arr?.length > 0 &&
        clinet_arr?.map((el, i) => (
          <div
            key={i}
            onClick={() => handleTheSelect(el)}
            className="hover:bg-[#202b36] hover:text-white duration-500 transition-all border-b border-[#253241] py-2 px-3 flex gap-4"
          >
            <div
              style={{
                backgroundColor: "#e91e63",
              }}
              className={`h-14 w-14 flex justify-center items-center text-[20px] font-semibold overflow-hidden rounded-full`}
            >
              <p>{el.first_name.charAt(0)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[15px]">{el.first_name}</p>
              <p className="text-[13px]">
                {el?.lastRecievedMessageTime > el?.lastSentMessageTime
                  ? el?.lastRecievedMessage
                  : el?.lastSentMessage}
              </p>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Chatppls;
