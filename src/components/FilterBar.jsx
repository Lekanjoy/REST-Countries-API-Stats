import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import Refresh_dark from "../assets/refresh_dark.png";
import Refresh_light from "../assets/refresh_light.png";

function FilterBar({ filterTerm, setGetCountries }) {
  const theme = useContext(ThemeContext);
  const [isRefreshed, setIsRefreshed] = useState(false);

  const style =
    " py-4 pl-6 pr-8 w-fit font-medium shadow-sm rounded-md cursor-pointer outline-none md:w-52 ";

  const handleFilter = (e) => {
    filterTerm(e.target.value);
    // console.log(e.target.value);
  };

  const handleRefresh = () => {
    // document.getElementById("refresh").classList.toggle("-rotate-180");
    setIsRefreshed((prevState) => !prevState);
  };

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((data) => {
        setGetCountries(data);
        // console.log(data);
      })
      .catch((err) => console.error(err));
  }, [isRefreshed]);

  return (
    <div className="flex gap-x-3 items-center ">
      <select
        onChange={handleFilter}
        className={
          theme === "Dark" ? `${style} bg-DarkBlue` : `${style} bg-White`
        }
      >
        <option value=" ">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <div
        className={
          theme === "Dark"
            ? ` p-3   rounded-md bg-DarkBlue`
            : `p-3  rounded-md bg-White`
        }
      >
        <img
          onClick={handleRefresh}
          src={theme === "Dark" ? Refresh_dark : Refresh_light}
          alt="refresh icon"
          className="w-8 h-8  duration-700 cursor-pointer"
          id="refresh"
        />
      </div>
    </div>
  );
}

export default FilterBar;
