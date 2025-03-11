import React from "react";
import MainNav from "../MainSiteNav/MainNav";
import Container from "react-bootstrap/Container";
import "../Designs/Designs.css";
import DesignHeader from "./DesignHeader";
import Portfolio from "./Portfolio";

const DesignsPage = () => {
  return (
    <>
      <MainNav />
      <Container fluid className="containerBody designsContainer">
        <DesignHeader />
      </Container>
      <Container fluid>
        <Portfolio />
      </Container>
    </>
  );
};

export default DesignsPage;
