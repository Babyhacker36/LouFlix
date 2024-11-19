import React, { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/navigation.jsx";
import Jumbotron from "./components/Jumbotron/jumbotron.jsx";
import LatestMoviesSection from './components/MoviesContainer/LatestMoviesSection.jsx';

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
        <LatestMoviesSection />
      </main>
    </>
  );
}

export default App;
