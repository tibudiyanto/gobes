import { originAPI } from "../utils/requests";

const fetchRouteBusStops = async (route: string) => {
  return await originAPI.get(`haltebmkg/${route}`);
};

export { fetchRouteBusStops };
