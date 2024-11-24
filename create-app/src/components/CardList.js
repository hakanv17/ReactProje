import React, { useState, useEffect } from "react";
import Card from "./Card";

const CardList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div style={{ display: "flex", justifyContent:"center", flexWrap: "wrap", gap: "20px" }}>
      {products.map((product, index) => (
        <Card
          key={index}
          name={product.name}
          price={product.price} 
          images={product.images}
          color="yellow" 
          popularity={product.popularityScore}
          rating={(product.popularityScore / 20).toFixed(1)} 
        />
      ))}
    </div>
  );
};

export default CardList;