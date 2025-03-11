import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Components/Home/HomePage";
import DesignsPage from "./Components/Designs/DesignsPage";
import ExperiencePage from "./Components/Experience/ExperiencePage";
import ContactPage from "./Components/Contact/ContactPage";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";

import AboutMePage from "./Components/Aboutme/AboutMePage";

function App() {
  return (
    <Container fluid className="mainContainer">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AboutMe" element={<AboutMePage />} />
        <Route path="/Portfolio" element={<DesignsPage />} />
        <Route path="/Career" element={<ExperiencePage />} />
        <Route path="/Contact" element={<ContactPage />} />
      </Routes>
    </Container>
  );
}

export default App;
