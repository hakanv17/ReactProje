import React, { useState, useEffect } from "react";
import Card from "./Card";

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Active slide index for carousel
  const [chunkedProducts, setChunkedProducts] = useState([]); // State to store chunked products

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

  useEffect(() => {
    // Dynamically adjust the chunk size based on screen size
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setChunkedProducts(chunkProducts(1)); // 1 card per slide for small screens
      } else if (window.innerWidth <= 768) {
        setChunkedProducts(chunkProducts(2)); // 2 cards per slide for medium screens
      } else {
        setChunkedProducts(chunkProducts(4)); // 4 cards per slide for large screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, [products]); // Run this effect whenever products change

  // Split products into chunks based on the number of cards per slide
  const chunkProducts = (numCards) => {
    const chunkedProducts = [];
    for (let i = 0; i < products.length; i += numCards) {
      chunkedProducts.push(products.slice(i, i + numCards));
    }
    return chunkedProducts;
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (products.length === 0) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="card-list-container">
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
            left: "-20px", // Reduced the margin
            transform: "translateY(-50%)",
            zIndex: 1,
            width: "30px", // Reduced button size
            height: "30px",
            borderRadius: "50%", // Ensures the button is round
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
            right: "-30px", // Reduced the margin
            transform: "translateY(-50%)",
            zIndex: 1,
            width: "30px", // Reduced button size
            height: "30px",
            borderRadius: "50%", // Ensures the button is round
          }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true">
            <i className="bi bi-chevron-right"></i>
          </span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <style jsx>{`
        .card-list-container {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          position: relative;
          padding: 0 15px;
        }

        .carousel-indicators {
          margin-top: 20px;
          margin-bottom: -1rem;
        }

        .carousel-inner {
          text-align: center;
        }

        .carousel-item {
          padding: 20px;
        }

        .card-container {
          flex: 1;
          max-width: 300px;
          margin: auto;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .carousel-item {
            padding: 10px;
          }

          .card-container {
            max-width: 220px;
          }

          .carousel-indicators {
            margin-bottom: 0;
          }
        }

        @media (max-width: 480px) {
          .card-container {
            max-width: 180px;
          }

          .carousel-control-prev,
          .carousel-control-next {
            top: 55%;
          }
        }
      `}</style>
    </div>
  );
};

export default CardList;