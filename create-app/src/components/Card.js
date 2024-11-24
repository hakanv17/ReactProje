import React, { useState } from "react";
import "./Card.css";

const Card = ({ name, price, images, defaultColor, rating }) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor || "yellow");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const renderStars = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating); 
    const hasHalfStar = rating % 1 !== 0; 
  
    return Array.from({ length: maxStars }, (_, index) => {
      if (index < fullStars) {
        return <span key={index} className="filled-star">★</span>; 
      } else if (index === fullStars && hasHalfStar) {
        return <span key={index} className="half-star">★</span>; 
      } else {
        return <span key={index} className="empty-star">★</span>; 
      }
    });
  };

  return (
    <div className="card-container">
      <div className="card">
      <div className="card-image">
        <img
          src={images[selectedColor]} 
          alt={`${name} - ${selectedColor}`}
          className="product-image"
        />
      </div>
      <div className="card-details">
        <h3 className="product-title">{name}</h3>
        <p className="product-price">${price} USD</p>
        <div className="color-options">
          <span
            className="color-circle"
            style={{ backgroundColor: "#E6CA97" }}
            onClick={() => handleColorChange("yellow")} 
          ></span>
          <span
            className="color-circle"
            style={{ backgroundColor: "#D9D9D9" }}
            onClick={() => handleColorChange("white")} 
          ></span>
          <span
            className="color-circle"
            style={{ backgroundColor: "#E1A4A9" }}
            onClick={() => handleColorChange("rose")} 
          ></span>
        </div>
        <div>
          <p className="color-label">{selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Gold</p>
        </div>
        <div className="rating-section">
          <div className="stars">
              {renderStars(rating)} 
          </div>
            <span className="rating-text">{rating}/5</span>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Card;