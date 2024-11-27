import express from "express";
import dotenv from "dotenv";
import { Product } from "./models/product.model";
import { connectDB } from "./config/db";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products", async (req: any, res: any) => {
  try {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }
    const newProduct = await new Product(product).save();
    return res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error: any) {
    console.error("Error in creating product:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

app.delete("/api/products/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Please provide product id" });
    }
    // Validate `id` format according to mongodb id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }
    const product = await Product.findById(JSON.stringify(id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the product" });
  }
});

//get all products
app.get("/api/products", async (req: any, res: any) => {
  try {
    
  } catch (error) {
    
  }
})

app.listen(5000, () => {
  connectDB();
  console.log("Server is running at http://localhost:5000!");
});
