import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // For gold price API
import { promises as fs } from "fs"; // Use fs.promises to read files

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



const getGoldPrice = async () => {
  try {
    const response = await fetch("https://api.metalpriceapi.com/v1/latest?api_key=a33193bdf861a51cefe70b5067a5a500&base=USD&currencies=EUR,XAU,XAG");
    const data = await response.json();
    return data.rates.USDXAU / 31.1; // Calculate gold price per gram
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return null;
  }
};

app.get("/", async (req, res) => {
  try {
    // Dynamically read the JSON file using fs
    const data = await fs.readFile("./products.json", "utf-8");
    const products = JSON.parse(data); // Parse the file content to JSON

    const goldPrice = await getGoldPrice();
    if (!goldPrice) {
      return res.status(500).json({ error: "Failed to fetch gold price" });
    }

    const updatedProducts = products.map((product) => ({
      ...product,
      price: parseFloat((((product.popularityScore + 1) * product.weight * goldPrice)).toFixed(2)), 
    }));

    res.json(updatedProducts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));