import React from "react";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import MainNav from "../MainSiteNav/MainNav";
import "../Experience/Experience.css";
import ExSubSection from "./ExSubSection";
import SkillsSubSection from "./SkillsSubSection";
import EducationSubSection from "./EducationSubSection";

const ExperiencePage = () => {
  return (
    <>
    <MainNav />
    
   
    <Container fluid className="containerBody exContainer">
      

      <Row className="exBodyRow">
        <Col>
          <Tabs
            defaultActiveKey="Experience"
            id="uncontrolled-tab-example"
            className="mb-3 "
          >
            <Tab eventKey="Experience" title="Experience">
              <ExSubSection />
            </Tab>
            <Tab eventKey="Skills" title="Skills">
              <SkillsSubSection />
            </Tab>
            <Tab eventKey="Education" title="Education">
         <EducationSubSection/>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
     </>
  );
};

export default ExperiencePage;
