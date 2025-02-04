import './Shoppinglist.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const kbaseURL = 'http://localhost:8000/';

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

    return (
        <div className="shoppinglist">
            <header className="shoppinglist-header">
                <h1>Shopping List</h1>
                <span>3 items</span>
            </header>
        <div className="shoppinglist-content">
            <div className="shoppinglist-items">
            {shoppinglistItems.map((item, index) => (
            <div key={index} className="shoppinglist-item">
              <img 
                src={`https://img.spoonacular.com/ingredients_250x250/${item.ingredient.image}`}
                alt={item.ingredient} 
                className="shoppinglist-item-image" />
              <div className="shoppinglist-item-info">
                <h2>{item.ingredient.name}</h2>
                <p className="shoppinglist-item-price">{item.price} / {item.weight}</p>
              </div>
              <div className="shoppinglist-item-total">
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>Order summary</h2>
          <p>Subtotal: $27.74</p>
          <p>Shipping: $2.99</p>
          <p>Tax: $2.00</p>
          <p>Total: $32.73</p>
          <button className="payment-button">Continue to payment</button>
        </div>
      </div>
    </div>
  );
};

export default Shoppinglist;