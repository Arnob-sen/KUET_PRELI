const express = require("express");
const { addIngredient, updateIngredient, getAllIngredients } = require("../controllers/ingredients");
const router = express.Router();

router.get("/", getAllIngredients);
router.post("/", addIngredient);
router.put("/:id", updateIngredient);

module.exports = router;
