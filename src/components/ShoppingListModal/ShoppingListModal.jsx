import React, { forwardRef } from "react";
import Shoppinglist from "../Shoppinglist/Shoppinglist";
// import "./Modal.css"; // Add your modal styles here

const ShoppingListModal = forwardRef(({ handleCloseModal }, ref) => {
  return (
    <div className="modal" ref={ref}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <Shoppinglist />
      </div>
    </div>
  );
});

export default ShoppingListModal;