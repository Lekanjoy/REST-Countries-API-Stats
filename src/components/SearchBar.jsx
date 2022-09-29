import React, { useContext, useState } from "react";
import { ThemeContext } from "../App";
import search_dark from "../assets/search_icon-dark.png";
import search_light from "../assets/search_icon-light.png";

function SearchBar({searchTerm}) {
    let styles = "w-full py-4 pl-20 pr-6 relative shadow-md outline-none font-medium rounded-md "
    const theme = useContext(ThemeContext);
    const [searchValue,setSearchValue] = useState('')

    const handleChange = (e) => {
      searchTerm(e.target.value);
      // setSearchValue(e.target.value);
    }

  return (
    <div className="w-full pt-[8rem] mb-10 relative md:w-2/5 md:mb-0 md:pt-0">
      <input
        id="search"
        // value={searchValue}
        onChange={handleChange}
        type="search"
        placeholder="Search for a country..."
        className={
          theme === "Dark"
            ? `${styles} bg-DarkBlue  placeholder:text-White`
            : `${styles} bg-White text-VeryDarkBlue  placeholder:text-DarkGray`
        }
      />
      <img
        src={theme === "Dark" ? search_dark : search_light}
        alt="search-icon"
        className="w-7 h-7 absolute top-[142px] left-5 md:top-4"
      />
    </div>
  );
}

export default SearchBar;
