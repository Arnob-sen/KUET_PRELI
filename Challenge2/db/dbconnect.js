const { Pool } = require("pg");

const connectionString = process.env.DBURL;

const pool = new Pool({
  connectionString: connectionString,
});

async function connectToDB() {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error);
  }
}

module.exports = { connectToDB, pool };
