import React from "react";
import { Row} from "react-bootstrap";
import SpeechDivNav from "./SpeechDivNav";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomeNav = () => {
  const navbarItems = [
    { id: 1, text: "AboutMe", link: "/AboutMe" },
    { id: 2, text: "Portfolio", link: "/Portfolio" },
    { id: 3, text: "Career", link: "/Career" },
    { id: 4, text: "Contact", link: "/Contact" },
  ];
  return (
    <>
      <Row className="homeNav">
        <motion.div
          lg={6}
          className="nameheader col-lg-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          <span>Louis Carter Jr</span>
        </motion.div>
        {navbarItems.map((item, index) => (
          <motion.div
            key={item.id}
            lg={1}
            className="navCol col-lg-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: (index + 1) * 0.2 }}
          >
            <span id={item.id}>
              <Link to={item.link}>{item.text}</Link>
            </span>
          </motion.div>
        ))}
      </Row>
      <SpeechDivNav />
    </>
  );
};

export default HomeNav;
