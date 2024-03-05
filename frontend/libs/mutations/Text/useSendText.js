import api from "@/pages/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useSendText = ({ reset }) => {
  const queryClient = useQueryClient();
  const sendtext = useMutation({
    mutationFn: async (formdata) => {
      const res = await api.post("text/send_text", formdata);
      return res?.data;
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries("getAllText");
      queryClient.invalidateQueries("getAllClients");
      // toast.success(data.message);
      reset();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return sendtext;
};

export default useSendText;
