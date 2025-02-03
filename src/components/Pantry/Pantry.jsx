import "./Pantry.css"
import { useState, useEffect } from "react";
import axios from "axios";

const kbaseURL = 'http://localhost:8000/';

const Pantry = () => {
  
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${kbaseURL}/inventory`); 
        console.log('response', response);
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients', error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <div className="section" id="pantry">
      <h4>Pantry</h4>
      <div className="ingredients-area">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="ingredient-item">
            <figure className="ingredient-figure">
              <img
                className="ingredient-figure-img"
                src={ingredient.image} // Adjust according to your data structure
                alt={ingredient.name}
              />
              <figcaption>{ingredient.name}</figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pantry;