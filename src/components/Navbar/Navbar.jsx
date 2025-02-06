// import { Link } from "react-scroll";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import React from "react";


function Navbar({ onOpenPantryModal, onOpenShoppingListModal }) {

  const navigate = useNavigate();

  const handleAddRecipeClick = () => {
    navigate("/");
  };
  
  return (
    <nav className="navbar">
      <div className="nav-content">
        <h1>Fork Plan</h1>
      
        <ul>
          <li>
            <Link to="/mealplan">Plan</Link>
          </li>
          <li>
            <Link to="/" onClick={onOpenPantryModal}>Pantry</Link>
          </li>
          <li>
            <Link to="/" onClick={onOpenShoppingListModal}>Shopping List</Link>
          </li>
          <li>
            <Link to="favorites" smooth={true} duration={500}>
              Favorites
            </Link>
          </li>
        </ul>
        <button className="add-recipe" onClick={handleAddRecipeClick}>Add Recipe</button>
      </div>
    </nav>
  );
}

export default Navbar;