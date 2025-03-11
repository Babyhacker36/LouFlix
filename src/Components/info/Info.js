import Thermon from "../../images/Portfolio_Pics/Thermon_portfolio.png";
import WBSD from "../../images/Portfolio_Pics/WBSD_portfolio.png";
import Lum from "../../images/Portfolio_Pics/Lum_portfolio.png";
import Devsavages from "../../images/Portfolio_Pics/DevSavages_portfolio.png";
import Louflix from "../../images/Portfolio_Pics/Louflix_porfolio.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmerica, faMicrochip, faLaptop, faEnvelope  } from "@fortawesome/free-solid-svg-icons";
import { faSquareFacebook, faSquareGithub, faSquareInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export let colors = ["rgb(19, 225, 252)", "rgb(145, 145, 145)"];

export let singlePage = false;

export const info = {
  firstName: "Lou",
  lastName: "Carter",
  initials: "js",
  position: "a Full Stack Developer",
  gradient: `-webkit-linear-gradient(135deg, ${colors})`,
  baseColor: colors[0],
  miniBio: [
    {
      emoji: <FontAwesomeIcon icon={faMicrochip} />,
      text: "Fueled by Artificial Intelligence ",
    },
    {
      emoji: <FontAwesomeIcon icon={faEarthAmerica} />,
      text: "Brooklyn Born, Bronx Raised, USA",
    },
    {
      emoji: <FontAwesomeIcon icon={faLaptop} />,
      text: "React.js, PHP, Wordpress Maniac",
    },
    {
      emoji: <FontAwesomeIcon icon={faEnvelope} />,
      text: "louiscarterjr29@gmail.com",
    },
  ],
  socials: [
    {
      link: "https://www.facebook.com/Lou.Carter.Jr",
      icon: <FontAwesomeIcon icon={faSquareFacebook} size="4x"/>,
      label: "facebook",
    },
    {
      link: "https://www.instagram.com/luis_carter_castro_jr/",
      icon: <FontAwesomeIcon icon={faSquareInstagram} size="4x" />,
      label: "instagram",
    },
    {
      link: "https://github.com/Babyhacker36",
      icon: <FontAwesomeIcon icon={faSquareGithub} size="4x" />,
      label: "github",
    },
    {
      link: "https://www.linkedin.com/in/louiscarterjr",
      icon: <FontAwesomeIcon icon={faLinkedin} size="4x"/>,
      label: "linkedin",
    },
  ],
  bio: '"I\'m a Full-Stack Developer and Air Force veteran with 8+ years of experience, bringing the perfect mix of front-end and back-end wizardry. I build sleek, responsive apps, master industry coding standards, and know my way around web marketing and project management.  \n\n   Like a true Mandalorian, I live by the code of problem-solving taking complex ideas and forging them into seamless user experiences. This is the way!⚡ \n\n  To the developers working on AI—just remember, it’s only a matter of time before the robots figure out how to program better than us. Until then, let’s keep pretending that the code works and that we totally understand the deep neural networks we’re building. Happy coding, and remember: when the aliens come, let’s hope they bring documentation."',






  portfolio: [
    
    {
      title: "DevSavages.ai",
      live: "https://devsavages.ai", 
      source: "", 
      image: Devsavages,
    },
    {
      title: "Thermon",
      live: "https://thermon.com",
      source: "",
      image: Thermon,
    },
    {
      title: "Luminare",
      live: "https://luminare.com",
      source: "",
      image: Lum
    },
    {
      title: "LouFlix",
      live: "https://louiscarterjr.com/louflix",
      source: "",
      image: Louflix
    },
    {
      title: "WBSD",
      live: "https://wbsoutherndrillingtx.com",
      source: "",
      image: WBSD
    },
    
    {
      title: "LouFlix",
      live: "https://louiscarterjr.com/louflix",
      source: "",
      image: WBSD
    },
    {
      title: "WBSD",
      live: "https://wbsoutherndrillingtx.com",
      source: "",
      image: WBSD
    },
    {
      title: "WBSD",
      live: "https://wbsoutherndrillingtx.com",
      source: "",
      image: WBSD
    },
  ],
};
