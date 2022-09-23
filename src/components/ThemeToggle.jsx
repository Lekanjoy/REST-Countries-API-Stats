import React, { useState, useContext } from "react";
import sun from "../assets/sun_icon.png";
import moon from "../assets/_moon_icon.png";
import { ThemeContext } from "../App";

function ThemeToggle({ toggletheme, themeText }) {
  const theme = useContext(ThemeContext);
  let style =
    "flex justify-between  items-center w-full top-0 left-0 right-0 text-md  font-semibold fixed z-10  px-4 py-8  shadow-md md:text-xl lg:px-12";

  return (
    <div
      className={
        theme === "Dark" ? `${style} bg-DarkBlue` : `${style} bg-White`
      }
    >
        <h1 className="font-extrabold">Where in the world?</h1>
      <div className="flex gap-x-1 items-center">
        <img
          onClick={toggletheme}
          src={theme === "Dark" ? moon : sun}
          alt="theme"
          className="w-8 h-8 cursor-pointer"
        />
        <p>{themeText}</p>
      </div>
    </div>
  );
}

export default ThemeToggle;
