import { countries } from "../../data/countries";
import style from "./Form.module.css";
import { useState } from "react";
function Form() {
  return (
    <form className={style.form}>
      <div className={style.field}>
        <label htmlFor="city">Ciudad:</label>
        <input id="city" type="text" name="city" placeholder="Ciudad" />
      </div>

      <div className={style.field}>
      <label htmlFor="city">Pais:</label>
        <select name="country" id="country">
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
