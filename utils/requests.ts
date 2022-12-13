import ky from "ky-universal";

const { BASE_URL, VERCEL_URL } = process.env;
const originAPI = ky.create({ prefixUrl: BASE_URL });
const api = ky.create({ prefixUrl: `${VERCEL_URL || "http://localhost:3000"}/api/` });

export { originAPI, api };
