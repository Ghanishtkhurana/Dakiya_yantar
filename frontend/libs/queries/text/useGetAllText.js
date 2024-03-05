import api from "@/pages/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllText = ({ chatId }) => {
  console.log("chatId", chatId);
  const getAllText = useQuery({
    queryKey: ["getAllText", chatId],
    queryFn: async () => {
      const res = await api.get(`text/get_text/${chatId}`);
      return res?.data;
    },
    refetchOnWindowFocus: false,
  });
  return getAllText;
};

export default useGetAllText;
