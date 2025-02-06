import { useState, useEffect, useRef } from "react";
import "./Favorite.css";
import Mealmodal from "../Mealmodal/Mealmodal";

function Favorite() {
  const [favoriteMeals, setIsFavoriteMeals] = useState([]);
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState(null);
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
   setSelectedRecipeDetail(recipe);
    if (modalRef.current) {
      modalRef.current.style.display = "block";
    }
  };

  const handleCloseDetailModal = () => {
    setSelectedRecipeDetail(null);
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

      {selectedRecipeDetail && (
        <Mealmodal 
          ref={modalRef} 
          recipe={selectedRecipeDetail} 
          handleCloseDetailModal={handleCloseDetailModal} 
        />
      )}
    </div>
  );
}

export default Favorite;