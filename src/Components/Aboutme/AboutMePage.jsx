import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainNav from "../MainSiteNav/MainNav";
import { info } from "../info/Info";
import EmojiBullet from "../Aboutme/EmojiBullet";
import SocialIcon from "./SocialIcon";
import "../Aboutme/AboutMe.css";
import Self from "../../images/self.jpg";
import SecondImage from "../../images/Lou_self_animated.gif"; 
import ThirdImage from "../../images/me3.png";
import ForthImage from "../../images/hackermask.jpg"; 


const AboutMePage = () => {
  const [currentImage, setCurrentImage] = useState(Self); 

  useEffect(() => {
    const images = [Self, SecondImage, ThirdImage, ForthImage]; 

    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        return images[(currentIndex + 1) % images.length];
      });
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, []); 

  return (
    <>
     <MainNav />
      <Container fluid>
       
        <Container className="about-container">
          <Col className="inner-col">
            <Row>
              <Col md={6} className="p-3 image-parent">
                <div className="circle-image-container">
                  <img
                    src={currentImage} 
                    alt="Self"
                    className="circle-image"
                  />
                </div>
              </Col>
              <Col md={6} className="p-3 bullet-parent">
                <h1>
                  Hi, I'm{" "}
                  <span
                    style={{
                      background: info.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {info.firstName}
                  </span>
                  <span className="hand">✋🏾</span>
                </h1>
                <h2>I'm {info.position}.</h2>
                <ul className="no-bullets">
                  {info.miniBio.map((bio, index) => (
                    <EmojiBullet
                      key={index}
                      emoji={bio.emoji}
                      text={bio.text}
                    />
                  ))}
                </ul>

                <div className="socials-container">
                  {info.socials.map((social, index) => (
                    <SocialIcon
                      key={index}
                      link={social.link}
                      icon={social.icon}
                      label={social.label}
                    />
                  ))}
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12} className="p-3">
                <h4>
                  {info.bio.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h4>
              </Col>
            </Row>
          </Col>
        </Container>
      </Container>
    </>
  );
};

export default AboutMePage;
