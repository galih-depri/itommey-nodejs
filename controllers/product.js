const { where } = require("sequelize");
const db = require("../models/");
const Product = db.products;

// Create a new product
module.exports = {
  // Creating a new product
  async create(req, res) {
    let { name, qty, picture, expiredAt } = req.body;

    try {
      const product = await Product.create({
        name,
        qty,
        picture,
        expiredAt,
        isActive: true,
      });
      res.status(200).json(product);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ status: "error", message: error.message });
    }
  },

  // Displaying all products
  async listAllProducts(req, res) {
    try {
      const allProduct = await Product.findAll({ where: { isActive: true } });
      if (allProduct.length === 0) {
        const error = new Error(
          "Ooh! There's no product available at the moment"
        );
        error.code = 404;
        throw error;
      }
      res.status(200).json(allProduct);
    } catch (error) {
      res
        .status(error.code || 500)
        .json({ status: "error", message: error.message });
    }
  },

  // Find specific product
  async findProduct(req, res) {
    try {
      const result = await Product.findOne({
        where: { id: req.params.id, isActive: true },
      });
      if (!result) {
        const error = new Error("Ooops! The product doesn't exist");
        error.code = 404;
        throw error;
      }
      res.status(200).json(result);
    } catch (error) {
      res
        .status(error.code || 500)
        .json({ status: "error", message: error.message });
    }
  },

  // Soft delete specific product
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const findProduct = await Product.findOne({ where: { id } });
      if (findProduct) {
        await Product.update({ isActive: false }, { where: { id } });
        await Product.destroy({
          where: { id },
        });
        return res
          .status(200)
          .json(
            `Product with ID ${req.params.id} has successfully been deleted`
          );
      }
      const error = new Error("Product doesn't exist");
      error.code = 404;
      throw error;
    } catch (error) {
      res
        .status(error.code || 500)
        .json({ status: "error", message: error.message });
    }
  },

  // Update specific product
  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const findProduct = await Product.findOne({ where: { id } });
      if (!findProduct) {
        const error = new Error("Product doesn't exist");
        error.code = 404;
        throw error;
      }
      await Product.update(req.body, { where: { id } });
      res
        .status(200)
        .json(
          `Product with ID ${req.params.id} has susccessfully been updated`
        );
    } catch (error) {
      res
        .status(error.code || 500)
        .json({ status: "error", message: error.message });
    }
  },
};
