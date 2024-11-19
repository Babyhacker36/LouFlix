import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import logo from '../../Assets/Images/louflix.png';
import '../Navigation/nav.css'; // Custom CSS

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo Section */}
        <div className="col-1">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="Logo"
              className="navbar-logo" // Added custom class
            />
          </a>
        </div>

        {/* Hamburger Menu (for mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={menuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center Navigation */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
          <div className="col-12 d-flex ">
            <ul className="navbar-nav d-flex" style={{ gap: "10px" }}>
              <li className="nav-item">
                <a className="nav-link" href="#NP">
                  TRAILERS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#PM">
                 IN THEATERS 
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#PM">
                  NOW STREAMING 
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#TRM">
                  CALENDER
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#TM">
                  EVENTS 
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#UP">
                  LOU PICKS 
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Search Section */}
        <div className="col-3 d-none d-lg-block">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-danger" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
