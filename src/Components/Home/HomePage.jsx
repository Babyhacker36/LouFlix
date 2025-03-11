// import { Container } from "react-bootstrap";
import React from "react";
import SvgBanner from "./Banner";
import HomeNav from "./HomeNav";
import SpeechDiv from "./SpeechDiv";
import "../Home/HomeStyle.css";
import "../../mobileStyle.css"

const HomePage = () => {
  return (
    <div className="svgContainer">
      <SvgBanner />
      <SpeechDiv />
      <HomeNav />
    </div>
  );
};

export default HomePage;
