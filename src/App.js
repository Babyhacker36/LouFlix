import React, { useEffect } from "react";
import Navigation from "./components/Navigation/navigation.jsx";
import Jumbotron from "./components/HomePage/Jumbotron/jumbotron.jsx";
import InTheatersMovieSlider from "./components/HomePage/SectionContainers/InTheatersMovieSlider.jsx";
import UpcomingMoviesSlider from "./components/HomePage/SectionContainers/UpcomingMovieslider.jsx";
import TopRatedTvShowsSlider from "./components/HomePage/SectionContainers/TopRatedTvShowsSlider.jsx";

function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <div className="app">
        <div className="container-fluid">
          <Navigation />
        </div>
        <main className="p-0 container-fluid main-area">
          <Jumbotron />
          <UpcomingMoviesSlider />
          <InTheatersMovieSlider />
          <TopRatedTvShowsSlider id="top" />
        </main>
      </div>
    </>
  );
}

export default App;
