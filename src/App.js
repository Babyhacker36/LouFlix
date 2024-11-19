import "./App.css";
import Navigation from "./components/Navigation/navigation.jsx"; // Import your Navbar component
import Jumbotron from "./components/Jumbotron/jumbotron.jsx";
import LatestMoviesSection from './components/MoviesContainer/LatestMoviesSection.jsx';

function App() {
  return (
    <>
      <div className="App container-fluid">
        <Navigation />
      </div>
      <div className="p-0 container-fluid">
        <Jumbotron />
      </div>
      <div className="container-fluid">
      <LatestMoviesSection />
      </div>
    </>
  );
}

export default App;
