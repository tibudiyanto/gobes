import { useQuery } from "@tanstack/react-query";
import { BusRoute } from "../types";
import { api } from "../utils/requests";
const useRoute = ({ busStop }: { busStop: string | null }) => {
  // fetch route and the bus
  const query = useQuery<{ data: BusRoute }>({
    queryKey: ["busStop", busStop],
    queryFn: () => api(`rute?halte=${busStop}`).then((res) => res.json()),
    enabled: busStop !== null,
  });
  return query;
};

export { useRoute };
