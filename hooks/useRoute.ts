import { useQuery } from "@tanstack/react-query";
import { BusRoute } from "../types";
import { api } from "../utils/requests";
const useRoute = ({ busStop }: { busStop: string | undefined }) => {
  // fetch route and the bus
  const query = useQuery<{ data: BusRoute }>({
    queryKey: ["busStop", busStop],
    queryFn: () => api(`rute?halte=${busStop}`).then((res) => res.json()),
    enabled: busStop !== undefined,
  });
  return query;
};

export { useRoute };
