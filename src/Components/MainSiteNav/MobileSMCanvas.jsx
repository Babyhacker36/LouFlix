import React from "react";
import { SocialIcon } from "react-social-icons";

const MobileSMCanvas = () => {
  const socialNetworksNav = [
    { url: "https://www.facebook.com/Lou.Carter.Jr/", network: "facebook" },
    { url: "https://github.com/Babyhacker36", network: "github" },
    { url: "https://www.linkedin.com/in/louiscarterjr/", network: "linkedin" },
    { url: "https://www.instagram.com/louiscarterjr36/", network: "instagram" },
  ];
  return (
    <div className="socialMediaColNav">
      {socialNetworksNav.map((network, index) => (
        <SocialIcon
          key={index}
          url={network.url}
          network={network.network}
          bgColor="transparent"
          fgColor="#fff"
          className="smIconsMobile"
        />
      ))}
    </div>
  );
};

export default MobileSMCanvas;
