import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MealPlan.css'; // Add your styles here

const localizer = momentLocalizer(moment);

const MealPlan = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch favorite recipes from localStorage or backend
    const favoriteRecipesData = JSON.parse(localStorage.getItem('favorite')) || [];
    setFavoriteRecipes(favoriteRecipesData);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (destination.droppableId === 'calendar') {
      const recipe = favoriteRecipes[source.index];
      const newEvent = {
        title: recipe.strMeal,
        start: new Date(destination.droppableId),
        end: new Date(destination.droppableId),
        allDay: true,
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="meal-plan">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="favorites-list">
          <h2>Favorite Recipes</h2>
          <Droppable droppableId="favorites">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {favoriteRecipes.map((recipe, index) => (
                  <Draggable key={recipe.idMeal} draggableId={recipe.idMeal} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="favorite-recipe"
                      >
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                        <p>{recipe.strMeal}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="calendar">
          <h2>Meal Plan Calendar</h2>
          <Droppable droppableId="calendar">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                />
                {provided.placeholder}
              </div>
            )}
            </Droppable>
            </div>
            </DragDropContext>
            </div>
            );
            };

            export default MealPlan;