import React from "react";
import { Row, Col } from "react-bootstrap";

const ExMobileNav = () => {
  return (
    <Row className="exNavRow">
      <Col className="exHeader">
        <span className="panel__nav">
          Experience
        </span>
        <span className="panel__nav ">
       Skills
        </span>
        <span className="panel__nav">
        Education
      </span>
      </Col>
    </Row>
  );
};

export default ExMobileNav;
