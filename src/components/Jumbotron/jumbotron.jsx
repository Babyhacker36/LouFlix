import React, { useEffect, useState } from "react";
import "../Jumbotron/jumbo.css";
import JumboVideo from "../../Assets/Videos/Gladiator2.mp4";
import videoLogo from "../../Assets/Images/gladiator2logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

const Jumbotron = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Track video play state
  const [isMuted, setIsMuted] = useState(true); // Track audio mute state

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    setNavbarHeight(navbar ? navbar.offsetHeight : 0);

    const handleResize = () => {
      setNavbarHeight(navbar ? navbar.offsetHeight : 0);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleVideoPlayback = () => {
    const video = document.getElementById("jumbo-video");
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying); // Toggle play state
  };

  const toggleMute = () => {
    const video = document.getElementById("jumbo-video");
    video.muted = !isMuted; // Toggle mute state on video element
    setIsMuted(!isMuted); // Update mute state
  };

  return (
    <div
      className="col-12"
      id="jumbotron"
      style={{ height: `calc(100vh - ${navbarHeight}px)` }}
    >
      <div id="video-info-div">
        <div className="row">
          <div className="col-6">
            <img src={videoLogo} alt="Avatar 2 Logo" id="video-logo" />
          </div>

          <div className="col-6 video-btns-div">
            <div>
              {isPlaying ? (
                <button
                  id="jumboBtn"
                  className="pause-button"
                  onClick={toggleVideoPlayback}
                >
                  <FontAwesomeIcon icon={faPause} />
                </button>
              ) : (
                <button
                  id="jumboBtn"
                  className="play-button"
                  onClick={toggleVideoPlayback}
                >
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              )}

              {/* Show volume buttons */}
              {isMuted ? (
                <button
                  id="audioBtnMute"
                  className="mute-button"
                  onClick={toggleMute}
                >
                  <FontAwesomeIcon icon={faVolumeMute} />
                </button>
              ) : (
                <button
                  id="audioBtn"
                  className="volume-button"
                  onClick={toggleMute}
                >
                  <FontAwesomeIcon icon={faVolumeUp} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div id="textDisplay">
          <p>
          After his home is conquered by the tyrannical emperors who now lead Rome, Lucius is forced to enter the Colosseum and must look to his past to find strength to return the glory of Rome to its people.
          </p>
        </div>
      </div>

      <video autoPlay muted loop id="jumbo-video" className="jumbo-video">
        <source src={JumboVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Jumbotron;
