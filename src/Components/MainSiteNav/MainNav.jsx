import React, { useState, useEffect } from "react";
import { Row, Col, Offcanvas, Container } from "react-bootstrap";
import { Divide as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../../mobileStyle.css";
import MobileSMCanvas from "./MobileSMCanvas";
// import BrandLogo from "../../images/Logo.png";
import BrandLogoDark from "../../images/Logo_dark.png";
import Toggler from "../Toggler/Toggler"; 
import "../../App.css";

const MainNav = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  // Toggle dark mode
  const handleToggle = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode");
  };
// Main Horizontal Nav
  const links = [
    { path: "/AboutMe", name: "AboutMe" },
    { path: "/Portfolio", name: "Portfolio" },
    { path: "/Career", name: "Career" },
    { path: "/Contact", name: "Contact" },
  ];

  return (
    <>
    <Container fluid className="site-nav-row-parent">


    
      <Row className="siteNavRow">
        <Col xs={3}  className="logoBrandCol">
          <Link to="/">
            <img src={BrandLogoDark} alt="Brand Logo" className="brandLogo" />
          </Link>
        
           <div className="toggle-div"> <Toggler darkMode={darkMode} handleClick={handleToggle} /></div>
        </Col>
        <Col xs={9}  className="siteNavCol">
          <ul>
            {links.map((link) => (
              <li
                key={link.path}
                className={activeTab === link.path ? "active" : ""}
              >
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        
        </Col>
        <Col className="HamMenuCol" xs={9} >
          <Hamburger
            rounded
            // color="var(--dark)"
            duration={0.4}
            easing="ease-in"
            size={60}
            toggled={show}
            toggle={setShow}
            hideOutline={false}
            onClick={handleShow}
            className="ham-menu"
          />
        </Col>
      </Row>
      <Offcanvas show={show} onHide={handleClose}>
    
        <Offcanvas.Body>
          <Col className="MobileMenuCanvas">
            <ul>
              {links.map((link) => (
                <li
                  key={link.path}
                  className={activeTab === link.path ? "active" : ""}
                >
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
            <MobileSMCanvas />
          </Col>
          
        </Offcanvas.Body>
      </Offcanvas>
      </Container>
    </>
  );
};

export default MainNav;
