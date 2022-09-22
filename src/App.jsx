import {
  useState,
  useEffect,
  useContext,
  createContext,
  lazy,
  Suspense,
  Routes,
  Route
} from "react";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import Slide from "react-reveal/Slide";
// import Country from "./components/Country";
import spinner from './assets/Broken-circle-unscreen.gif'


// Sharing Theme context
export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");
  const [themeText, setThemeText] = useState("Dark Mode");
  const [getCountries, setGetCountries] = useState([]);
  const [getCountry, setGetCountry] = useState("");
  const [getRegion, setGetRegion] = useState("");

  function toggletheme() {
    if (theme == "Dark") {
      setTheme("Light");
      setThemeText("Light Mode");
    } else {
      setTheme("Dark");
      setThemeText("Dark Mode");
    }
  }

  //`https://restcountries.com/v3.1/all/name/${getCountry}`
  // https://restcountries.com/v3.1/${all}
  // https://restcountries.com/v3.1/name/${peru}
  // https://restcountries.com/v3.1/region/${asia}

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
        })
        .catch((err) => console.error(err));
    } else if (getCountry !== "" && getRegion === "") {
      getCountryData();
    } else {
      getFilteredCountriesData();
    };

  }, [getCountry, getRegion]);

  // Fetching Country Search Data
  // useEffect(() => {
  //   fetch(`https://restcountries.com/v3.1/name/${getCountry}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setGetCountries(data);
  //       // console.log(data);
  //     })
  //     .catch((err) => console.error(err));
  // }, [getCountry]);

  const Country = lazy(() => import("./components/Country"));

  const style = "App w-full h-full  px-6 pb-6 relative";

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
          <FilterBar filterTerm={(term) => setGetRegion(term)} />
        </div>
       
        <div className="grid mt-6 md:grid-cols-3 gap-4 md:place-items-center lg:grid-cols-4">
          {getCountries.map((country) => {
            return (
              <Suspense
                key={country.name.official}
                fallback={
                    <img
                      src={spinner}
                      alt="preloader-spinner"
                      className="mx-auto text-2xl w-12 h-12"
                    />
                }
              >
                <Slide bottom>
                  <Country country={country} />
                </Slide>
              </Suspense>
            );
          })}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
