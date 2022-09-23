import { useContext } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { ThemeContext } from "../App";
import previous_light from "../assets/back-light.png";
import previous_dark from "../assets/back-dark.png";
import flag from '../assets/flag.png'
import App from "../App";



function CountryDetails() {
  const theme = useContext(ThemeContext);

  return (
    <section className="mt-12 w-full h-auto">
        <Link to='/'>
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

      <div className="flex flex-col flex-1 gap-x-8  w-full  mt-16 md:flex-row  md:justify-between md:items-center lg:gap-x-6">
        <div className=" w-full md:w-1/2">
          <img
            src={flag}
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
                    Belgium
                  </h1>
                  <p className="mb-2 font-medium">
                    Native Name: <span className="opacity-75">Belgie</span>
                  </p>
                  <p className="mb-2 font-medium">
                    Population: <span className="opacity-75">123544336</span>
                  </p>
                  <p className="mb-2 font-medium">
                    Region: <span className="opacity-75">Europe</span>
                  </p>
                  <p className="mb-2 font-medium">
                    Sub Region:{" "}
                    <span className="opacity-75">Western Europe</span>
                  </p>
                  <p className="mb-2 font-medium">
                    Capital: <span className="opacity-75">Brussels</span>
                  </p>
                </div>
                <div className="right mt-6 md:mt-0">
                  <p className="mb-2 font-medium">
                    Top Level Domain: <span className="opacity-75">.be</span>
                  </p>
                  <p className="mb-2 font-medium">
                    Currencies: <span className="opacity-75">Euro</span>
                  </p>
                  <p className="mb-2 font-medium whitespace-nowrap">
                    Languages:{" "}
                    <span className="opacity-75">Dutch, French, German</span>
                  </p>
                </div>
              </div>
              <div className="my-6 items-center  md:mt-12 md:flex md:whitespace-nowrap">
                <p className="mr-2 mb-4 md:mb-0 ">Border Countries: </p>
                <div className="flex flex-1">
                  <span
                    className={
                      theme === "Dark"
                        ? ` py-1 px-5  shadow-md w-fit rounded-md mr-2  bg-DarkBlue`
                        : `py-1 px-5 w-fit shadow-md  rounded-md mr-2 bg-White`
                    }
                  >
                    France,{" "}
                  </span>
                  <span
                    className={
                      theme === "Dark"
                        ? ` py-1 px-5 shadow-md  w-fit rounded-md mr-2  bg-DarkBlue`
                        : `py-1 px-5 shadow-md w-fit  rounded-md mr-2 bg-White`
                    }
                  >
                    Germany,{" "}
                  </span>
                  <span
                    className={
                      theme === "Dark"
                        ? ` py-1 px-5 shadow-md  w-fit rounded-md mr-2  bg-DarkBlue`
                        : `py-1 px-5 shadow-md w-fit  rounded-md  mr-2 bg-White`
                    }
                  >
                    Netherlands
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CountryDetails;
