"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_model_1 = require("./models/product.model");
const db_1 = require("./config/db");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        if (!product.name || !product.price || !product.image) {
            return res
                .status(400)
                .json({ message: "Please provide all the required fields" });
        }
        const newProduct = yield new product_model_1.Product(product).save();
        return res
            .status(201)
            .json({ message: "Product created successfully", data: newProduct });
    }
    catch (error) {
        console.error("Error in creating product:", error);
        return res
            .status(500)
            .json({ message: "Something went wrong", error: error.message });
    }
}));
app.delete("/api/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Please provide product id" });
        }
        // Validate `id` format according to mongodb id format
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Product ID format" });
        }
        const product = yield product_model_1.Product.findById(JSON.stringify(id));
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        yield product.deleteOne();
        return res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        return res
            .status(500)
            .json({ message: "An error occurred while deleting the product" });
    }
}));
app.listen(5000, () => {
    (0, db_1.connectDB)();
    console.log("Server is running at http://localhost:5000!");
});
