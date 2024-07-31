import axios from "axios";
import { z } from "zod";
import { SearchType, Weather } from "../../types";
import { useMemo, useState } from "react";
// import { object, string, number, Output, parse } from "valibot";

// type GuardType o assertion

//unknown representa el tipo de dato que no se reconoce aun "no sabemos que tipo de dato nos va a llegar en nuestra peticion con axios"

// con esta funcion me va a verificar de que realmente esta cumpliendo con esta estructura y me va a devolver true
// function isWeatherResponse(weather: unknown): weather is weather{
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof(weather as weather).name === "string" &&
//     typeof(weather as weather).main.temp === "number" &&
//     typeof(weather as weather).main.temp_max === "number" &&
//     typeof(weather as weather).main.temp_min === "number"
//   )
// }

// ZOD
const Weather = z.object({
// Esquima para crear en ZOD
// name: string;
// main: {
//   temp: number;
//   temp_max: number;
//   temp_min: number;
// };
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  })
})

export type Weather = z.infer<typeof Weather>;

//VALIBOT
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   })
// })

// type Weather = Output<typeof WeatherSchema>

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  }
}

export default function useWeather() {

  const [weather, setWeather] = useState<Weather>(initialState)

  const [loading, setLoading] = useState(false)

  const fetchWeather = async (search: SearchType) => {
    //Nuetra key la debemos ocultar por que si la dejamos en el codigo puede hacer cualquier usuario o . persona que clone el repositorio puede hacer un request y van a ser gastados del usuario de desarrollo, por ende se deben un archivo .env para agregar las variables de entorno que no quiero que se suban al repositorio. hay que evitar dejar esta informacion sencible en el codigo.

    // con import.meta.env.VITE_API_KEY traemos la variable de entorno que esta guardando el key de la api

    const appId = import.meta.env.VITE_API_KEY;
      setLoading(true);
      setWeather(initialState);
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      // asi puedo comprobar que me esta llegando la informacion y se esta consumiendo la api
      //  console.log(geoUrl)

      // esta peticion es de tipo get, lo hace por default
      // de esta manera me trae toda la informacion qeu hay en la URL const - data = await axios(geoUrl)
      // De esta manera me trae toda la informacion del objeto que necesito o que esto haciendo la peticion - const {data} = await axios(geoUrl)
      const { data } = await axios(geoUrl);

      //   Creo las variables para puder hacer la segunda peticion a la API que me llegan en la primera consulta

      const lat = data[0].lat;

      const lon = data[0].lon;

      //Creo la segunda peticion de la API para hacer el llamado con las variables lat lon

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
      // console.log(weatherUrl);

      // para que no genere conflicto con la variable de la primera consulta la podemos renombrar ya que axios siempre va a retornar toda la informacion con la variable data la podemos renombrar asi - const {data: weatherResult}

      // Metodos para  tipiar en typescript cuando se hce una consulta a una api

      // Castear el type
      // const {data: weatherResult} = await axios<weather>(weatherUrl);==para este metodo creamos un type para definir las variables esta se crea en  types/index.ts
      // console.log(weatherResult);

      // type Guards
      // const {data: weatherResult} = await axios(weatherUrl);
      // const result = isWeatherResponse(weatherResult)
      // console.log(result);
      // if(result) {
      //   console.log(weatherResult.name)
      // }

      // Libreria ZOD - npm i zod
      const { data: weatherResult } = await axios(weatherUrl);
      const result = Weather.safeParse(weatherResult);
      if (result.success) {
        setWeather(result.data);
      }

      //Valibot

      // const { data: weatherResult } = await axios(weatherUrl);
      // const result = parse(WeatherSchema, weatherResult)
      // console.log(result)
      // if(result){
      //   console.log(result.name)
      // }

    } catch (error) {
      console.log(error);
    }  finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(()=> weather.name ,[weather])

  return {
    weather,
    loading,
    fetchWeather,
    hasWeatherData
  };
}
