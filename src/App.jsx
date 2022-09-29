import { useState, useEffect, createContext, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";
import Error_404 from "./components/Error_404";

// Sharing Theme context
export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Light");
  const [themeText, setThemeText] = useState("Dark Mode");

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

  const style = "App w-full min-h-screen  px-6 pb-6 relative lg:px-12";

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={
          theme === "Dark"
            ? `${style} bg-VeryDarkBlue  text-White`
            : `${style} bg-VeryLightGray text-VeryDarkBlue`
        }
      >
        <ThemeToggle
          theme={theme}
          toggletheme={toggletheme}
          themeText={themeText}
        />
        <Routes>
          <Route index path="/" element={<Countries />} />
          <Route path="/detail/:countryCode" element={<CountryDetails />} />
          <Route path="*" element={<Error_404 />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
