
import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Herosection from "./Components/Herosection/Herosection";
import Favorite from "./Components/Favorite/Favorite";
import Pantry from "./components/Pantry/Pantry";
import Contactus from "./Components/Contactus/Contactus";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Element } from "react-scroll";
// import Mealmodal from "./Components/Mealmodal/Mealmodal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Herosection />} />
        </Routes>
      </BrowserRouter>

      <Element name="favorites">
        <Favorite />
      </Element>
      
      <Pantry />
      <Contactus />
      <Footer />
    </>
  );
}

export default App;