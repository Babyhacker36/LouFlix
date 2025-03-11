import { Container, Row, Col } from "react-bootstrap";
import MainNav from "../MainSiteNav/MainNav";
import { SocialIcon } from "react-social-icons";
import "../Contact/Contact.css";

const Contact = () => {
  const socialNetworks = [
    { url: "https://www.facebook.com/Lou.Carter.Jr/", network: "facebook" },
    { url: "https://github.com/Babyhacker36", network: "github" },
    { url: "https://www.linkedin.com/in/louiscarterjr/", network: "linkedin" },
    { url: "https://www.instagram.com/louiscarterjr36/", network: "instagram" },
  ];

  return (
    <>
      <MainNav />

      <Container fluid className="contactBody">
        <Row className="ContactRow">
          <Col xs={12} className="contactHeader">
            <h1 className="glow">CONTACT ME</h1>
          </Col>

          <Col xs={12} className="social-col-parent">
            <div className="socialMediaCol">
              {socialNetworks.map((network, index) => (
                <SocialIcon
                  key={index}
                  url={network.url}
                  network={network.network}
                  bgColor="transparent"
                  fgColor="#fff"
                  className="social-icons"
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
