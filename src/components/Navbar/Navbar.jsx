import { Link } from "react-scroll";
import "./Navbar.css";


function Navbar({ onOpenPantryModal, onOpenShoppingListModal , onShowMealPlan }) {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <h1>Fork Plan</h1>
      
        <ul>
          <li>
            <Link to="/" onClick={onShowMealPlan}>Plan</Link>
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
        <button className="add-recipe">Add Recipe</button>
      </div>
    </nav>
  );
}

export default Navbar;