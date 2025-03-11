import React from "react";
import { motion } from "framer-motion";
import { Col, ProgressBar, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const SkillsSubSection = () => {
  const [progressOne, setProgressOne] = useState(0);
  const [progressTwo, setProgressTwo] = useState(0);
  const [progressThree, setProgressThree] = useState(0);
  const [progressFour, setProgressFour] = useState(0);
  const [progressFive, setProgressFive] = useState(0);
  const [progressSix, setProgressSix] = useState(0);
  const [progressSeven, setProgressSeven] = useState(0);
  const [progressEight, setProgressEight] = useState(0);
  const [progressNine, setProgressNine] = useState(0);
  const [progressTen, setProgressTen] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [force, setForce] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timeoutOne = setTimeout(() => {
        setProgressOne(80);
      }, 50);
      const timeoutTwo = setTimeout(() => {
        setProgressTwo(90);
      }, 100);
      const timeoutThree = setTimeout(() => {
        setProgressThree(85);
      }, 150);
      const timeoutFour = setTimeout(() => {
        setProgressFour(100);
      }, 200);
      const timeoutFive = setTimeout(() => {
        setProgressFive(100);
      }, 250);
      const timeoutSix = setTimeout(() => {
        setProgressSix(85);
      }, 300);
      const timeoutSeven = setTimeout(() => {
        setProgressSeven(75);
      }, 350);
      const timeoutEight = setTimeout(() => {
        setProgressEight(70);
      }, 400);
      const timeoutNine = setTimeout(() => {
        setProgressNine(80);
      }, 450);
      const timeoutTen = setTimeout(() => {
        setProgressTen(85);
      }, 500);

      return () => {
        clearTimeout(timeoutOne);
        clearTimeout(timeoutTwo);
        clearTimeout(timeoutThree);
        clearTimeout(timeoutFour);
        clearTimeout(timeoutFive);
        clearTimeout(timeoutSix);
        clearTimeout(timeoutSeven);
        clearTimeout(timeoutEight);
        clearTimeout(timeoutNine);
        clearTimeout(timeoutTen);
        setIsReset(true);
      };
    }
  }, [isRunning]);

  const handleClick = () => {
    if (isReset) {
      setProgressOne(0);
      setProgressTwo(0);
      setProgressThree(0);
      setProgressFour(0);
      setProgressFive(0);
      setProgressSix(0);
      setProgressSeven(0);
      setProgressEight(0);
      setProgressNine(0);
      setProgressTen(0);
      setIsRunning(false);
      setIsReset(false);
    } else {
      setIsRunning(true);
    }
    console.log("When is this true");
    setForce(true);
  };

  return (
    <>
      <motion.div className="row exRow justify-content-center exBackletterS">
        <Col sm={10} xl={6} className="exSoloColSkills">
          <div>
            <div className="row">
              <div className="col headerCol">
                <Button
                  onClick={() => {
                    handleClick();
                  }}
                >
                  {force ? " My Force is Strong!" : " Feel The Force!"}
                </Button>
              </div>
            </div>
            <div class="progressbardiv">
              <div class="row">
                <div class="col progressRightDiv">
                  <ProgressBar
                    now={progressOne}
                    label={`React: ${progressOne}%`}
                  />
                </div>
              </div>
            </div>

            <div class="progressbardiv">
              <div class="row">
                <div class="col progressRightDiv">
                  <ProgressBar
                    now={progressTwo}
                    label={`Javascript: ${progressTwo}%`}
                  />
                </div>
              </div>
            </div>

            <div class="progressbardiv">
              <div class="row">
                <div class="col progressRightDiv">
                  <ProgressBar
                    now={progressThree}
                    label={`Jquery: ${progressThree}%`}
                  />
                </div>
              </div>
            </div>

            <div class="progressbardiv">
              <div class="row">
                <div class="col progressRightDiv">
                  <ProgressBar
                    now={progressFour}
                    label={`HTML: ${progressFour}%`}
                  />
                </div>
              </div>
            </div>

            <div class="progressbardiv">
              <div class="row">
                <div class="col progressRightDiv">
                  <ProgressBar
                    now={progressFive}
                    label={`CSS: ${progressFive}%`}
                  />
                </div>
              </div>
            </div>

            <div class="progressbardiv">
              <div class="row">
                <div class="col progressRightDiv">
                  <ProgressBar
                    now={progressSix}
                    label={`WordPress: ${progressSix}%`}
                  />
                </div>
              </div>
            </div>

            <div class="progressbardiv">
              <div class="row">
                <div class="col progressRightDiv">
                  <ProgressBar
                    now={progressSeven}
                    label={`PHP: ${progressSeven}%`}
                  />
                </div>
              </div>
            </div>

            <div class="progressbardiv">
              <div class="row">
                <div class="col progressRightDiv">
                  <ProgressBar
                    now={progressEight}
                    label={`MySql: ${progressEight}%`}
                  />
                </div>
              </div>
            </div>

            <div class="progressbardiv">
              <div class="row">
                <div class="col progressRightDiv">
                  <ProgressBar
                    now={progressNine}
                    label={`Node.JS: ${progressNine}%`}
                  />
                </div>
              </div>
            </div>

            <div class="progressbardiv">
              <div class="row">
                <div class="col progressRightDiv">
                  <ProgressBar
                    now={progressTen}
                    label={`PhotoShop / Figma: ${progressTen}%`}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </motion.div>
    </>
  );
};

export default SkillsSubSection;
