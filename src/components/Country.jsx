import React, { useContext } from "react";
import { ThemeContext } from "../App";

function Country({ country }) {
  const theme = useContext(ThemeContext);
  const styles = "font-light";
 
  let population = country.population.toLocaleString()

  return (
    <div className="mt-5 w-full h-auto border rounded-md shadow-md lg:w-[18rem]  md:hover:scale-110 md:hover:ease-in-out  md:hover:duration-500 ">
      <img
        src={country.flags.png}
        alt="flag"
        className="w-full rounded-md h-52 mb-4 cursor-pointer"
      />
      <div className="px-4 pt-3 pb-10">
        <h1 className="text-xl font-semibold mb-3">{country.name.common}</h1>
        <p className="mb-1 ">
          Population:{" "}
          <span
            className={theme === "Dark" ? `${styles} opacity-50` : `${styles}`}
          >
            {population}
          </span>
        </p>
        <p className="mb-1">
          Regions:{" "}
          <span
            className={theme === "Dark" ? `${styles} opacity-50` : `${styles}`}
          >
            {country.region}
          </span>
        </p>
        <p>
          Capital:{" "}
          <span
            className={theme === "Dark" ? `${styles} opacity-50` : `${styles}`}
          >
            {country.capital}{" "}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Country;
