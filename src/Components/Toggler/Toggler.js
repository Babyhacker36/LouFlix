import React from "react";

import moonIcon from "../../images/daymode.png";
import sunIcon from "../../images/nightmode.png";

export default function Toggler({ darkMode, handleClick }) {
  return (
    <img
      src={darkMode ? moonIcon : sunIcon}
      alt="Mode Toggle Icon"
      onClick={handleClick}
    />
  );
}
