import { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Slide from "react-reveal/Slide";
import spinner from "../assets/spinner.gif";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import CountryDetails from "./CountryDetails";

function Countries() {
  const [getCountries, setGetCountries] = useState([]);
  const [getCountry, setGetCountry] = useState("");
  const [getRegion, setGetRegion] = useState("");

  // Lazy Component
  const Country = lazy(() => import("./Country"));

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

  return (
    <>
      <div className="w-full md:flex justify-between items-center  md:pt-32">
        <SearchBar searchTerm={(term) => setGetCountry(term)} />
        <FilterBar
        setGetCountries={setGetCountries}
        filterTerm={(term) => setGetRegion(term)}
        />
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
                  className="mx-auto w-12 h-12"
                />
              }
            >
              <Slide bottom>
                <Link to="/detail">
                  <Country country={country} />
                </Link>
              </Slide>
            </Suspense>
          );
        })}
      </div>
    </>
  );
}

export default Countries;
