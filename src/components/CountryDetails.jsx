import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../App";
import previous_light from "../assets/back-light.png";
import previous_dark from "../assets/back-dark.png";
import spinner from "../assets/spinner.gif";

function CountryDetails() {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useContext(ThemeContext);

  let { countryCode } = useParams();
  let code = JSON.stringify(countryCode).replace(/['"]+/g, "");
  let currenciesArr = [];
  let languageArr = [];

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${code}`
      );
      const data = await response.json();
      setCountry(data[0]);
      setIsLoading(false);
    };

    fetchCountry();
  }, [countryCode]);

  return (
    <section className="pt-32 max-w-full">
      <Link className="inline-flex" to="/">
        <div
          className={
            theme === "Dark"
              ? ` py-1 px-5  w-fit rounded-md flex items-center gap-x-1 cursor-pointer bg-DarkBlue`
              : `py-1 px-5 w-fit  rounded-md flex items-center gap-x-1 cursor-pointer bg-White`
          }
        >
          <img
            src={theme === "Dark" ? previous_dark : previous_light}
            alt="refresh icon"
            className="w-7 h-7  duration-700 cursor-pointer"
            id="refresh"
          />
          Back
        </div>
      </Link>

      {isLoading ? (
        <img
          src={spinner}
          alt="loading-spinner"
          className="w-12 h-12 mx-auto relative top-[25vh]"
        />
      ) : (
        <div className="flex flex-col flex-1 gap-x-8  w-full  mt-16 md:flex-row  md:justify-between md:items-center lg:gap-x-6">
          <div className=" w-full md:w-1/2">
            <img
              src={country.flags.png}
              alt="flag"
              className=" w-full md:w-[450px] md:h-[350px]"
            />
          </div>

          <div className="details flex justify-between w-1/2">
            <div className="data flex justify-between ">
              <div className="flex flex-col">
                <div className="flex flex-col gap-x-12 md:flex-row  md:items-center">
                  <div className="left ">
                    <h1 className="mb-6 mt-12 text-2xl font-extrabold">
                      {country.name.common}
                    </h1>
                    <p className="mb-2 font-medium">
                      Native Name:{" "}
                      <span className="opacity-75">
                        {
                          country.name.nativeName[
                            Object.keys(country.name.nativeName)[0]
                          ].common
                        }
                      </span>
                    </p>
                    <p className="mb-2 font-medium">
                      Population:{" "}
                      <span className="opacity-75">
                        {country.population.toLocaleString()}
                      </span>
                    </p>
                    <p className="mb-2 font-medium">
                      Region:{" "}
                      <span className="opacity-75">{country.region}</span>
                    </p>
                    <p className="mb-2 font-medium">
                      Sub Region:{" "}
                      <span className="opacity-75">{country.subregion}</span>
                    </p>
                    <p className="mb-2 font-medium">
                      Capital:{" "}
                      <span className="opacity-75">{country.capital}</span>
                    </p>
                  </div>
                  <div className="right mt-6 md:mt-0">
                    <p className="mb-2 font-medium">
                      Top Level Domain:{" "}
                      <span className="opacity-75"> {country.tld[0]}</span>
                    </p>
                    <p className="mb-2 font-medium ">
                      <span className="hidden">
                        {Object.keys(country.currencies).map((curr) => {
                          return currenciesArr.push(
                            country.currencies[curr].name
                          );
                        })}
                      </span>
                      <span>
                        {currenciesArr.length === 1
                          ? "Currency: "
                          : "Currencies: "}
                      </span>
                      <span className="opacity-75">
                        {currenciesArr.join(", ")}
                      </span>
                    </p>
                    <p className="mb-2 font-medium whitespace-nowrap">
                      <span className="hidden">
                        {" "}
                        {Object.keys(country.languages).map((lang) => {
                          return languageArr.push(country?.languages[lang]);
                        })}
                      </span>

                      <span className="font-bold">
                        {languageArr.length === 1
                          ? "Language: "
                          : "Languages: "}
                      </span>
                      <span className="opacity-75">
                        {languageArr.join(", ")}
                      </span>
                    </p>
                  </div>
                </div>
                <div className=" w-full my-6 items-center  md:mt-12 md:flex md:gap-x-2">
                  <p className=" mr-2 mb-4 md:mb-0 whitespace-nowrap">
                    Border Countries:{" "}
                  </p>
                  <div className=" w-full h-auto grid grid-cols-4 gap-x-16 gap-y-3 md:flex md:flex-wrap md:gap-3">
                    {country.borders ? (
                      country.borders.map((border) => {
                        return (
                          <Link to={`/detail/${border}`} key={border}>
                            <p
                              className={
                                theme === "Dark"
                                  ? ` py-1 px-3  shadow-md  w-fit rounded-md    bg-DarkBlue`
                                  : `py-1 px-3 w-fit shadow-md  rounded-md  bg-White`
                              }
                            >
                              {border}
                            </p>
                          </Link>
                        );
                      })
                    ) : (
                      <span className="block whitespace-nowrap text-sm opacity-75">
                        {country.name.common} has no border countries
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CountryDetails;
