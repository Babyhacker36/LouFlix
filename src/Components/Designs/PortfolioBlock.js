import React from "react";
import IconLink from "./IconLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faCode } from "@fortawesome/free-solid-svg-icons";
function PortfolioBlock(props) {

  const { image, live, title, source } = props;
  return (
    <>
      <img src={image} alt="Porfolioimages"  className="Portfolio-images" />
      <h1 style={{ fontSize: "2rem" }}>{title}</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="demo-btns">
          <FontAwesomeIcon icon={faDesktop} />
          <IconLink link={live} title={"Live Demo"} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="demo-btns">
          <FontAwesomeIcon icon={faCode} />
          <IconLink link={source} title={"Source Code"} />
        </div>
      </div>
    </>
  );
}

export default PortfolioBlock;
