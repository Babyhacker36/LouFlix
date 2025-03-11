import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import LouPortImg from "../../images/ExPagePics/portLou.jpg";
import Resume from "../../images/Louis_carter_jr_resume.pdf";
const ExTab1 = () => {
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

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="exInnerDivRight"
          variants={variants}
          key="introDiv"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
        >
          <p>
            As a Full-Stack Web Developer and Airforce veteran, I possess
            expertise in both front-end and back-end programming languages,
            responsive frameworks, and industry coding practices. With over 8
            years of experience in web and mobile development, programming, web
            marketing, and project management, I am continuously expanding my
            skill set.
          </p>
          <img src={LouPortImg} className="louPort" alt="louiscarterjr" />
          <a href={Resume} target="_blank" rel="noreferrer">
            View My Resume
          </a>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ExTab1;
