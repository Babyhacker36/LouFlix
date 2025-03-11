import React from "react";
import { Row, Col } from "react-bootstrap";

function EmojiBullet(props) {
  const { emoji, text } = props;

  return (
    <Row>
      <Col>
        <div className="emojidiv">
          <div style={{ width: "30px" }}>{emoji}</div>
          <div>{text}</div>

          
        </div>
      </Col>
    </Row>
  );
}

export default EmojiBullet;
