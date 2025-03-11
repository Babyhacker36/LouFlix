import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const ExTab2 = () => {
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
            Designed and developed responsive web and mobile applications using Visual Studio, HTML5, CSS3, SCSS, Bootstrap, JavaScript/TypeScript frameworks (React.js, React Native, jQuery). Proficient in GraphQL, PHP, and MySQL for dynamic and high-performance user experiences.
            </li>
            <li>
            Backend developer, database management, and server environments, including MySQL, SQL, IIS, and Microsoft Azure (CRM), with expertise in client-side form integration, validation, and API usage (Web API, REST API, JSON, Azure CRM systems).
            </li>
            <li>
            Collaborated effectively with marketing and development teams, utilizing tools such as GitHub, Jira, and Microsoft Azure Boards for code reviews and project management, while leveraging Photoshop, GIMP, Figma, and Webflow for intuitive UX/UI design and wireframing, leading the development of key product features from concept to deployment.
            </li>
           
          </ul>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ExTab2;
