import { KyResponse } from "ky";
import { Bus } from "../types";
import { originAPI } from "../utils/requests";

type BusOriginResponse = {
  info: string;
  lat: string;
  lng: string;
};

const _preprocessRespond = async (resp: KyResponse) => {
  const data = (await resp.json()) as BusOriginResponse[];
  return data.map(({ info, lat, lng }): Bus => {
    return {
      info,
      location: { lat: Number(lat), lon: Number(lng) },
    };
  });
};

// const routeToBusEndpoint = {
//   1: "bustrackutara",
//   2: "bustrackbrt",
//   3: "bustracktumpuk",
//   4: "bustrackmerr",
//   6: "bustracktij",
// };

const fetchBus = async (route: number) => {
  switch (route) {
    case 1: {
      const resp = await originAPI.get("bustrackutara");
      return await _preprocessRespond(resp);
    }
    case 2: {
      const resp = await originAPI.get("bustrackbrt");
      return await _preprocessRespond(resp);
    }
    case 3: {
      const resp = await originAPI.get("bustracktumpuk");
      return await _preprocessRespond(resp);
    }
    case 4: {
      const resp = await originAPI.get("bustrackmerr");
      return await _preprocessRespond(resp);
    }
    case 6: {
      const resp = await originAPI.get("bustracktij");
      return await _preprocessRespond(resp);
    }
  }
};

export { fetchBus };
