import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import Refresh_dark from "../assets/refresh_dark.png";
import Refresh_light from "../assets/refresh_light.png";

function FilterBar({
  setGetCountry,
  setGetRegion,
  filterTerm,
  getAllCountriesData,
}) {
  const theme = useContext(ThemeContext);
  const [isRefreshed, setIsRefreshed] = useState(false);

  const style =
    " py-4 pl-6 pr-8 w-fit font-medium shadow-sm rounded-md cursor-pointer outline-none md:w-52 ";

  // Getting User filter value amd setting it to the filterTerm
  const handleFilter = (e) => {
    filterTerm(e.target.value);
  };

  // Setting all values/fields to default
  const handleRefresh = () => {
    setIsRefreshed((prevState) => !prevState);
    setGetCountry("");
    setGetRegion("");
    let search = document.getElementById("search");
    search.value = "";
    let filter = document.getElementById("filter");
    filter.value = "Filter by Region";
  };

  // Calling the countries function whenever refresh button is clicked
  useEffect(() => {
    getAllCountriesData();
  }, [isRefreshed]);

  return (
    <div className="flex gap-x-3 items-center ">
      <select
        id="filter"
        onChange={handleFilter}
        className={
          theme === "Dark" ? `${style} bg-DarkBlue` : `${style} bg-White`
        }
      >
        <option disabled selected>
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <div
        className={
          theme === "Dark"
            ? ` p-3 shadow-sm   rounded-md bg-DarkBlue`
            : `p-3  shadow-sm rounded-md bg-White`
        }
      >
        <img
          onClick={handleRefresh}
          src={theme === "Dark" ? Refresh_dark : Refresh_light}
          alt="refresh icon"
          className="w-8 h-8  duration-700 cursor-pointer hover:-rotate-180"
          id="refresh"
        />
      </div>
    </div>
  );
}

export default FilterBar;
