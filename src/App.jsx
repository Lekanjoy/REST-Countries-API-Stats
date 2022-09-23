import { useState, useEffect, createContext, lazy, Suspense } from "react";
import { Link, Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";

// Sharing Theme context
export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");
  const [themeText, setThemeText] = useState("Dark Mode");
  const [getCountries, setGetCountries] = useState([]);
  const [getCountry, setGetCountry] = useState("");
  const [getRegion, setGetRegion] = useState("");

  // Toggle Theme
  function toggletheme() {
    if (theme == "Dark") {
      setTheme("Light");
      setThemeText("Light Mode");
    } else {
      setTheme("Dark");
      setThemeText("Dark Mode");
    }
  }

  // Keep Theme Persistent after reload
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Getting Data for specific country
  async function getCountryData() {
    try {
      let res = await fetch(
        `https://restcountries.com/v3.1/name/${getCountry}`
      );
      let data = await res.json();
      setGetCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Getting Data for region/continents
  async function getFilteredCountriesData() {
    try {
      let res = await fetch(
        `https://restcountries.com/v3.1/region/${getRegion}`
      );
      let data = await res.json();
      setGetCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Fetching Countries Data
  useEffect(() => {
    if (getCountry === "" && getRegion === "") {
      fetch(`https://restcountries.com/v3.1/all`)
        .then((res) => res.json())
        .then((data) => {
          setGetCountries(data);
          // console.log(data);
        })
        .catch((err) => console.error(err));
    } else if (getCountry !== "" && getRegion === "") {
      getCountryData();
    } else {
      getFilteredCountriesData();
    }
  }, [getCountry, getRegion]);

  const style = "App w-full h-full  px-6 pb-6 relative lg:px-12";

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={
          theme === "Dark"
            ? `${style} bg-VeryDarkBlue  text-White `
            : `${style} bg-VeryLightGray text-VeryDarkBlue`
        }
      >
        <ThemeToggle
          theme={theme}
          toggletheme={toggletheme}
          themeText={themeText}
        />
        <div className="w-full md:flex justify-between items-center  md:pt-32">
          <SearchBar searchTerm={(term) => setGetCountry(term)} />
          <FilterBar
            setGetCountries={setGetCountries}
            filterTerm={(term) => setGetRegion(term)}
          />
        </div>
        <div className="grid mt-6 md:grid-cols-3 gap-4 md:place-items-center lg:grid-cols-4">
          <Countries getCountries={getCountries} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
