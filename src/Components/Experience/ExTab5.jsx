import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const ExTab5 = () => {
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
          <ul>
            <li>
              Developed and taught engaging, interactive curriculum in a variety
              of social sciences subjects, including Sociology, Psychology, U.S.
              History, World History and Law and Government.
            </li>
            <li>
              Assisted students in developing research and writing skills,
              guiding them through independent research projects and essays.
            </li>

            <li>
              Implemented hands-on, experiential learning activities to bring
              social sciences concepts to life for students. Provided
              individualized support and feedback to students, helping them
              achieve their full potential and overcome academic challenges.
            </li>
            <li>
              Collaborated with other teachers and school administrators to
              integrate technology and multimedia resources into social sciences
              instruction.
            </li>
            <li>
              Maintained accurate files and grades through software to
              effectively communicate student progress to parents.
            </li>
            <li>
              Trained in State IEP requirements and documentation and evaluating
              student needs based on learning disabilities.
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ExTab5;
