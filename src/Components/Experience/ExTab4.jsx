import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const ExTab4 = () => {
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
              Developed and delivered engaging curriculum for high school
              students, introducing them to the basics of web development.
            </li>
            <li>
              Responsible for the implementation of curriculum courses to
              include programming languages and markup such as HTML5, CSS,
              Bootstrap,and Javascript.
            </li>

            <li>
              Taught students a range of coding languages and technologies,
              including, JavaScript, HTML, CSS, Mysql and MongoDB.
            </li>
            <li>
              Led students through a series of challenging coding projects,
              encouraging them to think critically, solve problems, and develop
              their coding skills.
            </li>

            <li>
              Worked with the educational staff to create and implement a
              robotics course using the Brain.JS framework.
            </li>

            <li>
              Stayed up-to-date with the latest coding best practices and
              trends, seeking ways to continually improve and enhance the coding
              camp experience.
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ExTab4;
