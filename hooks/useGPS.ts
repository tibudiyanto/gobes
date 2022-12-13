import React from "react";
import { Location } from "../types";

const useGPS = () => {
  const [location, setLocation] = React.useState<Location | null>(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((l) => {
      const {
        coords: { latitude, longitude },
      } = l;
      setLocation({ lat: latitude, lon: longitude });
    }, null);
  };
  return { location, getLocation };
};

export { useGPS };
