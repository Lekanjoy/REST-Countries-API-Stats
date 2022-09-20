import { useState, useContext } from "react";
import { ThemeContext } from "../App";

function FilterBar() {
  const theme = useContext(ThemeContext);

  const style =
    " py-4 pl-6 pr-8 w-fit font-medium shadow-sm rounded-md cursor-pointer outline-none md:w-52 ";

  return (
    <select
      className={
        theme === "Dark" ? `${style} bg-DarkBlue` : `${style} bg-White`
      }
    >
      <option selected disabled>
        Filter by Region
      </option>
      <option>Africa</option>
      <option>America</option>
      <option>Asia</option>
      <option>America</option>
      <option>Oceania</option>
    </select>
  );
}

export default FilterBar;
