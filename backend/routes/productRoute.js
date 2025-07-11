import express from "express";

const productRoute = express.Router();

import { productParser } from "../config/upload.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductById,
} from "../controllers/productConroller.js";
import { protect } from "../middleware/authMiddleware.js";

productRoute
  .route("/")
  .post(productParser.single("image"), addProduct)
  .get(getProduct);

productRoute.route("/:id").get(getProductById).delete(protect,deleteProduct)

export default productRoute;
