// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from "path";
import { promises as fs } from "fs";

import type { NextApiRequest, NextApiResponse } from "next";
import { fetchBus } from "../../data/bus";
import { Bus } from "../../types";

type RouteMap = {
  [key: string]: Bus[];
};

type RuteResponse = {
  message?: string | null;
  data?: RouteMap | null;
};

type RouteNumberToName = {
  [key: number]: string;
};
const routeNameMap: RouteNumberToName = {
  1: "Purabaya - Jembatan Merah",
  2: "Barat Timur",
  3: "Bus Tumpuk",
  4: "Merr",
  6: "TIJ - Yono Suwoyo",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<RuteResponse>) {
  // Read halte to route data
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(jsonDirectory + "/halteToRoute.json", "utf8");
  const halteToRoute = JSON.parse(fileContents);

  const halteToFetch = req.query.halte as string;

  if (!halteToRoute[halteToFetch]) {
    res.status(404).json({ message: "Halte not found" });
  }

  const routeToFetch = halteToRoute[halteToFetch] as number[];

  let busses = {} as RouteMap;

  for (const route of routeToFetch) {
    const res = await fetchBus(route);
    busses[routeNameMap[route]] = res || [];
  }

  res.status(200).json({ data: busses });
}
