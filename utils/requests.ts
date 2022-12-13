import ky from "ky-universal";

const { BASE_URL, URL } = process.env;
const originAPI = ky.create({ prefixUrl: BASE_URL });
const api = ky.create({ prefixUrl: `${process.env.URL}/api/` });

export { originAPI, api };
