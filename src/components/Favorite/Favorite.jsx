import { useState, useEffect, useRef } from "react";
import "./Favorite.css";
import Mealmodal from "../Mealmodal/Mealmodal";

function Favorite() {
  const [favoriteMeals, setIsFavoriteMeals] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const modalRef = useRef(null);

  const loadData = () => {
   const favoriteMeal = JSON.parse(localStorage.getItem("favorite")) || [];
   console.log(localStorage.getItem("favorite"));
  setIsFavoriteMeals(favoriteMeal);
};

  useEffect(() => {
   loadData();
 }, []);

  const handleVeiwMealDetail = (recipe) => {
   setSelectedRecipe(recipe);
    if (modalRef.current) {
      modalRef.current.style.display = "block";
    }
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    if (modalRef.current) {
      modalRef.current.style.display = "none";
    }
  };

  return (
    <div className="favorites" id="favorites" style={{ display: favoriteMeals.length === 0 ? 'none' : 'block' }}>
      <h4>Favorites</h4>
      <div className="mealArea">
        {favoriteMeals.map((recipe) => (
          <div key={recipe.idMeal} className="favorite">
            <div className="mealtitle"><h4>{recipe.strMeal}</h4></div>
            <img src={recipe.strMealThumb} alt={recipe.strMealThumb} />
            <button onClick={() => handleVeiwMealDetail(recipe)} className="viewdetalsbtn">
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <Mealmodal 
          ref={modalRef} 
          recipe={selectedRecipe} 
          handleCloseModal={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default Favorite;