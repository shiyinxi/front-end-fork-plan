import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./Mealmodal.css";
import Addtofavorite from "../Addtofavorite/Addtofavorite";
import axios from 'axios';

const kbaseURL = 'http://localhost:8000/';

const Mealmodal = forwardRef((props, ref) => { 

  const { recipe, handleCloseModal } = props;
  console.log('recipe', recipe);

  if (!recipe) return null;
  const ingredients = [];
  const measure = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (recipe[ingredientKey]) {
      ingredients.push(recipe[ingredientKey]);
      measure.push(recipe[measureKey]);
    }
  }
  const instructions = recipe.strInstructions.split("\n");
  
  const handleAddToShoppingList = async () => {
    try {
   
      const ingredientsData = [];
      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        if (recipe[ingredientKey]) {
          ingredientsData.push({
            ingredient: recipe[ingredientKey],
            amount: recipe[measureKey] || '',
          });
        }
      }
      console.log('ingredientsData', ingredientsData);
      const response = await axios.post(`${kbaseURL}/recipes/shoppinglist/${recipe.idMeal}`, {
        ingredients: ingredientsData,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response', response);

      if (response.status === 200) {
        alert('Ingredients added to shopping list');
      } else {
        alert('Failed to add ingredients to shopping list');
      }
    } catch (error) {
      console.error('Error adding ingredients to shopping list:', error);
      alert('An error occurred while adding ingredients to shopping list');
    }
  };

  return (
      <div id="mealModal" className="modal" ref={ref}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>

        <h1 className="mealName">{recipe.strMeal}</h1>
        <div className="imgingredientsme">
          <img
            className="meal-image"
            src={recipe.strMealThumb}
            alt={recipe.strMealThumb}
          />
        </div>
          <div className="ingredientsmeasurement">
            <div className="ingredients">
              <h2>Ingredients and Measure</h2>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient} - {measure[index]}
                  </li>
                ))}
              </ul>
              <button onClick={handleAddToShoppingList} className="add-to-shopping-list-btn">
              Add to Shopping List
            </button>
            </div>
          </div>
          
        <div className="mealInstructions">
          <ol>
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        <Addtofavorite recipe={recipe} /> 
        </div>
      </div>
  );
});
Mealmodal.displayName = "Mealmodal";

Mealmodal.propTypes = {
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strIngredient1: PropTypes.string,
    strIngredient2: PropTypes.string,
    strIngredient3: PropTypes.string,
    strIngredient4: PropTypes.string,
    strIngredient5: PropTypes.string,
    strIngredient6: PropTypes.string,
    strIngredient7: PropTypes.string,
    strIngredient8: PropTypes.string,
    strIngredient9: PropTypes.string,
    strIngredient10: PropTypes.string,
    strIngredient11: PropTypes.string,
    strIngredient12: PropTypes.string,
    strIngredient13: PropTypes.string,
    strIngredient14: PropTypes.string,
    strIngredient15: PropTypes.string,
    strIngredient16: PropTypes.string,
    strIngredient17: PropTypes.string,
    strIngredient18: PropTypes.string,
    strIngredient19: PropTypes.string,
    strIngredient20: PropTypes.string,
    strMeasure1: PropTypes.string,
    strMeasure2: PropTypes.string,
    strMeasure3: PropTypes.string,
    strMeasure4: PropTypes.string,
    strMeasure5: PropTypes.string,
    strMeasure6: PropTypes.string,
    strMeasure7: PropTypes.string,
    strMeasure8: PropTypes.string,
    strMeasure9: PropTypes.string,
    strMeasure10: PropTypes.string,
    strMeasure11: PropTypes.string,
    strMeasure12: PropTypes.string,
    strMeasure13: PropTypes.string,
    strMeasure14: PropTypes.string,
    strMeasure15: PropTypes.string,
    strMeasure16: PropTypes.string,
    strMeasure17: PropTypes.string,
    strMeasure18: PropTypes.string,
    strMeasure19: PropTypes.string,
    strMeasure20: PropTypes.string,
  }),
  handleCloseModal: PropTypes.func.isRequired,
};

export default Mealmodal;