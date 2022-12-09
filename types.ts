// Example of Halte type
// {
//   uniqid: "5adea1162bbc3",
//   nama: "Halte Joyoboyo 2",
//   description: "Jln Wonokromo Tugu Perjuangan",
//   lat: "-7.2988305555555",
//   lon: "112.737875",
//   arah: 2,
//   priority: 44,
//   timetable: "",
//   cuaca: "Cerah Berawan",
//   tanggal: "2022-10-21 12:05:00",
// };

export type Halte = {
  uniqid: string;
  nama: string;
  description: string;
  lat: number;
  lon: number;
  arah: number;
  priority: number;
  timetable: string;
  rute: number;
};

export type Location = {
  lat: number;
  lon: number;
};

export type Bus = {
  info: string;
  location: Location;
};
