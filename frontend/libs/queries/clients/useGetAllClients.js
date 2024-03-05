import api from "@/pages/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllClient = () => {
  const getAllClients = useQuery({
    queryKey: ["getAllClients"],
    queryFn: async () => {
      const res = await api.get("client/all");
      return res?.data?.data;
    },
  });
  return getAllClients;
};

export default useGetAllClient;
