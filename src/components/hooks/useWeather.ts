import axios from "axios"
import { SearchType } from "../../types"
export default function useWeather(){
    const fetchWeather = async(search: SearchType) =>{
        //Nuetra key la debemos ocultar por que si la dejamos en el codigo puede hacer cualquier usuario o . persona que clone el repositorio puede hacer un request y van a ser gastados del usuario de desarrollo, por ende se deben un archivo .env para agregar las variables de entorno que no quiero que se suban al repositorio. hay que evitar dejar esta informacion sencible en el codigo.
        
        const appId = 'd4a54a32f8c0375ac1e4d736c1ad631d'
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            // asi puedo comprobar que me esta llegando la informacion y se esta consumiendo la api
            //  console.log(geoUrl)

            // esta peticion es de tipo get, lo hace por default
            // de esta manera me trae toda la informacion qeu hay en la URL const - data = await axios(geoUrl)
            // De esta manera me trae toda la informacion del objeto que necesito o que esto haciendo la peticion - const {data} = await axios(geoUrl)
            const {data} = await axios(geoUrl)

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return {
        fetchWeather
    }
}