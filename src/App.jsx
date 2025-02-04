
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
import Shoppinglist from "./components/Shoppinglist/Shoppinglist";
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
      
      <Element name="pantry">
        <Pantry />
      </Element>

      <Element name="Shoppinglist">
        <Shoppinglist />
      </Element>
      
      <Contactus />
      <Footer />
    </>
  );
}

export default App;