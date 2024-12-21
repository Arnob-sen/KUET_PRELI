const fs = require("fs");

const getAllRecipes = async (req, res) => {
  try {
    const data = fs.readFileSync("my_fav_recipes.txt", "utf-8");
    const recipes = data
      .trim()
      .split("\n\n")
      .map((recipe) => {
        const lines = recipe.split("\n");
        return {
          rid: lines[0].split(": ")[1],
          recipe_name: lines[1].split(": ")[1],
          ingredients: lines[2].split(": ")[1].split(", "),
          instructions: lines[3].split(": ")[1],
          taste: lines[4].split(": ")[1],
          cuisine: lines[5].split(": ")[1],
          preparation_time: parseInt(lines[6].split(": ")[1]),
          favorite: lines[7].split(": ")[1] === "Yes",
        };
      });
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

const addRecipe = async (req, res) => {
  const {
    recipe_name,
    ingredients,
    instructions,
    taste,
    cuisine,
    preparation_time,
    favorite,
  } = req.body;
  if (
    !recipe_name ||
    !ingredients ||
    !instructions ||
    !taste ||
    !cuisine ||
    !preparation_time
  ) {
    return res.status(400).json({
      message:
        "recipe_name, ingredients, instructions, taste, cuisine and preparation_time are required",
    });
  }
  try {
    const data = fs.readFileSync("my_fav_recipes.txt", "utf-8");
    const newRID = data.trim().split("\n\n").length + 1;
    const newRecipe = `RID: ${newRID}\nRecipe Name: ${recipe_name}\nIngredients: ${ingredients.join(
      ", "
    )}\nInstructions: ${instructions}\nTaste: ${taste}\nCuisine: ${cuisine}\nPreparation Time: ${preparation_time}\nFavorite: ${
      favorite ? "Yes" : "No"
    }\n\n`;
    fs.appendFileSync("my_fav_recipes.txt", newRecipe);
    res.status(201).json({
      message: "Recipe added successfully",
      data: {
        rid: newRID,
        recipe_name,
        ingredients,
        instructions,
        taste,
        cuisine,
        preparation_time,
        favorite,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding recipe" });
  }
};

const getRecipeByCriteria = async (req, res) => {
  try {
    const { rid, favorite, preparation_time } = req.query;
    const data = fs.readFileSync("my_fav_recipes.txt", "utf-8");
    const recipes = data
      .trim()
      .split("\n\n")
      .map((recipe) => {
        const lines = recipe.split("\n");
        return {
          rid: lines[0].split(": ")[1],
          recipe_name: lines[1].split(": ")[1],
          ingredients: lines[2].split(": ")[1].split(", "),
          instructions: lines[3].split(": ")[1],
          taste: lines[4].split(": ")[1],
          cuisine: lines[5].split(": ")[1],
          preparation_time: parseInt(lines[6].split(": ")[1]),
          favorite: lines[7].split(": ")[1] === "Yes",
        };
      });

    let filteredRecipes = recipes;
    if (rid) {
      filteredRecipes = filteredRecipes.filter((recipe) => recipe.rid === rid);
    }
    if (favorite) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.favorite === (favorite === "true")
      );
    }
    if (preparation_time) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.preparation_time <= parseInt(preparation_time)
      );
    }

    if (filteredRecipes.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(filteredRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

const updateRecipeByRID = async (req, res) => {
  const { rid } = req.params;
  const {
    recipe_name,
    ingredients,
    instructions,
    taste,
    cuisine,
    preparation_time,
    favorite,
  } = req.body;
  if (
    !recipe_name ||
    !ingredients ||
    !instructions ||
    !taste ||
    !cuisine ||
    !preparation_time ||
    favorite === undefined
  ) {
    return res.status(400).json({
      message:
        "recipe_name, ingredients, instructions, taste, cuisine, preparation_time and favorite are required",
    });
  }
  try {
    const data = fs.readFileSync("my_fav_recipes.txt", "utf-8");
    const recipes = data.trim().split("\n\n");
    let recipeExists = false;
    const updatedRecipes =
      recipes
        .map((recipe) => {
          const lines = recipe.split("\n");
          if (lines[0].split(": ")[1] === rid) {
            recipeExists = true;
            return `RID: ${rid}\nRecipe Name: ${recipe_name}\nIngredients: ${ingredients.join(
              ", "
            )}\nInstructions: ${instructions}\nTaste: ${taste}\nCuisine: ${cuisine}\nPreparation Time: ${preparation_time}\nFavorite: ${
              favorite ? "Yes" : "No"
            }`;
          }
          return recipe;
        })
        .join("\n\n") + "\n\n";

    if (!recipeExists) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    fs.writeFileSync("my_fav_recipes.txt", updatedRecipes);
    res.status(200).json({
      message: "Recipe updated successfully",
      data: {
        rid,
        recipe_name,
        ingredients,
        instructions,
        taste,
        cuisine,
        preparation_time,
        favorite,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating recipe" });
  }
};

module.exports = {
  getAllRecipes,
  addRecipe,
  getRecipeByCriteria,
  updateRecipeByRID,
};
