
import { useState, useRef } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Herosection from "./Components/Herosection/Herosection";
import Favorite from "./Components/Favorite/Favorite";
import PantryModal from "./components/PantryModal/PantryModal";
import Contactus from "./components/Contactus/Contactus";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Element } from "react-scroll";
import ShoppingListModal from "./components/ShoppingListModal/ShoppingListModal";
import MealPlan from "./components/MealPlan/MealPlan";
// import Mealmodal from "./Components/Mealmodal/Mealmodal";

function App() {
  const [showPantryModal, setShowPantryModal] = useState(false);
  const [showShoppingListModal, setShowShoppingListModal] = useState(false);
  const [showMealPlan, setShowMealPlan] = useState(false);
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

  const handleShowMealPlan = () => {
    setShowMealPlan(true);
    setShowPantryModal(false);
    setShowShoppingListModal(false);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Herosection />} />

        </Routes>
      </BrowserRouter>
      <div className="App">
        <Navbar
          onOpenPantryModal={handleOpenPantryModal}
          onOpenShoppingListModal={handleOpenShoppingListModal}
          onShowMealPlan={handleShowMealPlan}
        />
        {showMealPlan && <MealPlan />}
        {showPantryModal && (
          <PantryModal ref={pantryRef} handleCloseModal={handleClosePantryModal} />
        )}
        {showShoppingListModal && (
          <ShoppingListModal ref={shoppingListRef} handleCloseModal={handleCloseShoppingListModal} />
        )}
      </div>

      <Element name="favorites">
        <Favorite />
      </Element>
      
      {/* <Element name="pantry">
        <Pantry />
      </Element>

      <Element name="shoppinglist">
        <Shoppinglist />
      </Element> */}
      
      {/* <Contactus /> */}
      <Footer />
    </>
  );
}

export default App;