const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const products = require("./products.json"); // Use require instead of import

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const getGoldPrice = async () => {
  try {
    const response = await fetch(
      "https://api.metalpriceapi.com/v1/latest?api_key=80f5cbbd5cc039a2b4a89c8c6222a9c3&base=USD&currencies=EUR,XAU,XAG"
    );
    const data = await response.json();
    return data.rates.USDXAU / 31.1; // one gram of gold
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return null;
  }
};

app.get("/products", async (req, res) => {
  try {
    const goldPrice = await getGoldPrice();
    if (!goldPrice) {
      return res.status(500).json({ error: "Failed to fetch gold price" });
    }

    const updatedProducts = products.map((product) => ({
      ...product,
      price: parseFloat(
        (((product.popularityScore + 1) * product.weight * goldPrice)).toFixed(2)
      ),
    }));

    res.json(updatedProducts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
});

// Export the app for Vercel serverless functions
module.exports = app;
