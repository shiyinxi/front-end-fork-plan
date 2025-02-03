import { useEffect, useState } from "react";
import "./Addtofavorite.css";
import PropTypes from "prop-types";

const Addtofavorite = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // const getLocalData = () => {
    
  //   const favorites = JSON.parse(localStorage.getItem("favorite")) || [];

  //   if (!favorites) {
  //     return {
  //       item: null,
  //       favorites,
  //     };
  //   }

  //   const item = favorites.find((item) => item && item.idMeal === recipe.idMeal);

  //   return {
  //     item,
  //     favorites,
  //   };
  // };
  const getLocalData = () => {
    const favoritesData = localStorage.getItem("favorite");
  
    if (favoritesData === null) {
      return {
        item: null,
        favorites: [],
      };
    }
  
    const favorites = JSON.parse(favoritesData) || [];
    const item = favorites.find((item) => item && item.idMeal === recipe.idMeal);
  
    return {
      item,
      favorites,
    };
  };

  const addFavorite = (favorites) => {
    const update = [...favorites, recipe];
    localStorage.setItem("favorite", JSON.stringify(update));
    setIsFavorite(true);
  };

  const removeFavorite = (favorites) => {
    const update = favorites.filter((meal) => {
      return meal.idMeal !== recipe.idMeal;
    });
    localStorage.setItem("favorite", JSON.stringify(update));
    setIsFavorite(false);
  };

  const handleFavorite = () => {
    const { item, favorites } = getLocalData();

    if (item) {
      removeFavorite(favorites);
    } else {
      addFavorite(favorites);
    }
  };

  const clearFavorites = () => {
    localStorage.removeItem("favorite");
    setIsFavorite(false);
  };


  useEffect(() => {
    const { item } = getLocalData();

    if (item) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, []);

  return (
    <>
      <button onClick={handleFavorite} className="favoritebtn">
        {isFavorite ? "remove from favorites" : "add to favorites"}
      </button>
      <button onClick={clearFavorites} className="clearbtn">
        Clear Favorites
      </button>
    </>
  );
};

Addtofavorite.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strIngredient1: PropTypes.string,
    strIngredient2: PropTypes.string,
    strIngredient3: PropTypes.string,
    strIngredient4: PropTypes.string,
    strIngredient5: PropTypes.string,
    

  }).isRequired,
};

export default Addtofavorite;