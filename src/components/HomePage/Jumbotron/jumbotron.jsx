import React, { useEffect, useState, useRef } from "react";
import "./jumbo.css";
import JumboVideo from "../../../Assets/Videos/Gladiator2.mp4";
import videoLogo from "../../../Assets/Images/gladiator2logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

const Jumbotron = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const handleResize = () => {
      setNavbarHeight(navbar ? navbar.offsetHeight : 0);
    };

    setNavbarHeight(navbar ? navbar.offsetHeight : 0);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleVideoPlayback = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
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
            <img src={videoLogo} alt="Gladiator 2 Logo" id="video-logo" />
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
            After his home is conquered by the tyrannical emperors who now lead
            Rome, Lucius is forced to enter the Colosseum and must look to his
            past to find strength to return the glory of Rome to its people.
          </p>
        </div>
      </div>

      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline // Prevents fullscreen on mobile devices
        id="jumbo-video"
        className="jumbo-video"
        tabIndex="-1" // Prevents auto-focus on video
      >
        <source src={JumboVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default React.memo(Jumbotron);
