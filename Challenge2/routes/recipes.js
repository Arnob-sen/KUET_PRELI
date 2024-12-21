const express = require("express");
const {
  getAllRecipes,
  addRecipe,
  getRecipeByCriteria,
  updateRecipeByRID,
  getRecipeSuggestions,
} = require("../controllers/recipes");
const router = express.Router();

router.get("/", getAllRecipes);
router.post("/", addRecipe);
router.get("/search", getRecipeByCriteria);
router.put("/:rid", updateRecipeByRID);
router.post("/suggestions", getRecipeSuggestions);

module.exports = router;
