import ky from "ky-universal";

const { BASE_URL, VERCEL_URL } = process.env;
const originAPI = ky.create({ prefixUrl: BASE_URL });
const url = VERCEL_URL ? `https://${VERCEL_URL}` : "http://localhost:3000";
const api = ky.create({ prefixUrl: `${url}/api/` });

export { originAPI, api };
