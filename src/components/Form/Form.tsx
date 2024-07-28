import { countries } from "../../data/countries";
import type { SearchType } from "../../types/index";
import Alert from "../Alert/Alert";
import style from "./Form.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

function Form({fetchWeather}: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearch({
      ...search, [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    if(Object.values(search).includes('')){
      setAlert('Todos los campos son obligatorios')
    return
  }
  fetchWeather(search);
}

  return (
    <form 
    className={style.form}
    onSubmit={handleSubmit}
    >
      {alert && <Alert>{alert}</Alert>}
      <div className={style.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={style.field}>

        <label htmlFor="city">Pais:</label>

        <select 
        name="country" 
        id="country" 
        value={search.country}
        onChange={handleChange}
        >
          <option value="">-- Seleccione un país --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={style.submit} type="submit" value="Consultar clima" />

    </form>
  );
}

export default Form;
