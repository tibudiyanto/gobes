import { originAPI } from "../utils/requests";

const fetchRouteBusStops = async (route: String) => {
  return await originAPI.get(`haltebmkg/${route}`);
};

export { fetchRouteBusStops };
