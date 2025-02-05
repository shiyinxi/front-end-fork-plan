import React, { forwardRef } from "react";
import Pantry from "../Pantry/Pantry";
// import "./Modal.css"; // Add your modal styles here

const PantryModal = forwardRef(({ handleCloseModal }, ref) => {
  return (
    <div className="modal" ref={ref}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <Pantry />
      </div>
    </div>
  );
});

export default PantryModal;