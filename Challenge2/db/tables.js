const { pool } = require("./dbconnect");

async function createTables() {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS ingredients (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) UNIQUE NOT NULL,
                quantity FLOAT,
                unit VARCHAR(50) NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW()
            );
            `);
    console.log("Tables created successfully");
  } catch (error) {
    console.error("Unable to create any table:", error);
  }
}

module.exports = { createTables };
