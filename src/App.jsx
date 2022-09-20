import {
  useState,
  useEffect,
  useContext,
  createContext,
  lazy,
  Suspense,
} from "react";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
// import Country from "./components/Country";

// Sharing Theme context
export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");
  const [themeText, setThemeText] = useState("Dark Mode");
  const [getCountries, setGetCountries] = useState([]);
  const [getCountry, setGetCountry] = useState("/");
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

  //restcountries.com/v3.1/all/region/{africa}/name/{nigeria}

  // Keep Theme Persistent after reload
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fetching Countries Data
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((data) => {
        setGetCountries(data);
        // console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

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
          <SearchBar />
          <FilterBar />
        </div>
        <div className="grid mt-6 md:grid-cols-3 gap-4 md:place-items-center lg:grid-cols-4">
          {getCountries.map((country) => {
            return(
            <Suspense key={country.name.official} fallback={<h1 className="mx-auto text-2xl h-screen">Fetching Country. . .</h1>}>
              <Country country={country} />
            </Suspense>);
            // return <Country country={country} />;
          })}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
