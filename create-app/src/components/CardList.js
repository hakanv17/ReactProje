import React, { useState, useEffect } from "react";
import Card from "./Card";

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Active slide index for carousel

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (products.length === 0) {
    return <p>Loading products...</p>;
  }

  // Split products into chunks of 4
  const chunkedProducts = [];
  const chunkSize = 4;
  for (let i = 0; i < products.length; i += chunkSize) {
    chunkedProducts.push(products.slice(i, i + chunkSize));
  }

  return (
    <div style={{ width: "80%", margin: "auto", position: "relative" }}>
      {/* Carousel with Indicators and Buttons */}
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {chunkedProducts.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={index}
              className={index === activeIndex ? "active" : ""}
              aria-current={index === activeIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          {chunkedProducts.map((group, index) => (
            <div
              key={index}
              className={`carousel-item ${index === activeIndex ? "active" : ""}`}
              data-bs-interval="5000"
            >
              <div className="d-flex justify-content-center gap-3">
                {group.map((product, productIndex) => (
                  <Card
                    key={productIndex}
                    name={product.name}
                    price={product.price}
                    images={product.images}
                    color="yellow"
                    popularity={product.popularityScore}
                    rating={(product.popularityScore / 20).toFixed(1)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Previous Button (Outside Carousel) */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
          style={{
            position: "absolute",
            top: "50%",
            left: "-150px",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true">
            <i className="bi bi-chevron-left"></i>
          </span>
          <span className="visually-hidden">Previous</span>
        </button>

        {/* Next Button (Outside Carousel) */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
          style={{
            position: "absolute",
            top: "50%",
            right: "-150px",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true">
            <i className="bi bi-chevron-right"></i>
          </span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Move Swiper Further Down */}
      <style jsx>{`
        .carousel-indicators {
          margin-top: 20px; /* Adds space between carousel and indicators */
          margin-bottom: -1rem; /* Moves the indicators closer to the bottom */
        }
        .carousel-control-prev, .carousel-control-next {
          top: 70%; /* Moves the next/previous buttons further down */
        }
      `}</style>
    </div>
  );
};

export default CardList;