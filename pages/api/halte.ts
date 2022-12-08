// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from "path";
import { promises as fs } from "fs";

import type { NextApiRequest, NextApiResponse } from "next";
import { Halte } from "../../types";

// ok since bus stop data is mostly static, let's just fetch it once and we can preprocess it
export default async function handler(req: NextApiRequest, res: NextApiResponse<Halte>) {
  const jsonDirectory = path.join(process.cwd(), "data");
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + "/allHalte.json", "utf8");
  //Return the content of the data file in json format
  res.status(200).json(JSON.parse(fileContents));
}
