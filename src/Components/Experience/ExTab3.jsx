import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const ExTab3 = () => {
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
            Lead Full Stack UI Development projects in Microsoft .NET Core and .NET Full Frameworks, along with Microsoft Azure, CRM integration. 
            </li>
            <li>
              Designed and executed A/B tests on various elements of web pages,
              including headlines, images, call-to-action buttons, and forms.
            </li>
            <li>
            Front-End and Back-End Development, utilizing React, React-Redux, JavaScript/TypeScript, HTML, and CSS, while designing impactful, user-centered landing pages using tools like Sketch, Figma, Adobe XD, and Photoshop.
            </li>
            <li>
            •Proven Experience in CMS Management, including Kentico, Red Dot, and OpenText, combined with strong knowledge of SQL, MongoDB, and RESTful APIs, ensuring efficient data handling, version control using Git, and successful integration of SaaS applications.
            </li>
            <li>
              
              Tested and validated code to ensure responsive design through:
              Developing and executing test routines and schedules.
            </li>
          
        
          </ul>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ExTab3;
