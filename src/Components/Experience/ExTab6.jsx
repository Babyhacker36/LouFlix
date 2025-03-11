import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const ExTab6 = () => {
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
              Conducted maintenance and repair on a wide range of aircraft
              armament systems, including missile launchers, bomb racks, and
              electronic countermeasures systems on the F-117 Stealth bombers
              and F-16 aircraft.
            </li>
            <li>
              Conducted thorough inspections and repairs on aircraft release,
              launch, suspension navigation systems, and aircraft munitions.
            </li>
            <li>
              Analyzed malfunctions and executed effective routine
              troubleshooting on launch and suspension systems.
            </li>
            <li>
              Demonstrated proficiency in performing routine network
              configuration procedures, shutting down GPS aircraft systems, and
              configuring and testing computer software to diagnose problems.
            </li>
            <li>
              Contributed to the test and evaluation of electronic circuitry,
              ensuring continuity, voltage, and proper operation of prototype
              aircraft weapons systems.
            </li>
            <li>
              Managed inventory of armament system components, ensuring timely
              ordering of spare parts and supplies to support maintenance
              activities.
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ExTab6;
