const { pool } = require("../db/dbconnect");

const addIngredient = async (req, res) => {
    const { name, quantity, unit } = req.body;
    if (!name || !quantity || !unit) {
        return res.status(400).json({message: "name, quantity and unit are required"});
    }
    try {
        const result = await pool.query("INSERT INTO Ingredients (name, quantity, unit) VALUES ($1, $2, $3) RETURNING *", [name, quantity, unit]);
        res.status(201).json({message: "Ingredient added successfully", data: result.rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error adding ingredient"});
    }
}

const updateIngredient = async (req, res) => {
    const { id } = req.params;
    const { quantity, unit } = req.body;
    if (!quantity || !unit) {
        return res.status(400).json({message: "quantity and unit are required"});
    }
    try {
        // search for the ingredient
        const ingredient = await pool.query("SELECT * FROM Ingredients WHERE id = $1", [id]);
        if (ingredient.rows.length === 0) {
            return res.status(404).json({message: "Ingredient not found"});
        }
        // update the ingredient
        const result = await pool.query("UPDATE Ingredients SET quantity = $1, unit = $2 WHERE id = $3 RETURNING *", [quantity, unit, id]);
        res.status(200).json({message: "Ingredient updated successfully", data: result.rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error updating ingredient"});
    }
}

const getAllIngredients = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Ingredients");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error fetching ingredients"});
    }
}

module.exports = {
    addIngredient,
    updateIngredient,
    getAllIngredients
}