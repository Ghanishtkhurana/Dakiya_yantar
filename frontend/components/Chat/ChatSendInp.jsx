import useSendText from "@/libs/mutations/Text/useSendText";
import { addtext } from "@/slice/SelectClientSlice";
import { Button, Input } from "@nextui-org/react";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const ChatSendInp = () => {
  const { data } = useSelector((store) => store.selectClient);
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isPending } = useSendText({ reset });
  const dispatch = useDispatch();

  const onSubmit = (formdata) => {
    formdata = {
      ...formdata,
      id: data._id,
      chat_id: data.chat_id,
      status: "sent",
      date: dayjs().format(),
    };
    dispatch(addtext(formdata));
    console.log("formdata", formdata);
    mutate(formdata);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-14 flex gap-3 items-center px-4 border-t border-[#314153]"
    >
      <Input
        {...register("text", {
          required: "This field is required",
        })}
        size="sm"
        radius="xl"
        color={"primary"}
        placeholder="Search"
        variant="underlined"
        className="text-white"
      />
      <Button
        isLoading={isPending}
        isIconOnly
        className="bg-green-200 cursor-pointer"
        radius="full"
      >
        <IoMdSend className="text-green-500" />
      </Button>
    </form>
  );
};

export default ChatSendInp;
