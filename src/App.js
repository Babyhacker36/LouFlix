import React, { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/navigation.jsx";
import Jumbotron from "./components/HomePage/Jumbotron/jumbotron.jsx";
// import LatestMoviesSection from './components/HomePage/SectionContainers/LatestMoviesSection.jsx';
import InTheatersMovieSlider from './components/HomePage/SectionContainers/InTheatersMovieSlider.jsx';
import UpcomingMoviesSlider from "./components/HomePage/SectionContainers/UpcomingMovieslider.jsx";
function App() {
  useEffect(() => {
    // Disable automatic scroll restoration
    window.history.scrollRestoration = "manual";
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <div className="App container-fluid">
        <Navigation />
      </div>
      <main className="p-0 container-fluid">
        <Jumbotron />
        <UpcomingMoviesSlider/>
        <InTheatersMovieSlider/>
     
        {/* <LatestMoviesSection /> */}
        
      </main>
    </>
  );
}

export default App;
