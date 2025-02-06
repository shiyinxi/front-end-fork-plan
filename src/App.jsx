
import { useState, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Herosection from "./components/Herosection/Herosection";
import Favorite from "./components/Favorite/Favorite";
import PantryModal from "./components/PantryModal/PantryModal";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Element } from "react-scroll";
import ShoppingListModal from "./components/ShoppingListModal/ShoppingListModal";
import MealPlan from "./components/MealPlan/MealPlan";

function App() {
  const [showPantryModal, setShowPantryModal] = useState(false);
  const [showShoppingListModal, setShowShoppingListModal] = useState(false);
  const pantryRef = useRef(null);
  const shoppingListRef = useRef(null);

  const handleOpenPantryModal = () => {
    setShowPantryModal(true);
  };

  const handleClosePantryModal = () => {
    setShowPantryModal(false);
  };

  const handleOpenShoppingListModal = () => {
    setShowShoppingListModal(true);
  };

  const handleCloseShoppingListModal = () => {
    setShowShoppingListModal(false);
  };

  return (
      <div className="App">
        <Navbar
          onOpenPantryModal={handleOpenPantryModal}
          onOpenShoppingListModal={handleOpenShoppingListModal}
        />
        <div className="content"> 
      <Routes>
        <Route path="/" element={<Herosection />} />
        <Route path="/mealplan" element={<MealPlan />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
        {showPantryModal && (
          <PantryModal ref={pantryRef} handleCloseModal={handleClosePantryModal} />
        )}
        {showShoppingListModal && (
          <ShoppingListModal ref={shoppingListRef} handleCloseModal={handleCloseShoppingListModal} />
        )}
  
      </div>
      <Footer />
      </div>
  );
}

export default App;