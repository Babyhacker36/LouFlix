import React from "react";
import { motion } from "framer-motion";
import { Row, Col, Nav, Tab } from "react-bootstrap";
import ExTab1 from "./ExTab1";
import ExTab2 from "./ExTab2";
import ExTab3 from "./ExTab3";
import ExTab4 from "./ExTab4";
import ExTab5 from "./ExTab5";
import ExTab6 from "./ExTab6";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const ExSubSection2 = () => {
  const variants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 3,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 3,
        staggerChildren: 0.3,
      },
    },
  };

  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [buttonIsClicked2, setButtonIsClicked2] = useState(false);
  const [buttonIsClicked3, setButtonIsClicked3] = useState(false);
  const [buttonIsClicked4, setButtonIsClicked4] = useState(false);
  const [buttonIsClicked5, setButtonIsClicked5] = useState(false);
  const [buttonIsClicked6, setButtonIsClicked6] = useState(false);

  return (
    <Tab.Container id="right-tabs" defaultActiveKey="first">
      <Row className="tabSection row justify-content-center exBackletterE">
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          className="col-md-10 col-xl-5 "
        >
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Row className="RowBorder">
                <Col className="jobTitle" xs={8} md={9}>
                  <motion.p>
                    <span> Introduction </span> <br />
                    <span> Louis Carter</span>
                  </motion.p>
                </Col>
                <Col xs={4} md={3} className="tabBodyBtnCol">
                  <Nav.Link
                    eventKey="first"
                    onClick={() => {
                      setButtonIsClicked2(false);
                      setButtonIsClicked3(false);
                      setButtonIsClicked4(false);
                      setButtonIsClicked5(false);
                      setButtonIsClicked6(false);
                      return setButtonIsClicked(false);
                    }}
                  >
                    {!buttonIsClicked ? (
                      <span>
                        View<span className="hideArrow">&#62;</span>
                      </span>
                    ) : (
                      <span> More <FontAwesomeIcon icon={faCaretRight} style={{marginBottom:"-2.5px"}} /> </span>
                    )}
                  </Nav.Link>
                </Col>
              </Row>
            </Nav.Item>

            <Nav.Item>
              <Row className="RowBorder">
                <Col className="jobTitle" xs={8} md={9}>
                  <motion.p>
                    <span> Full-Stack Developer, Thermon Inc. </span> <br/>
                    <span>  Austin, Tx Aug 2020 - Nov 2024</span>
                  </motion.p>
                </Col>
                <Col className="tabBodyBtnCol" xs={4} md={3}>
                  <Nav.Link
                    eventKey="second"
                    onClick={() => {
                      setButtonIsClicked(true);
                      setButtonIsClicked2(true);
                      setButtonIsClicked3(false);
                      setButtonIsClicked4(false);
                      setButtonIsClicked5(false);
                      setButtonIsClicked6(false);
                    }}
                  >
                    {buttonIsClicked2 ? (
                      <span>
                        View<span className="hideArrow">&#62;</span>
                      </span>
                    ) : (
                      <span>More <FontAwesomeIcon icon={faCaretRight}  style={{marginBottom:"-2.5px"}} /></span>
                    )}
                  </Nav.Link>
                </Col>
              </Row>
            </Nav.Item>

            <Nav.Item>
              <Row className="RowBorder">
                <Col className="jobTitle" xs={8} md={9}>
                  <motion.p>
                    <span> Lead UI Developer, Luminaire Health Benefits </span> <br/>
                    <span>Chicago, IL Mar 2023 - AUG-2024</span>
                  </motion.p>
                </Col>
                <Col className="tabBodyBtnCol" xs={4} md={3}>
                  <Nav.Link
                    eventKey="third"
                    onClick={() => {
                      setButtonIsClicked(true);
                      setButtonIsClicked2(false);
                      setButtonIsClicked3(true);
                      setButtonIsClicked4(false);
                      setButtonIsClicked5(false);
                      setButtonIsClicked6(false);
                    }}
                  >
                    {buttonIsClicked3 ? (
                      <span>
                        View<span className="hideArrow"><FontAwesomeIcon icon={faCaretRight}  style={{marginBottom:"-2.5px"}}/></span>
                      </span>
                    ) : (
                      <span>More <FontAwesomeIcon icon={faCaretRight}  style={{marginBottom:"-2.5px"}} /></span>
                    )}
                  </Nav.Link>
                </Col>
              </Row>
            </Nav.Item>

            <Nav.Item>
              <Row className="RowBorder">
                <Col className="jobTitle" xs={8} md={9}>
                  <motion.p>
                    <span>Web Devlopment Instructor, Socrates Prep</span> <br/>
                    <span> Casselberry, FL Aug 2017 to Jan 2018</span>
                  </motion.p>
                </Col>
                <Col className="tabBodyBtnCol" xs={4} md={3}>
                  <Nav.Link
                    eventKey="fourth"
                    onClick={() => {
                      setButtonIsClicked(true);
                      setButtonIsClicked2(false);
                      setButtonIsClicked3(false);
                      setButtonIsClicked4(true);
                      setButtonIsClicked5(false);
                      setButtonIsClicked6(false);
                    }}
                  >
                    {buttonIsClicked4 ? (
                      <span>
                        View<span className="hideArrow"><FontAwesomeIcon icon={faCaretRight}  style={{marginBottom:"-2.5px"}} /></span>
                      </span>
                    ) : (
                      <span>More <FontAwesomeIcon icon={faCaretRight}  style={{marginBottom:"-2.5px"}} /></span>
                    )}
                  </Nav.Link>
                </Col>
              </Row>
            </Nav.Item>

            <Nav.Item>
              <Row className="RowBorder">
                <Col className="jobTitle" xs={8} md={9}>
                  <motion.p>
                    <span> Instructor, Social Science, Atlantic H.S. </span> <br/>
                    <span> Port Orange, FL Aug 2012 - June 2016</span>
                  </motion.p>
                </Col>
                <Col className="tabBodyBtnCol" xs={4} md={3}>
                  <Nav.Link
                    eventKey="fifth"
                    onClick={() => {
                      setButtonIsClicked(true);
                      setButtonIsClicked2(false);
                      setButtonIsClicked3(false);
                      setButtonIsClicked4(false);
                      setButtonIsClicked5(true);
                      setButtonIsClicked6(false);
                    }}
                  >
                    {buttonIsClicked5 ? (
                      <span>
                        View<span className="hideArrow"><FontAwesomeIcon icon={faCaretRight} /></span>
                      </span>
                    ) : (
                      <span>More <FontAwesomeIcon icon={faCaretRight} /></span>
                    )}
                  </Nav.Link>
                </Col>
              </Row>
            </Nav.Item>

            <Nav.Item>
              <Row>
                <Col className="jobTitle" xs={8} md={9}>
                  <motion.p>
                    <span>Aircraft Systems Spec., U.S. Air Force </span> <br/>
                    <span> Global, July 1999 - July 2012</span>
                  </motion.p>
                </Col>
                <Col className="tabBodyBtnCol" xs={4} md={3}>
                  <Nav.Link
                    eventKey="sixth"
                    onClick={() => {
                      setButtonIsClicked(true);
                      setButtonIsClicked2(false);
                      setButtonIsClicked3(false);
                      setButtonIsClicked4(false);
                      setButtonIsClicked5(false);
                      setButtonIsClicked6(true);
                    }}
                  >
                    {buttonIsClicked6 ? (
                      <span>
                        View<span className="hideArrow">&#62;</span>
                      </span>
                    ) : (
                      <span>More <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon></span>
                    )}
                  </Nav.Link>
                </Col>
              </Row>
            </Nav.Item>
          </Nav>
        </motion.div>
        <Col md={10} xl={5}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <ExTab1 />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <ExTab2 />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <ExTab3 />
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <ExTab4 />
            </Tab.Pane>
            <Tab.Pane eventKey="fifth">
              <ExTab5 />
            </Tab.Pane>
            <Tab.Pane eventKey="sixth">
              <ExTab6 />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ExSubSection2;
