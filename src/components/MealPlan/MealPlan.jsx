import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './MealPlan.css'; 

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const MealPlan = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [events, setEvents] = useState([]);
  const [draggedRecipe, setDraggedRecipe] = useState(null);

  useEffect(() => {
    const favoriteRecipesData = JSON.parse(localStorage.getItem('favorite')) || [];
    setFavoriteRecipes(favoriteRecipesData);
  }, []);

  const onEventResize = (data) => {
    const { start, end } = data;

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === data.event.id ? { ...event, start, end } : event
      )
    );
  };

  const onEventDrop = (data) => {
    const { start, end, event } = data;

    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === event.id ? { ...evt, start, end } : evt
      )
    );
  };

  const handleDragStart = (recipe) => {
    setDraggedRecipe(recipe);
  };

  const handleDropFromOutside = ({ start, end }) => {
    if (draggedRecipe) {
      const newEvent = {
        id: draggedRecipe.idMeal,
        title: draggedRecipe.strMeal,
        start,
        end,
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setDraggedRecipe(null);
    }
  };

  const renderEvent = ({ event }) => (
    <span>
      <strong>{event.title}</strong>
    </span>
  );

  return (
    <div className="meal-plan">
      <div className="favorites-list">
        <h2>Favorite Recipes</h2>
        {favoriteRecipes.map((recipe, index) => (
          <div
            key={recipe.idMeal}
            className="favorite-recipe"
            draggable
            onDragStart={() => handleDragStart(recipe)}
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>{recipe.strMeal}</p>
          </div>
        ))}
      </div>

   <div className="calendar">
        <h2>Meal Plan Calendar</h2>
        <div className="calendar-container">
          <DnDCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            resizable
            components={{
              event: renderEvent,
            }}
            onDropFromOutside={handleDropFromOutside}
            draggableAccessor={() => true}
          />
        </div>
      </div>
    </div>
  );
};

export default MealPlan;    