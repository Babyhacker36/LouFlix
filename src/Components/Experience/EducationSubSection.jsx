import React from "react";
import { Row, Col } from "react-bootstrap";

const EducationSubSection = () => {
  return (
    <>
      <Row className="justify-content-center exBackletterE">
        <Col xl={10} className="EdCol">
          <div className="innerDiv">
            <p>
              <span>B.S., Computer Science</span> <br />
              <span>University of Central Florida, Graduate May 2019</span>
            </p>
          </div>
          <div className="innerDiv">
            <p>
              <span>UCF Coding Camp (24 Wks), Web Development </span> <br />
              <span>University of Central Florida, Graduate May 2018</span>
            </p>
          </div>
          <div className="innerDiv">
            <p>
              <span>B.S., Criminal Justice </span> <br />
              <span>Colorado Technical University, Graduate May 2008</span>
            </p>
          </div>
          <div className="innerDiv">
            <p>
              <span>A.S., Systems Technology </span> <br />
              <span>Air Force Institute of Technology, Graduate May 2002</span>
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EducationSubSection;
