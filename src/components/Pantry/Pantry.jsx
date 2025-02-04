import "./Pantry.css"
import { useState, useEffect } from "react";
import axios from "axios";

const kbaseURL = 'http://localhost:8000/';

const Pantry = () => {
  
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${kbaseURL}/inventory/`); 
        console.log('response', response);
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients', error);
      }
    };

    fetchIngredients();
  }, []);

  return (

      <div className="inventory">
        <header className="inventory-header">
          <h1>Pantry</h1>
          <span>Fresh — Febuary 2025</span>
        </header>
        <div className="ingredient-list">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-card">
              <img 
                src={`https://img.spoonacular.com/ingredients_250x250/${ingredient.ingredient.image}`}
                alt={ingredient.ingredient.name} 
                className="ingredient-image" 
              />
              <div className="ingredient-info">
                <h2>{ingredient.ingredient.name}</h2>
                <p className="ingredient-quantity">{ingredient.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>



  );
};

export default Pantry;