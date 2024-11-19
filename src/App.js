import "./App.css";
import Navigation from "./components/Navigation/navigation"; // Import your Navbar component
import Jumbotron from "./components/Jumbotron/jumbotron";

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
      
      </div>
    </>
  );
}

export default App;
