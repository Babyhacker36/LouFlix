import React from "react";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

const DesignHeader = () => {
  const [classNameItem, setclassNameItem] = useState("dotDivHide ");

  var i = 0;
  var txt = "Louis Carter Jr";
  const typeOut = (string) => {
    setTimeout(() => {
      if (i < string.length) {
        document.getElementsByClassName(
          "typewrite"
        )[0].innerHTML += string.charAt(i);
        i++;
        typeOut(txt);
      }
    }, 100);
  };

  useEffect(() => {
    setTimeout(() => {
   typeOut(txt);
    }, 100);
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setclassNameItem("");
    }, 1000);
  }, []);

  return (
    <Row className="designheaderRow">
      <Col className="bannerCol">
        <div>
          <span className="typewrite miamiGlow"></span>
          <span className="subHeader">Full-Stack (React.JS) Developer</span>
          <span className="subHeader">View Portfolio</span>
        </div>
        <div className={`dotDiv ${classNameItem}`}>
          <div className="dot"></div>
        </div>
        
      </Col>
    </Row>
  );
};

export default DesignHeader;
