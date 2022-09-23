import { lazy, Suspense } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Slide from "react-reveal/Slide";
import spinner from "../assets/spinner.gif";

function Countries({ getCountries }) {
  const Country = lazy(() => import("./Country"));

  return (
    <>
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
              <Link to="/detail">
                <Country country={country} />
              </Link>
            </Slide>
          </Suspense>
        );
      })}
    </>
  );
}

export default Countries;
