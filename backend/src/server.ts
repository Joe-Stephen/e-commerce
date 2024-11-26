import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
dotenv.config();

const app = express();

app.get("/products", (request, response) => {});

app.listen(5000, () => {
  connectDB();
  console.log("Server is running at http://localhost:5000!");
});
