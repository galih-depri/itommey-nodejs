const router = require("express").Router();

// Import the controller
const product = require("./controllers/product");

// Endpoints
router.post("/api/v1/product", product.create);
router.get("/api/v1/product", product.listAllProducts);
router.get("/api/v1/product/:id", product.findProduct);
router.delete("/api/v1/product/:id", product.deleteProduct);
router.put("/api/v1/product/:id", product.updateProduct);

module.exports = router;
