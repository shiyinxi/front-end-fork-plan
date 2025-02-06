import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MealPlan.css'; 

const localizer = momentLocalizer(moment);

const MealPlan = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const favoriteRecipesData = JSON.parse(localStorage.getItem('favorite')) || [];
    setFavoriteRecipes(favoriteRecipesData);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    
      if (source.droppableId !== destination.droppableId) {
        const updatedEvents = [...events];
        const movedEvent = updatedEvents.find((e) => e.id === source.draggableId);
        movedEvent.start = moment(destination.droppableId).toDate();
        movedEvent.end = moment(destination.droppableId).add(1, "hour").toDate();

      setEvents(updatedEvents);
    }
  };

  const renderEvent = ({ event }) => (
    <span>
      <strong>{event.title}</strong>
    </span>
  );

  const CustomDayCell = ({ date, children }) => {
    const droppableId = `calendar-${moment(date).format("YYYY-MM-DD")}`;

    return (
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="calendar-day">
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  return (
    <div className="meal-plan">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="favorites-list">
          <h2>Favorite Recipes</h2>
           {favoriteRecipes.map((recipe, index) => (
            <Droppable droppableId={recipe.idMeal.toString()} key={recipe.idMeal}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
               
                  <Draggable key={recipe.idMeal} draggableId={recipe.idMeal.toString()} index={index}>
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
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
        </div>
        
        <div className="calendar">
          <h2>Meal Plan Calendar</h2>
         
              <div className="calendar-container">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                  components={{
                    event: renderEvent,
                    dateCellWrapper: CustomDayCell,
                  }}
                />
    
              </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default MealPlan;