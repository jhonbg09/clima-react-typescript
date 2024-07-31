export type SearchType = {
  city: string;
  country: string;
};

export type Country = {
  code: string;
  name: string;
};

// Opcion 1 Casteando datos
// export type weather = {
//     name: string;
//     temp: number;
//     temp_max: number;
//     temp_min: number;
// }

// Opcion 2 Tipe Guard
export type Weather = {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
};
