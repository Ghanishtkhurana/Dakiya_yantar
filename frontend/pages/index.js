import Image from "next/image";
import { Inter } from "next/font/google";
import { io } from "socket.io-client";
import { useEffect, useMemo, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const socket = useMemo(() => {
    return io("http://localhost:8080");
  }, []);
  const [socketId, setSocketId] = useState(null);
  const [messages, setMessages] = useState([]); // [{message: "hello", room: "room"}
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected fronted", socket.id);
      setSocketId(socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log("data from backend", data);
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = (data) => {
    socket.emit("message", data);
    reset();
  };
  return (
    <div>
      <h1 className="text-[13px] text-center">{socketId}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <Input
          {...register("message")}
          size="sm"
          label="message"
          variant="bordered"
        />
        <Input {...register("room")} size="sm" label="id" variant="bordered" />
        <Button size="sm" type="submit" className="w-fit" color="secondary">
          Submit
        </Button>
      </form>
      <div className="flex flex-col gap-2 p-4">
        {messages.map((msg, i) => (
          <div key={i} className="bg-gray-200 p-2 text-xs rounded-md">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
