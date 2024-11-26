import React from "react";
import "./MovieModal.css";

const MovieModal = ({ isOpen, videoUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close-row">
          <button className="modal-close-btn" onClick={onClose}>
            &#10006;
          </button>
        </div>

        <div className="modal-content-inner-row">
          <div className="modal-left">
            <iframe
              title="Movie Trailer"
              width="100%"
              height="100%"
              src={videoUrl}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="modal-right">
            <div className="modal-right-image-div">
                <p>image here </p>
            </div>
            <div className="modal-right-text-div">
              <p>title here </p>
              <p>Credits here  </p>

            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
