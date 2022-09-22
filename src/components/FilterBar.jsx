import { useState, useContext } from "react";
import { ThemeContext } from "../App";

function FilterBar({ filterTerm }) {
  const theme = useContext(ThemeContext);

  const style =
    " py-4 pl-6 pr-8 w-fit font-medium shadow-sm rounded-md cursor-pointer outline-none md:w-52 ";

  const handleFilter = (e) => {
    filterTerm(e.target.value);
    console.log(e.target.value);
  };

  return (
    <select
      onChange={handleFilter}
      className={
        theme === "Dark" ? `${style} bg-DarkBlue` : `${style} bg-White`
      }
    >
      <option selected disabled value=" ">Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="America">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}

export default FilterBar;
