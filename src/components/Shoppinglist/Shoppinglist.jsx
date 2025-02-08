import './Shoppinglist.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const kbaseURL = 'http://localhost:8000';

const Shoppinglist = () => {
    const [shoppinglistItems, setShoppinglistItems] = useState([]);

    useEffect(() => {
        const fetchInventory = async () => {
          try {
            const response = await axios.get(`${kbaseURL}/shoppinglist/`); 
            console.log('response', response);
            setShoppinglistItems(response.data);
          } catch (error) {
            console.error('Error fetching ingredients', error);
          }
        };
    
        fetchInventory();
      }, []);

    const handleBought = (itemId) => {
      console.log('itemId', itemId);
      return axios.put(`${kbaseURL}/shoppinglist/inventory/${itemId}/`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error('Error handle bought', error);
    });
    };
  
    const handleRemove = (itemId) => {
      return axios.delete(`${kbaseURL}/shoppinglist/delete/${itemId}/`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error('Error handle remove', error);
    });
    };

    const handleIncrement = (itemId) => {
      setShoppinglistItems(shoppinglistItems.map(item => 
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    };
  
    const handleDecrement = (itemId) => {
      setShoppinglistItems(shoppinglistItems.map(item => 
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ));
    };

    return (
        <div className="shoppinglist">
            <header className="shoppinglist-header">
                <h1>Shopping List</h1>
                <span>{shoppinglistItems.length} items</span>
            </header>
        <div className="shoppinglist-content">
            <div className="shoppinglist-items">
            {shoppinglistItems.map((item, index) => (
            <div key={index} className="shoppinglist-item">
              <img 
                // src={`https://img.spoonacular.com/ingredients_250x250/${item.ingredient.image}`}
                src={item.ingredient.image}
                alt={item.ingredient} 
                className="shoppinglist-item-image" />
              <div className="shoppinglist-item-info">
                <h2>{item.ingredient.name}</h2>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item.id)} className="quantity-btn"> - </button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)} className="quantity-btn"> + </button>
                </div>
              </div>
            
             <div className="shoppinglist-item-actions">
                <button onClick={() => handleBought(item.id)} className="bought-btn">
                  Bought
                </button>
                <button onClick={() => handleRemove(item.id)} className="remove-btn">
                  Remove
                </button>
              </div> 
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Shoppinglist;