import "./App.css";
import Navigation from "./components/Navigation/navigation"; // Import your Navbar component
import Jumbotron from "./components/Jumbotron/jumbotron";
import TestMovies from './components/TestMovies';

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
      <TestMovies />
      </div>
    </>
  );
}

export default App;
