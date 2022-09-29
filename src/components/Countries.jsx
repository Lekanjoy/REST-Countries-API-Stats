import { useState, createContext, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Slide from "react-reveal/Slide";
import spinner from "../assets/spinner.gif";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

function Countries() {
  const [getCountries, setGetCountries] = useState([]);
  const [getCountry, setGetCountry] = useState("");
  const [getRegion, setGetRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Lazy Component
  const Country = lazy(() => import("./Country"));

  // Getting Data for specific country
  async function getCountryData() {
    try {
      let res = await fetch(
        `https://restcountries.com/v3.1/name/${getCountry}`
      );
      let data = await res.json();
      if (data.length >= 1) {
        setGetCountries(data);
        setIsLoading(false);
      } else {
        setGetCountries([]);
        setIsLoading(false);
      }
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
// Getting Data for all country
  async function getAllCountriesData() {
    try {
      let res = await fetch(`https://restcountries.com/v3.1/all`);
      let data = await res.json();
      setGetCountries(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
 

  // Fetching Country(ies) Data
  useEffect(() => {
    if (getCountry === "" && getRegion === "") {
      getAllCountriesData();
    } else if (getCountry !== "" && getRegion === "") {
      getCountryData(); 
    } else {
      getFilteredCountriesData();
    }
  }, [getCountry, getRegion]);

  return (
    <>
      <div className="w-full md:flex justify-between items-center  md:pt-32">
        <SearchBar searchTerm={(term) => setGetCountry(term)} />
        <FilterBar
          filterTerm={(term) => setGetRegion(term)}
          setGetCountry={setGetCountry}
          setGetRegion={setGetRegion}
          getAllCountriesData={getAllCountriesData}
        />
      </div>
      <div className="grid mt-6 md:grid-cols-3 gap-4 md:place-items-center lg:grid-cols-4">
        {!isLoading && getCountries.length === 0 ? (
          <h1 className="text-3xl h-[85vh] mx-auto text-center">
            No Country Found with Name {getCountry}
          </h1>
        ) : (
          getCountries.map((country) => {
            return (
              <Suspense
                key={country.name.official}
                fallback={
                  <img
                    src={spinner}
                    alt="preloader-spinner"
                    className="mx-auto w-12 h-12"
                  />
                }
              >
                <Slide bottom>
                  <Link to={`/detail/${country.cca3}`}>
                    <Country country={country} />
                  </Link>
                </Slide>
              </Suspense>
            );
          })
        )}
      </div>
    </>
  );
}

export default Countries;
