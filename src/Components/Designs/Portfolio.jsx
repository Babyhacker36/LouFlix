import React from "react";
import { Row, Col } from "react-bootstrap";
import "../Designs/Designs.css";
import PortfolioBlock from "./PortfolioBlock";
import {info} from "../info/Info"

const Portfolio = () => {
  return (
    <>
      <Row className="porfolio-container-row">

       
      {info.portfolio.map((project, index) => (
          <Col xs={12} xl={6} key={index} className="portfolio-col">
            <PortfolioBlock
              image={project.image}
              live={project.live}
              source={project.source}
              title={project.title}
            />
          </Col>
        ))}
   
      </Row>
    </>
  );
};

export default Portfolio;
