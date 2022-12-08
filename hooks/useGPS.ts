import React from "react";
import { Location } from "../types";

const useGPS = () => {
  const location: Location = { lat: -7.288393, lon: 112.677276 };
  return location;
};

export { useGPS };
